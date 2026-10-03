const assert = require('node:assert/strict');
const { mkdir } = require('node:fs/promises');
const path = require('node:path');
const { chromium } = require(require.resolve('playwright', {
  paths: process.argv[2] ? [process.argv[2]] : [process.cwd()],
}));

// Fake Auth and data responses exercise the UI without changing the hosted project.
async function main() {
  const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  let allowed = true;
  let rejectLogin = true;
  let failWorks = false;
  let emptyWorks = false;
  let worksRequests = 0;
  let uploadRequests = 0;
  const makeWork = (overrides) => ({
    audio_path: null,
    category: null,
    cover_image_path: null,
    created_at: '2026-10-03T00:00:00Z',
    description_de: null,
    description_en: null,
    duration: null,
    featured: false,
    instrumentation_de: null,
    instrumentation_en: null,
    score_pdf_path: null,
    sort_order: 10,
    ...overrides,
  });
  let works = [
    makeWork({ id: 'work-1', slug: 'water', title_de: 'WATER', title_en: 'WATER', year: 2022, status: 'published', updated_at: '2026-10-03T00:00:00Z' }),
    makeWork({ id: 'work-2', slug: 'draft-work', title_de: 'Testentwurf', title_en: 'Test draft', year: null, status: 'draft', updated_at: '2026-10-03T00:00:00Z', sort_order: 20 }),
    makeWork({ id: 'work-3', slug: 'archive-work', title_de: 'Testarchiv', title_en: 'Test archive', year: 2020, status: 'archived', updated_at: '2026-10-03T00:00:00Z', sort_order: 30 }),
  ];
  let mediaRows = [
    {
      id: 'media-1', work_id: 'work-1', media_type: 'audio', storage_bucket: 'audio',
      storage_path: 'water/water.mp3', title_de: 'WATER live', title_en: 'WATER live',
      duration: null, sort_order: 10, status: 'published', is_primary: true,
      created_at: '2026-10-03T00:00:00Z', updated_at: '2026-10-03T00:00:00Z',
    },
  ];
  const user = {
    id: '11111111-1111-4111-8111-111111111111', aud: 'authenticated',
    role: 'authenticated', email: 'test-admin@example.invalid',
    app_metadata: { provider: 'email' }, user_metadata: {},
    created_at: '2026-10-03T00:00:00Z',
  };
  await context.route('**/auth/v1/**', async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith('/token')) {
      if (rejectLogin) return route.fulfill({ status: 400, json: { code: 'invalid_credentials', msg: 'Invalid login credentials' } });
      const token = [Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url'), Buffer.from(JSON.stringify({ sub: user.id, exp: Math.floor(Date.now() / 1000) + 3600 })).toString('base64url'), 'test-signature'].join('.');
      return route.fulfill({ json: { access_token: token, refresh_token: 'test-refresh', token_type: 'bearer', expires_in: 3600, user } });
    }
    if (url.pathname.endsWith('/logout')) return route.fulfill({ status: 204 });
    return route.fulfill({ json: user });
  });
  await context.route('**/rest/v1/**', async (route) => {
    const url = new URL(route.request().url());
    const method = route.request().method();
    if (url.pathname.endsWith('/rpc/is_admin')) return route.fulfill({ json: allowed });
    if (url.pathname.endsWith('/works')) {
      if (failWorks) return route.fulfill({ status: 503, json: { message: 'Unavailable' } });
      if (method === 'GET') {
        const idFilter = url.searchParams.get('id');
        if (idFilter?.startsWith('eq.')) {
          const work = works.find((item) => item.id === idFilter.slice(3));
          return route.fulfill({ json: work ?? null });
        }
        worksRequests++;
        return route.fulfill({ json: emptyWorks ? [] : works });
      }
      if (method === 'POST') {
        const body = JSON.parse(route.request().postData() || '{}');
        const created = makeWork({
          id: 'work-new',
          created_at: '2026-10-03T00:00:00Z',
          updated_at: '2026-10-03T00:00:00Z',
          ...body,
        });
        works = [created, ...works];
        return route.fulfill({ status: 201, json: created });
      }
      if (method === 'PATCH') {
        const id = url.searchParams.get('id')?.slice(3);
        const body = JSON.parse(route.request().postData() || '{}');
        works = works.map((item) => item.id === id ? { ...item, ...body, updated_at: '2026-10-03T00:00:00Z' } : item);
        return route.fulfill({ json: works.find((item) => item.id === id) });
      }
    }
    if (url.pathname.endsWith('/work_media')) {
      const idFilter = url.searchParams.get('id');
      const workFilter = url.searchParams.get('work_id');
      if (method === 'GET') {
        const workId = workFilter?.startsWith('eq.') ? workFilter.slice(3) : null;
        return route.fulfill({ json: mediaRows.filter((item) => item.work_id === workId) });
      }
      if (method === 'POST') {
        const body = JSON.parse(route.request().postData() || '{}');
        const row = {
          id: `media-${mediaRows.length + 1}`,
          created_at: '2026-10-03T00:00:00Z',
          updated_at: '2026-10-03T00:00:00Z',
          ...body,
        };
        mediaRows.push(row);
        return route.fulfill({ status: 201, json: row });
      }
      if (method === 'PATCH') {
        const id = idFilter?.startsWith('eq.') ? idFilter.slice(3) : null;
        const body = JSON.parse(route.request().postData() || '{}');
        mediaRows = mediaRows.map((item) => {
          const matchesId = id ? item.id === id : true;
          const matchesWork = workFilter?.startsWith('eq.') ? item.work_id === workFilter.slice(3) : true;
          const matchesType = url.searchParams.get('media_type')?.startsWith('eq.')
            ? item.media_type === url.searchParams.get('media_type').slice(3)
            : true;
          return matchesId && matchesWork && matchesType ? { ...item, ...body } : item;
        });
        return route.fulfill({ json: id ? mediaRows.find((item) => item.id === id) : mediaRows });
      }
      if (method === 'DELETE') {
        const id = idFilter?.startsWith('eq.') ? idFilter.slice(3) : null;
        mediaRows = mediaRows.filter((item) => item.id !== id);
        return route.fulfill({ json: [] });
      }
    }
    return route.abort();
  });
  await context.route('**/storage/v1/object/**', async (route) => {
    if (['POST', 'PUT'].includes(route.request().method())) {
      uploadRequests++;
      return route.fulfill({ status: 200, json: { Key: 'audio/water/test-track.mp3' } });
    }
    if (route.request().method() === 'DELETE') return route.fulfill({ status: 200, json: [] });
    return route.fulfill({ status: 200, body: '' });
  });
  const output = path.resolve('.impeccable/review');
  await mkdir(output, { recursive: true });
  try {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://127.0.0.1:5173/admin');
    await page.getByRole('heading', { name: 'Anmelden', exact: true }).waitFor();
    await page.screenshot({ path: path.join(output, 'login-desktop.png') });
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    await page.getByLabel('Email', { exact: true }).fill(user.email);
    await page.getByLabel('Password', { exact: true }).fill('fake-password');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByRole('alert').filter({ hasText: 'Sign-in failed' }).waitFor();
    rejectLogin = false;
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByRole('heading', { name: 'Works', exact: true }).waitFor();
    assert.equal(await page.locator('tbody tr').count(), 3);
    assert.equal(await page.locator('tbody a').count(), 1, 'Only published works link to public pages');
    await page.getByRole('textbox', { name: 'Title DE', exact: true }).waitFor();
    await page.getByRole('textbox', { name: 'Title DE', exact: true }).fill('WATER edited');
    await page.getByRole('button', { name: 'Save', exact: true }).first().click();
    await page.getByText('Saved.', { exact: true }).waitFor();
    assert.equal(works.find((work) => work.id === 'work-1').title_de, 'WATER edited');
    await page.getByRole('button', { name: 'Publish', exact: true }).click();
    await page.getByText('Saved.', { exact: true }).waitFor();
    assert.equal(works.find((work) => work.id === 'work-1').status, 'published');
    await page.getByLabel('File').first().setInputFiles({
      name: 'test-track.mp3',
      mimeType: 'audio/mpeg',
      buffer: Buffer.from('mock audio'),
    });
    await page.getByLabel('Media title DE').nth(1).fill('Uploaded track');
    await page.getByRole('button', { name: 'Upload', exact: true }).first().click();
    await page.waitForTimeout(500);
    assert.equal(uploadRequests, 1);
    assert.equal(mediaRows.some((row) => row.title_de === 'Uploaded track'), true);
    await page.screenshot({ path: path.join(output, 'desktop.png') });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(output, 'mobile.png') });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true,
      JSON.stringify(await page.evaluate(() => [...document.querySelectorAll('*')].filter((el) => el.getBoundingClientRect().right > innerWidth).map((el) => ({ tag: el.tagName, class: el.className, right: el.getBoundingClientRect().right })))));
    await page.reload();
    await page.getByRole('heading', { name: 'Werke', exact: true }).waitFor();
    allowed = false;
    const previousRequests = worksRequests;
    await page.reload();
    await page.getByRole('heading', { name: 'Kein Zugriff', exact: true }).waitFor();
    assert.equal(worksRequests, previousRequests, 'Denied accounts must not request works');
    assert.equal(await page.locator('table').count(), 0);
    allowed = true;
    failWorks = true;
    await page.reload();
    await page.getByRole('alert').filter({ hasText: 'Werkliste' }).waitFor();
    failWorks = false;
    await page.getByRole('button', { name: 'Erneut versuchen', exact: true }).click();
    await page.getByRole('heading', { name: 'Werke', exact: true }).waitFor();
    emptyWorks = true;
    await page.reload();
    await page.getByText('Noch keine Werke vorhanden.', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Abmelden', exact: true }).click();
    await page.getByRole('heading', { name: 'Anmelden', exact: true }).waitFor();
    await page.reload();
    await page.getByRole('heading', { name: 'Anmelden', exact: true }).waitFor();
    assert.equal(await page.locator('table').count(), 0);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await page.screenshot({ path: path.join(output, 'login-mobile.png') });
    assert.deepEqual(errors, []);
    console.log('PASS: invalid login, admin access, draft/archive visibility, editor save/status/upload mocks, published links, session restoration, denied access, failed reads and retry, empty list, sign-out, desktop/mobile overflow, no page errors. Auth, data, and storage responses were mocked.');
  } finally {
    await browser.close();
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
