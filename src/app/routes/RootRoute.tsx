import { Link, useParams } from 'react-router-dom';

import { getLocale, localizePath } from '../i18n';

const homeCopy = {
  heroMeta: {
    de: 'Composer - Berlin',
    en: 'Composer - Berlin',
  },
  heroCopy: {
    de: 'Ein zweisprachiges Portfolio und digitales Archiv fuer Werke, Aufnahmen, Partituren, Termine, News und professionelles Material.',
    en: 'A bilingual portfolio and digital archive for works, recordings, scores, dates, news, and professional materials.',
  },
  actions: {
    works: {
      de: 'Werke ansehen',
      en: 'Explore works',
    },
    dates: {
      de: 'Termine ansehen',
      en: 'View dates',
    },
  },
  portraitLabel: {
    de: 'Portraet-Platzhalter',
    en: 'Portrait placeholder',
  },
  portraitCaption: {
    de: 'Portraet-Platzhalter - durch freigegebene Fotografie ersetzen.',
    en: 'Portrait placeholder - replace with approved photography.',
  },
  currentTitle: {
    de: 'Aktuelle Termine',
    en: 'Current Dates',
  },
  allDates: {
    de: 'Alle Termine',
    en: 'All dates',
  },
  dates: [
    {
      title: {
        de: 'Kommender Auftritt Platzhalter',
        en: 'Upcoming performance placeholder',
      },
      meta: {
        de: 'Stadt, Ort, Programm und Werkbezug werden noch geliefert.',
        en: 'City, venue, programme and work reference to be supplied.',
      },
    },
    {
      title: {
        de: 'Archiv-Eintrag Platzhalter',
        en: 'Archive entry placeholder',
      },
      meta: {
        de: 'Historische Konzertdetails werden dasselbe Terminmodell nutzen.',
        en: 'Historical concert details will use the same event model.',
      },
    },
  ],
  dateTbc: {
    de: 'Datum folgt',
    en: 'Date TBC',
  },
  featuredTitle: {
    de: 'Ausgewaehltes Werk',
    en: 'Featured Work',
  },
  workTitle: {
    de: 'Werktitel Platzhalter',
    en: 'Work title placeholder',
  },
  workCopy: {
    de: 'Besetzung, Jahr, Beschreibung, Audio und Partiturzugang werden aus verifizierten Kundeninhalten befuellt.',
    en: 'Instrumentation, year, description, audio and full score access will be populated from verified client content.',
  },
  listen: {
    de: 'Anhoeren',
    en: 'Listen',
  },
  viewScore: {
    de: 'Partitur ansehen',
    en: 'View score',
  },
  downloadScore: {
    de: 'Partitur herunterladen',
    en: 'Download score',
  },
  newsTitle: {
    de: 'Neueste News',
    en: 'Latest News',
  },
  newsArchive: {
    de: 'News-Archiv',
    en: 'News archive',
  },
  publicationTbc: {
    de: 'Veroeffentlichungsdatum folgt',
    en: 'Publication date TBC',
  },
  news: [
    {
      title: {
        de: 'News-Platzhalter',
        en: 'News item placeholder',
      },
      body: {
        de: 'Kurzer deutscher Quelltext und automatische englische Uebersetzung werden ueber den Admin-Workflow verwaltet.',
        en: 'Short German source text and automatic English translation will be managed through the admin workflow.',
      },
    },
    {
      title: {
        de: 'Archiv-Platzhalter',
        en: 'Archive item placeholder',
      },
      body: {
        de: 'Die Startseite zeigt ein oder zwei aktuelle Beitraege mit einem klaren Weg ins vollstaendige Archiv.',
        en: 'The homepage will surface one or two recent posts with a clear path into the full archive.',
      },
    },
  ],
  aboutTitle: {
    de: 'Ueber',
    en: 'About',
  },
  aboutCopy: {
    de: 'Biografietext wird erst ergaenzt, nachdem er von Mischa geliefert oder freigegeben wurde. Dieser Bereich reserviert Platz fuer eine kurze Einfuehrung und ein Portraet.',
    en: 'Biography copy will be added only after it is supplied or approved by Mischa. This section reserves space for a concise introduction and portrait.',
  },
  aboutAction: {
    de: 'Ueber Mischa',
    en: 'About Mischa',
  },
  contactTitle: {
    de: 'Kontakt',
    en: 'Contact',
  },
  contactCopy: {
    de: 'Kontaktdaten und professionelle Links werden aus verifiziertem Kundenmaterial ergaenzt.',
    en: 'Contact details and professional links will be added from verified client material.',
  },
  contactAction: {
    de: 'Kontaktseite',
    en: 'Contact page',
  },
} as const;

