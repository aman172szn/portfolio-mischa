const assert = require('node:assert/strict');
const { mkdir, mkdtemp, writeFile, rm } = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { createClient } = require('@supabase/supabase-js');
const { chromium } = require(require.resolve('playwright', {
  paths: process.argv[2] ? [process.argv[2]] : [process.cwd()],
}));

const email = process.env.ADMIN_SMOKE_EMAIL;
const password = process.env.ADMIN_SMOKE_PASSWORD;
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!email || !password) {
  throw new Error('ADMIN_SMOKE_EMAIL and ADMIN_SMOKE_PASSWORD are required');
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are required');
}

const testSlug = `codex-admin-smoke-${Date.now()}`;
const testTitle = 'Codex Admin Smoke Test';

async function cleanup(client) {
  const { data: works } = await client.from('works').select('id').eq('slug', testSlug);
  for (const work of works ?? []) {
    const { data: mediaRows } = await client.from('work_media').select('*').eq('work_id', work.id);
    for (const media of mediaRows ?? []) {
      await client.storage.from(media.storage_bucket).remove([media.storage_path]);
    }
    await client.from('works').delete().eq('id', work.id);
  }
}

async function waitForWorkStatus(client, status) {
  const deadline = Date.now() + 20000;
  let lastError = null;
  while (Date.now() < deadline) {
    const { data, error } = await client.from('works').select('status').eq('slug', testSlug).single();
    lastError = error;
    if (data?.status === status) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for work status ${status}${lastError ? `: ${lastError.message}` : ''}`);
}

async function waitForNoMediaType(client, workId, mediaType) {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    const { data, error } = await client
      .from('work_media')
      .select('id')
      .eq('work_id', workId)
      .eq('media_type', mediaType);
    if (error) throw error;
    if ((data ?? []).length === 0) return;
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for ${mediaType} media removal`);
}

