import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Link } from 'react-router-dom';
import {
  createAdminWork,
  deleteAdminMedia,
  makeWorkSlug,
  readAdminWorkDetail,
  readAdminWorks,
  setPrimaryAdminMedia,
  updateAdminMedia,
  updateAdminWork,
  updateAdminWorkStatus,
  uploadAdminMedia,
  type AdminMediaType,
  type AdminWork,
  type AdminWorkDetail,
  type AdminWorkInput,
  type AdminWorkMedia,
  type AdminWorkStatus,
} from '../../content/admin';
import { supabase } from '../../lib/supabase';
import './admin.css';

type Locale = 'de' | 'en';
type LoadState = 'loading' | 'denied' | 'error' | 'ready';
type Feedback = { type: 'success' | 'error'; message: string } | null;

const labels = {
  de: {
    admin: 'Verwaltung', website: 'Website ansehen', login: 'Anmelden', logout: 'Abmelden',
    email: 'E-Mail', password: 'Passwort', signingIn: 'Anmeldung ...', signingOut: 'Abmeldung ...',
    loading: 'Zugriff wird geprueft ...', works: 'Werke', title: 'Titel', year: 'Jahr',
    status: 'Status', updated: 'Aktualisiert', published: 'Veroeffentlicht', draft: 'Entwurf',
    archived: 'Archiviert', empty: 'Noch keine Werke vorhanden.', retry: 'Erneut versuchen',
    denied: 'Kein Zugriff', deniedBody: 'Dieses Konto hat keinen Verwaltungszugriff. Bitte kontaktiere den Website-Administrator.',
    failed: 'Der Zugriff oder die Werkliste konnte nicht geladen werden. Bitte erneut versuchen oder neu anmelden.',
    loginFailed: 'Anmeldung fehlgeschlagen. Bitte E-Mail und Passwort pruefen und erneut versuchen.',
    logoutFailed: 'Abmeldung fehlgeschlagen. Bitte erneut versuchen.',
    unconfigured: 'Die Verwaltung ist derzeit nicht verfuegbar. Bitte kontaktiere den Website-Administrator.',
    sessionFailed: 'Die Sitzung konnte nicht geladen werden. Bitte erneut versuchen.',
    preview: 'Ansehen', count: 'Werke insgesamt', newWork: 'Neues Werk', edit: 'Bearbeiten',
    slug: 'URL-Name', category: 'Kategorie', duration: 'Dauer', sortOrder: 'Reihenfolge',
    instrumentationDe: 'Besetzung DE', instrumentationEn: 'Besetzung EN', titleDe: 'Titel DE',
    titleEn: 'Titel EN', descriptionDe: 'Beschreibung DE', descriptionEn: 'Beschreibung EN',
    featured: 'Auf der Startseite hervorheben', save: 'Speichern', saving: 'Speichert ...',
    saved: 'Gespeichert.', created: 'Werk erstellt.', create: 'Werk erstellen',
    publish: 'Veroeffentlichen', archive: 'Archivieren', makeDraft: 'Als Entwurf speichern',
    media: 'Medien', audio: 'Audio', score: 'Partitur', photo: 'Foto', upload: 'Hochladen',
    uploading: 'Laedt hoch ...', file: 'Datei', mediaTitleDe: 'Medientitel DE',
    mediaTitleEn: 'Medientitel EN', primary: 'Primaer', makePrimary: 'Als primaer setzen',
    delete: 'Entfernen', noMedia: 'Noch keine Medien fuer diesen Typ.', path: 'Pfad',
    uploadFailed: 'Upload fehlgeschlagen. Bitte Dateityp, Groesse und Verbindung pruefen.',
    saveFailed: 'Speichern fehlgeschlagen. Bitte pruefen und erneut versuchen.',
    deleteFailed: 'Entfernen fehlgeschlagen. Bitte erneut versuchen.',
    selectWork: 'Werk auswaehlen', selected: 'Ausgewaehlt',
  },
  en: {
    admin: 'Administration', website: 'View website', login: 'Sign in', logout: 'Sign out',
    email: 'Email', password: 'Password', signingIn: 'Signing in ...', signingOut: 'Signing out ...',
    loading: 'Checking access ...', works: 'Works', title: 'Title', year: 'Year',
    status: 'Status', updated: 'Updated', published: 'Published', draft: 'Draft',
    archived: 'Archived', empty: 'No works yet.', retry: 'Try again',
    denied: 'Access unavailable', deniedBody: 'This account does not have admin access. Please contact the website administrator.',
    failed: 'Access or the works list could not be loaded. Try again or sign in again.',
    loginFailed: 'Sign-in failed. Check your email and password and try again.',
    logoutFailed: 'Sign-out failed. Please try again.',
    unconfigured: 'Administration is currently unavailable. Please contact the website administrator.',
    sessionFailed: 'Your session could not be loaded. Please try again.',
    preview: 'View', count: 'works in total', newWork: 'New work', edit: 'Edit',
    slug: 'URL slug', category: 'Category', duration: 'Duration', sortOrder: 'Order',
    instrumentationDe: 'Instrumentation DE', instrumentationEn: 'Instrumentation EN', titleDe: 'Title DE',
    titleEn: 'Title EN', descriptionDe: 'Description DE', descriptionEn: 'Description EN',
    featured: 'Feature on homepage', save: 'Save', saving: 'Saving ...',
    saved: 'Saved.', created: 'Work created.', create: 'Create work',
    publish: 'Publish', archive: 'Archive', makeDraft: 'Move to draft',
    media: 'Media', audio: 'Audio', score: 'Score', photo: 'Photo', upload: 'Upload',
    uploading: 'Uploading ...', file: 'File', mediaTitleDe: 'Media title DE',
    mediaTitleEn: 'Media title EN', primary: 'Primary', makePrimary: 'Make primary',
    delete: 'Remove', noMedia: 'No media for this type yet.', path: 'Path',
    uploadFailed: 'Upload failed. Check the file type, size, and connection.',
    saveFailed: 'Save failed. Check the fields and try again.',
    deleteFailed: 'Remove failed. Please try again.',
    selectWork: 'Select work', selected: 'Selected',
  },
};