export function RootRoute() {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <div className="home-hero__content">
          <p className="home-hero__meta">{homeCopy.heroMeta[locale]}</p>
          <h1 className="home-hero__title" id="home-title">
            Mischa Tangian
          </h1>
          <p className="home-hero__copy">{homeCopy.heroCopy[locale]}</p>
          <div className="home-hero__actions" aria-label="Primary actions">
            <Link className="text-link text-link--strong" to={localizePath('/works', locale)}>
              {homeCopy.actions.works[locale]}
            </Link>
            <Link className="text-link" to={localizePath('/dates', locale)}>
              {homeCopy.actions.dates[locale]}
            </Link>
          </div>
        </div>

        <div className="home-hero__media" aria-label={homeCopy.portraitLabel[locale]}>
          <div className="home-hero__image" />
          <p className="home-hero__caption">
            {homeCopy.portraitCaption[locale]}
          </p>
        </div>
      </section>

      <section className="home-section home-section--current" aria-labelledby="current-title">
        <div className="home-section__header">
          <h2 id="current-title">{homeCopy.currentTitle[locale]}</h2>
          <Link className="text-link" to={localizePath('/dates', locale)}>
            {homeCopy.allDates[locale]}
          </Link>
        </div>

        <div className="date-list" aria-label="Placeholder current dates">
          {homeCopy.dates.map((item) => (
            <article className="date-list__item" key={item.title.en}>
              <time className="date-list__date">{homeCopy.dateTbc[locale]}</time>
              <div>
                <h3 className="date-list__title">{item.title[locale]}</h3>
                <p className="date-list__meta">{item.meta[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section featured-work" aria-labelledby="featured-title">
        <div className="featured-work__image" aria-hidden="true" />
        <div className="featured-work__content">
          <h2 id="featured-title">{homeCopy.featuredTitle[locale]}</h2>
          <p className="featured-work__title">{homeCopy.workTitle[locale]}</p>
          <p className="featured-work__copy">
            {homeCopy.workCopy[locale]}
          </p>
          <div className="featured-work__actions">
            <Link className="text-link text-link--strong" to={localizePath('/works', locale)}>
              {homeCopy.listen[locale]}
            </Link>
            <Link className="text-link" to={localizePath('/works', locale)}>
              {homeCopy.viewScore[locale]}
            </Link>
            <Link className="text-link" to={localizePath('/works', locale)}>
              {homeCopy.downloadScore[locale]}
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section news-preview" aria-labelledby="news-title">
        <div className="home-section__header">
          <h2 id="news-title">{homeCopy.newsTitle[locale]}</h2>
          <Link className="text-link" to={localizePath('/news', locale)}>
            {homeCopy.newsArchive[locale]}
          </Link>
        </div>

        <div className="news-preview__grid">
          {homeCopy.news.map((item) => (
            <article className="news-preview__item" key={item.title.en}>
              <p className="news-preview__date">{homeCopy.publicationTbc[locale]}</p>
              <h3>{item.title[locale]}</h3>
              <p>{item.body[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section about-preview" aria-labelledby="about-title">
        <div>
          <h2 id="about-title">{homeCopy.aboutTitle[locale]}</h2>
          <p className="about-preview__copy">
            {homeCopy.aboutCopy[locale]}
          </p>
        </div>
        <Link className="text-link text-link--strong" to={localizePath('/about', locale)}>
          {homeCopy.aboutAction[locale]}
        </Link>
      </section>

      <section className="home-section contact-preview" aria-labelledby="contact-title">
        <h2 id="contact-title">{homeCopy.contactTitle[locale]}</h2>
        <p>
          {homeCopy.contactCopy[locale]}
        </p>
        <Link className="text-link text-link--strong" to={localizePath('/contact', locale)}>
          {homeCopy.contactAction[locale]}
        </Link>
      </section>
    </div>
  );
}