async function main() {
  const client = createClient(supabaseUrl, supabaseAnonKey);
  const signIn = await client.auth.signInWithPassword({ email, password });
  if (signIn.error) throw signIn.error;
  await cleanup(client);

  const tempDir = await mkdtemp(path.join(os.tmpdir(), 'admin-smoke-'));
  const fileBuffers = {
    audio: Buffer.from([0xff, 0xfb, 0x90, 0x64, 0, 0, 0, 0]),
    score: Buffer.from('%PDF-1.4\n1 0 obj\n<<>>\nendobj\ntrailer\n<<>>\n%%EOF\n'),
    photo: Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=',
      'base64',
    ),
  };
  await writeFile(path.join(tempDir, 'keep-dir.txt'), 'temporary smoke test directory');

  const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('response', async (response) => {
    const url = response.url();
    if (!response.ok() && (url.includes('/rest/v1/') || url.includes('/storage/v1/'))) {
      let body = '';
      try {
        body = await response.text();
      } catch {
        body = '<unreadable>';
      }
      errors.push(`${response.status()} ${url.replace(supabaseUrl, '<supabase>')} ${body.slice(0, 300)}`);
    }
  });

  try {
    await page.goto('http://127.0.0.1:5173/admin');
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByRole('heading', { name: 'Works', exact: true }).waitFor({ timeout: 20000 });

    await page.getByRole('button', { name: 'New work', exact: true }).click();
    await page.getByRole('textbox', { name: 'Title DE', exact: true }).fill(testTitle);
    await page.getByRole('textbox', { name: 'Title EN', exact: true }).fill(`${testTitle} EN`);
    await page.getByLabel('URL slug').fill(testSlug);
    await page.getByRole('spinbutton', { name: 'Year', exact: true }).fill('2026');
    await page.getByLabel('Category').fill('Smoke test');
    await page.getByLabel('Duration').fill('1 min');
    await page.getByRole('spinbutton', { name: 'Order', exact: true }).first().fill('9999');
    await page.getByLabel('Instrumentation DE').fill('Testbesetzung');
    await page.getByLabel('Instrumentation EN').fill('Test instrumentation');
    await page.getByLabel('Description DE').fill('Automatischer Testeintrag.');
    await page.getByLabel('Description EN').fill('Automated test entry.');
    await page.getByRole('button', { name: 'Create work', exact: true }).click();
    await page.getByText('Work created.', { exact: true }).waitFor({ timeout: 20000 });

    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await waitForWorkStatus(client, 'published');
    await page.getByRole('button', { name: 'Archive', exact: true }).click();
    await waitForWorkStatus(client, 'archived');
    await page.getByRole('button', { name: 'Move to draft', exact: true }).click();
    await waitForWorkStatus(client, 'draft');

    const uploads = [
      { type: 'Audio', name: 'codex-smoke-audio.mp3', mimeType: 'audio/mpeg', buffer: fileBuffers.audio, title: 'Smoke audio' },
      { type: 'Score', name: 'codex-smoke-score.pdf', mimeType: 'application/pdf', buffer: fileBuffers.score, title: 'Smoke score' },
      { type: 'Photo', name: 'codex-smoke-photo.png', mimeType: 'image/png', buffer: fileBuffers.photo, title: 'Smoke photo' },
    ];

    for (const upload of uploads) {
      const panel = page.getByRole('region', { name: upload.type });
      const uploadForm = panel.locator('.admin-upload-form');
      await uploadForm.getByLabel('File').setInputFiles({
        name: upload.name,
        mimeType: upload.mimeType,
        buffer: upload.buffer,
      });
      await uploadForm.locator('input[name="title_de"]').fill(upload.title);
      await uploadForm.locator('input[name="title_en"]').fill(`${upload.title} EN`);
      await uploadForm.getByLabel('Primary').check();
      await uploadForm.getByRole('button', { name: 'Upload', exact: true }).click();
      try {
        await page.waitForFunction(
          ({ type, title }) => {
            const headings = [...document.querySelectorAll('.admin-media-panel h3')];
            const heading = headings.find((item) => item.textContent?.trim() === type);
            const panelElement = heading?.closest('.admin-media-panel');
            return [...(panelElement?.querySelectorAll('.admin-media-row input[name="title_de"]') ?? [])]
              .some((input) => input.value === title);
          },
          { type: upload.type, title: upload.title },
          { timeout: 30000 },
        );
      } catch (error) {
        const panelText = await panel.textContent();
        throw new Error(`Upload did not appear for ${upload.type}. Panel text: ${panelText}. Network/errors: ${errors.join(' | ')}`, { cause: error });
      }
    }

    const { data: created, error: createdError } = await client
      .from('works')
      .select('id, slug, status, title_de')
      .eq('slug', testSlug)
      .single();
    if (createdError) throw createdError;
    assert.equal(created.title_de, testTitle);

    await page.getByRole('region', { name: 'Audio' }).getByRole('button', { name: 'Remove', exact: true }).first().click();
    await waitForNoMediaType(client, created.id, 'audio');

    const { data: mediaRows, error: mediaError } = await client
      .from('work_media')
      .select('media_type, is_primary, title_de')
      .eq('work_id', created.id);
    if (mediaError) throw mediaError;
    assert.equal(mediaRows.some((media) => media.media_type === 'score' && media.is_primary), true);
    assert.equal(mediaRows.some((media) => media.media_type === 'photo' && media.is_primary), true);
    assert.equal(mediaRows.some((media) => media.media_type === 'audio'), false);

    await mkdir(path.resolve('.impeccable/review'), { recursive: true });
    await page.screenshot({ path: path.resolve('.impeccable/review/admin-real-smoke.png'), fullPage: true });
    assert.deepEqual(errors, []);
    console.log('PASS: real admin login, create/edit status flow, audio/score/photo uploads, primary media, media delete, and database cleanup verification succeeded.');
  } finally {
    await browser.close();
    await cleanup(client);
    await client.auth.signOut();
    await rm(tempDir, { recursive: true, force: true });
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