const emptyWorkForm: AdminWorkInput = {
  slug: '',
  title_de: '',
  title_en: null,
  year: null,
  category: null,
  instrumentation_de: null,
  instrumentation_en: null,
  duration: null,
  description_de: null,
  description_en: null,
  featured: false,
  sort_order: 100,
  status: 'draft',
};

const mediaTypes = ['audio', 'score', 'photo'] as const;

function toInputValue(value: string | number | null) {
  return value === null ? '' : String(value);
}

function nullableText(value: FormDataEntryValue | null) {
  const text = String(value ?? '').trim();
  return text.length > 0 ? text : null;
}

function nullableNumber(value: FormDataEntryValue | null) {
  const text = String(value ?? '').trim();
  return text.length > 0 ? Number(text) : null;
}

function workToForm(work: AdminWork | null): AdminWorkInput {
  if (!work) return emptyWorkForm;
  return {
    slug: work.slug,
    title_de: work.title_de,
    title_en: work.title_en,
    year: work.year,
    category: work.category,
    instrumentation_de: work.instrumentation_de,
    instrumentation_en: work.instrumentation_en,
    duration: work.duration,
    description_de: work.description_de,
    description_en: work.description_en,
    featured: work.featured,
    sort_order: work.sort_order,
    status: work.status,
  };
}

function formDataToWorkInput(data: FormData, fallbackStatus: AdminWorkStatus): AdminWorkInput {
  const titleDe = String(data.get('title_de') ?? '').trim();
  return {
    slug: String(data.get('slug') ?? '').trim() || makeWorkSlug(titleDe),
    title_de: titleDe,
    title_en: nullableText(data.get('title_en')),
    year: nullableNumber(data.get('year')),
    category: nullableText(data.get('category')),
    instrumentation_de: nullableText(data.get('instrumentation_de')),
    instrumentation_en: nullableText(data.get('instrumentation_en')),
    duration: nullableText(data.get('duration')),
    description_de: nullableText(data.get('description_de')),
    description_en: nullableText(data.get('description_en')),
    featured: data.get('featured') === 'on',
    sort_order: Number(data.get('sort_order') || 100),
    status: fallbackStatus,
  };
}

function dateLabel(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB').format(new Date(value));
}

function MediaManager({
  work,
  mediaType,
  locale,
  onChanged,
}: {
  work: AdminWorkDetail;
  mediaType: AdminMediaType;
  locale: Locale;
  onChanged: () => void;
}) {
  const copy = labels[locale];
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const mediaItems = useMemo(
    () => work.media.filter((item) => item.media_type === mediaType).sort((a, b) => a.sort_order - b.sort_order),
    [mediaType, work.media],
  );

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get('file');
    if (!(file instanceof File) || file.size === 0) return;
    setBusy(true);
    setFeedback(null);
    try {
      await uploadAdminMedia({
        work,
        mediaType,
        file,
        titleDe: String(data.get('title_de') ?? ''),
        titleEn: String(data.get('title_en') ?? ''),
        duration: String(data.get('duration') ?? ''),
        sortOrder: Number(data.get('sort_order') || (mediaItems.length + 1) * 10),
        status: work.status,
        makePrimary: mediaItems.length === 0 || data.get('is_primary') === 'on',
      });
      form.reset();
      setFeedback({ type: 'success', message: copy.saved });
      onChanged();
    } catch {
      setFeedback({ type: 'error', message: copy.uploadFailed });
    } finally {
      setBusy(false);
    }
  }

  async function saveMedia(event: FormEvent<HTMLFormElement>, media: AdminWorkMedia) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setBusy(true);
    setFeedback(null);
    try {
      await updateAdminMedia(media.id, {
        title_de: nullableText(data.get('title_de')),
        title_en: nullableText(data.get('title_en')),
        duration: nullableText(data.get('duration')),
        sort_order: Number(data.get('sort_order') || media.sort_order),
        status: String(data.get('status') || media.status) as AdminWorkStatus,
      });
      setFeedback({ type: 'success', message: copy.saved });
      onChanged();
    } catch {
      setFeedback({ type: 'error', message: copy.saveFailed });
    } finally {
      setBusy(false);
    }
  }

  async function makePrimary(media: AdminWorkMedia) {
    setBusy(true);
    setFeedback(null);
    try {
      await setPrimaryAdminMedia(work.id, media);
      setFeedback({ type: 'success', message: copy.saved });
      onChanged();
    } catch {
      setFeedback({ type: 'error', message: copy.saveFailed });
    } finally {
      setBusy(false);
    }
  }

  async function remove(media: AdminWorkMedia) {
    setBusy(true);
    setFeedback(null);
    try {
      await deleteAdminMedia(work.id, media);
      setFeedback({ type: 'success', message: copy.saved });
      onChanged();
    } catch {
      setFeedback({ type: 'error', message: copy.deleteFailed });
    } finally {
      setBusy(false);
    }
  }

  return <section className="admin-media-panel" aria-labelledby={`admin-media-${mediaType}`}>
    <h3 id={`admin-media-${mediaType}`}>{copy[mediaType]}</h3>
    {feedback && <p className={`admin-feedback admin-feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}</p>}
    {mediaItems.length === 0 ? <p className="admin-muted">{copy.noMedia}</p> : <div className="admin-media-list">
      {mediaItems.map((media) => <form className="admin-media-row" key={media.id} onSubmit={(event) => saveMedia(event, media)}>
        <div className="admin-media-path"><span>{media.is_primary ? copy.primary : copy.path}</span>{media.storage_path}</div>
        <label>{copy.mediaTitleDe}<input name="title_de" defaultValue={media.title_de ?? ''} /></label>
        <label>{copy.mediaTitleEn}<input name="title_en" defaultValue={media.title_en ?? ''} /></label>
        <label>{copy.duration}<input name="duration" defaultValue={media.duration ?? ''} /></label>
        <label>{copy.sortOrder}<input name="sort_order" type="number" defaultValue={media.sort_order} /></label>
        <label>{copy.status}<select name="status" defaultValue={media.status}>
          <option value="draft">{copy.draft}</option>
          <option value="published">{copy.published}</option>
          <option value="archived">{copy.archived}</option>
        </select></label>
        <div className="admin-media-actions">
          <button className="admin-button" type="submit" disabled={busy}>{copy.save}</button>
          {!media.is_primary && <button className="admin-button" type="button" disabled={busy} onClick={() => makePrimary(media)}>{copy.makePrimary}</button>}
          <button className="admin-button admin-button--danger" type="button" disabled={busy} onClick={() => remove(media)}>{copy.delete}</button>
        </div>
      </form>)}
    </div>}
    <form className="admin-upload-form" onSubmit={upload}>
      <label>{copy.file}<input name="file" type="file" required disabled={busy} /></label>
      <label>{copy.mediaTitleDe}<input name="title_de" disabled={busy} /></label>
      <label>{copy.mediaTitleEn}<input name="title_en" disabled={busy} /></label>
      <label>{copy.duration}<input name="duration" disabled={busy || mediaType !== 'audio'} /></label>
      <label>{copy.sortOrder}<input name="sort_order" type="number" defaultValue={(mediaItems.length + 1) * 10} disabled={busy} /></label>
      <label className="admin-check"><input name="is_primary" type="checkbox" disabled={busy} /> {copy.primary}</label>
      <button className="admin-button admin-button--primary" type="submit" disabled={busy}>{busy ? copy.uploading : copy.upload}</button>
    </form>
  </section>;
}

function WorkEditor({
  workId,
  locale,
  onChanged,
}: {
  workId: string | null;
  locale: Locale;
  onChanged: (workId?: string) => void;
}) {
  const copy = labels[locale];
  const [work, setWork] = useState<AdminWorkDetail | null>(null);
  const [form, setForm] = useState<AdminWorkInput>(emptyWorkForm);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [preserveFeedbackForWorkId, setPreserveFeedbackForWorkId] = useState<string | null>(null);

  useEffect(() => {
    if (!workId) {
      setWork(null);
      setForm(emptyWorkForm);
      setFeedback(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    if (preserveFeedbackForWorkId !== workId) {
      setFeedback(null);
    }
    readAdminWorkDetail(workId).then((detail) => {
      if (!cancelled) {
        setWork(detail);
        setForm(workToForm(detail));
        setPreserveFeedbackForWorkId(null);
      }
    }).catch(() => {
      if (!cancelled) setFeedback({ type: 'error', message: copy.failed });
    }).finally(() => {
      if (!cancelled) setLoading(false);
    });
    return () => { cancelled = true; };
  }, [copy.failed, preserveFeedbackForWorkId, reloadKey, workId]);

  function reload() {
    setReloadKey((value) => value + 1);
    onChanged(workId ?? undefined);
  }

  function updateField<Field extends keyof AdminWorkInput>(field: Field, value: AdminWorkInput[Field]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = formDataToWorkInput(new FormData(event.currentTarget), form.status);
    setSaving(true);
    setFeedback(null);
    try {
      const savedWork = work ? await updateAdminWork(work.id, input) : await createAdminWork(input);
      setWork((current) => ({ ...savedWork, media: current?.media ?? [] }));
      setForm(workToForm(savedWork));
      setFeedback({ type: 'success', message: work ? copy.saved : copy.created });
      setPreserveFeedbackForWorkId(savedWork.id);
      onChanged(savedWork.id);
    } catch {
      setFeedback({ type: 'error', message: copy.saveFailed });
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(status: AdminWorkStatus) {
    if (!work) {
      setForm((current) => ({ ...current, status }));
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const updated = await updateAdminWorkStatus(work.id, status);
      setWork((current) => current ? { ...current, ...updated } : { ...updated, media: [] });
      setForm(workToForm(updated));
      setFeedback({ type: 'success', message: copy.saved });
      setPreserveFeedbackForWorkId(work.id);
      onChanged(work.id);
    } catch {
      setFeedback({ type: 'error', message: copy.saveFailed });
    } finally {
      setSaving(false);
    }
  }

  return <section className="admin-editor" aria-labelledby="admin-editor-title">
    <div className="admin-section-heading">
      <h2 id="admin-editor-title">{work ? copy.edit : copy.newWork}</h2>
      {loading && <p role="status">{copy.loading}</p>}
    </div>
    {feedback && <p className={`admin-feedback admin-feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>{feedback.message}</p>}
    <form className="admin-work-form" onSubmit={save}>
      <label>{copy.titleDe}<input name="title_de" required value={form.title_de} onChange={(event) => updateField('title_de', event.target.value)} /></label>
      <label>{copy.titleEn}<input name="title_en" value={toInputValue(form.title_en)} onChange={(event) => updateField('title_en', nullableText(event.target.value))} /></label>
      <label>{copy.slug}<input name="slug" required value={form.slug} onChange={(event) => updateField('slug', event.target.value)} onBlur={() => updateField('slug', makeWorkSlug(form.slug || form.title_de))} /></label>
      <label>{copy.year}<input name="year" type="number" value={toInputValue(form.year)} onChange={(event) => updateField('year', event.target.value ? Number(event.target.value) : null)} /></label>
      <label>{copy.category}<input name="category" value={toInputValue(form.category)} onChange={(event) => updateField('category', nullableText(event.target.value))} /></label>
      <label>{copy.duration}<input name="duration" value={toInputValue(form.duration)} onChange={(event) => updateField('duration', nullableText(event.target.value))} /></label>
      <label>{copy.sortOrder}<input name="sort_order" type="number" value={form.sort_order} onChange={(event) => updateField('sort_order', Number(event.target.value || 100))} /></label>
      <label className="admin-check"><input name="featured" type="checkbox" checked={form.featured} onChange={(event) => updateField('featured', event.target.checked)} /> {copy.featured}</label>
      <label>{copy.status}<select name="status" value={form.status} onChange={(event) => updateField('status', event.target.value as AdminWorkStatus)}>
        <option value="draft">{copy.draft}</option>
        <option value="published">{copy.published}</option>
        <option value="archived">{copy.archived}</option>
      </select></label>
      <label className="admin-form-wide">{copy.instrumentationDe}<textarea name="instrumentation_de" value={toInputValue(form.instrumentation_de)} onChange={(event) => updateField('instrumentation_de', nullableText(event.target.value))} /></label>
      <label className="admin-form-wide">{copy.instrumentationEn}<textarea name="instrumentation_en" value={toInputValue(form.instrumentation_en)} onChange={(event) => updateField('instrumentation_en', nullableText(event.target.value))} /></label>
      <label className="admin-form-wide">{copy.descriptionDe}<textarea name="description_de" rows={5} value={toInputValue(form.description_de)} onChange={(event) => updateField('description_de', nullableText(event.target.value))} /></label>
      <label className="admin-form-wide">{copy.descriptionEn}<textarea name="description_en" rows={5} value={toInputValue(form.description_en)} onChange={(event) => updateField('description_en', nullableText(event.target.value))} /></label>
      <div className="admin-form-actions admin-form-wide">
        <button className="admin-button admin-button--primary" type="submit" disabled={saving}>{saving ? copy.saving : work ? copy.save : copy.create}</button>
        <button className="admin-button" type="button" disabled={saving} onClick={() => changeStatus('draft')}>{copy.makeDraft}</button>
        <button className="admin-button" type="button" disabled={saving} onClick={() => changeStatus('published')}>{copy.publish}</button>
        <button className="admin-button" type="button" disabled={saving} onClick={() => changeStatus('archived')}>{copy.archive}</button>
      </div>
    </form>
    {work && !loading ? <div className="admin-media">
      <h2>{copy.media}</h2>
      {mediaTypes.map((type) => <MediaManager key={type} work={work} mediaType={type} locale={locale} onChanged={reload} />)}
    </div> : null}
  </section>;
}

function AdminWorks({ locale }: { locale: Locale }) {
  const copy = labels[locale];
  const [result, setResult] = useState<{ status: LoadState; works: AdminWork[] }>({ status: 'loading', works: [] });
  const [attempt, setAttempt] = useState(0);
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    readAdminWorks().then((works) => {
      if (cancelled) return;
      const nextWorks = works ?? [];
      setResult({ status: works === null ? 'denied' : 'ready', works: nextWorks });
      setSelectedWorkId((current) => current ?? nextWorks[0]?.id ?? null);
    }).catch(() => {
      if (!cancelled) setResult({ status: 'error', works: [] });
    });
    return () => { cancelled = true; };
  }, [attempt]);

  function refresh(workId?: string) {
    if (workId) setSelectedWorkId(workId);
    setAttempt((value) => value + 1);
  }

  function retry() {
    setResult({ status: 'loading', works: [] });
    setAttempt((value) => value + 1);
  }

  if (result.status === 'loading') return <p role="status">{copy.loading}</p>;
  if (result.status === 'denied') return <section className="admin-message"><h1>{copy.denied}</h1><p>{copy.deniedBody}</p></section>;
  if (result.status === 'error') return <section className="admin-message"><p role="alert">{copy.failed}</p><button className="admin-button" onClick={retry}>{copy.retry}</button></section>;

  return <div className="admin-workspace">
    <section aria-labelledby="admin-works-title" className="admin-list-panel">
      <div className="admin-section-heading">
        <h1 id="admin-works-title">{copy.works}</h1>
        <p>{result.works.length} {copy.count}</p>
      </div>
      <button className="admin-button admin-button--primary" type="button" onClick={() => setSelectedWorkId(null)}>{copy.newWork}</button>
      {result.works.length === 0 ? <p>{copy.empty}</p> : <div className="admin-table-scroll" tabIndex={0} role="region" aria-label={copy.works}>
        <table className="admin-table">
          <thead><tr><th scope="col">{copy.title}</th><th scope="col">{copy.year}</th><th scope="col">{copy.status}</th><th scope="col">{copy.updated}</th><th scope="col"><span className="admin-sr-only">{copy.edit}</span></th></tr></thead>
          <tbody>{result.works.map((work) => <tr key={work.id} className={work.id === selectedWorkId ? 'is-selected' : undefined}>
            <th scope="row">{locale === 'en' ? work.title_en || work.title_de : work.title_de}</th>
            <td>{work.year ?? '-'}</td>
            <td><span className={`admin-status admin-status--${work.status}`}>{copy[work.status]}</span></td>
            <td>{dateLabel(work.updated_at, locale)}</td>
            <td className="admin-row-actions">
              <button className="admin-button" type="button" onClick={() => setSelectedWorkId(work.id)}>{work.id === selectedWorkId ? copy.selected : copy.edit}</button>
              {work.status === 'published' && <Link to={`/${locale}/works/${work.slug}`} aria-label={`${copy.preview}: ${work.title_de}`}>{copy.preview}</Link>}
            </td>
          </tr>)}</tbody>
        </table>
      </div>}
    </section>
    <WorkEditor workId={selectedWorkId} locale={locale} onChanged={refresh} />
  </div>;
}

export function AdminRoute() {
  const [locale, setLocale] = useState<Locale>('de');
  const [session, setSession] = useState<Session | null>(null);
  const [sessionState, setSessionState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [sessionAttempt, setSessionAttempt] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<'loginFailed' | 'logoutFailed' | null>(null);
  const copy = labels[locale];

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    let authEventReceived = false;
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      authEventReceived = true;
      setSession(nextSession);
      setSessionState('ready');
      setError(null);
    });
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active || authEventReceived) return;
      setSession(data.session);
      setSessionState(sessionError ? 'error' : 'ready');
    }).catch(() => {
      if (active && !authEventReceived) setSessionState('error');
    });
    return () => { active = false; subscription.subscription.unsubscribe(); };
  }, [sessionAttempt]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase || busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setError(null);
    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: String(data.get('email')).trim(), password: String(data.get('password')) });
      if (loginError) setError('loginFailed');
      else form.reset();
    } catch { setError('loginFailed'); }
    finally { setBusy(false); }
  }

  async function signOut() {
    if (!supabase || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { error: logoutError } = await supabase.auth.signOut({ scope: 'local' });
      if (logoutError) setError('logoutFailed');
    } catch { setError('logoutFailed'); }
    finally { setBusy(false); }
  }

  function fileInputTheme(event: ChangeEvent<HTMLInputElement>) {
    event.currentTarget.style.color = event.currentTarget.files?.length ? 'var(--color-text)' : 'var(--color-text-muted)';
  }

  return <div className="admin" lang={locale} onChange={(event) => {
    if (event.target instanceof HTMLInputElement && event.target.type === 'file') fileInputTheme(event as ChangeEvent<HTMLInputElement>);
  }}>
    <header className="admin-header">
      <Link className="admin-brand" to="/admin">Mischa Tangian <span>{copy.admin}</span></Link>
      <div className="admin-header-actions">
        <div className="admin-language" role="group" aria-label={locale === 'de' ? 'Sprache' : 'Language'}>
          {(['de', 'en'] as const).map((language) => <button key={language} aria-pressed={language === locale} onClick={() => setLocale(language)}>{language.toUpperCase()}</button>)}
        </div>
        <Link to={`/${locale}`}>{copy.website}</Link>
        {session && <button className="admin-button" disabled={busy} onClick={signOut}>{busy ? copy.signingOut : copy.logout}</button>}
      </div>
    </header>
    <main className="admin-main">
      {!supabase ? <p role="alert">{copy.unconfigured}</p> : sessionState === 'loading' ? <p role="status">{copy.loading}</p> : sessionState === 'error' ? <div className="admin-message"><p role="alert">{copy.sessionFailed}</p><button className="admin-button" onClick={() => { setSessionState('loading'); setSessionAttempt((value) => value + 1); }}>{copy.retry}</button></div> : session ? <>
        <p className="admin-account">{session.user.email}</p>
        {error && <p className="admin-error" role="alert">{copy[error]}</p>}
        <AdminWorks key={`${session.user.id}:${session.access_token}`} locale={locale} />
      </> : <section className="admin-login" aria-labelledby="admin-login-title">
        <h1 id="admin-login-title">{copy.login}</h1>
        <form onSubmit={signIn}>
          <label htmlFor="admin-email">{copy.email}</label>
          <input id="admin-email" name="email" type="email" autoComplete="username" required disabled={busy} />
          <label htmlFor="admin-password">{copy.password}</label>
          <input id="admin-password" name="password" type="password" autoComplete="current-password" required disabled={busy} />
          {error && <p className="admin-error" role="alert">{copy[error]}</p>}
          <button className="admin-button admin-button--primary" type="submit" disabled={busy}>{busy ? copy.signingIn : copy.login}</button>
        </form>
      </section>}
    </main>
  </div>;
}
