import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getLocale, localizePath } from '../i18n';
import { getHomepageEvents, type PublicEvent } from '../../content/events';
import {
  contactBackgroundImage,
  featuredWorkBackgroundImage,
  galleryPreviewImages,
  homeHeroImage,
  portraitImage,
} from '../../content/gallery';
import { getFeaturedNewsItems } from '../../content/news';

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
    de: 'Mischa Tangian dirigiert',
    en: 'Mischa Tangian conducting',
  },
  portraitCaption: {
    de: 'Ausgewaehltes Bild fuer die Startseite aus dem gelieferten Fotomaterial.',
    en: 'Selected homepage image from the supplied photography.',
  },
  currentTitle: {
    de: 'Aktuelle Termine',
    en: 'Current Dates',
  },
  allDates: {
    de: 'Alle Termine',
    en: 'All dates',
  },
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
    de: 'Presse und News',
    en: 'Press and News',
  },
  newsArchive: {
    de: 'News-Archiv',
    en: 'News archive',
  },
  galleryTitle: {
    de: 'Galerie',
    en: 'Gallery',
  },
  galleryArchive: {
    de: 'Alle Bilder',
    en: 'All images',
  },
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

function formatDate(value: string | null, locale: 'de' | 'en') {
  if (!value) return homeCopy.dateTbc[locale];
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

function eventMeta(event: PublicEvent) {
  return [event.type, event.venue, event.city].filter(Boolean).join(' · ');
}

export function RootRoute() {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const newsItems = getFeaturedNewsItems();

  useEffect(() => {
    let cancelled = false;
    getHomepageEvents(locale).then((nextEvents) => {
      if (!cancelled) setEvents(nextEvents);
    });
    return () => { cancelled = true; };
  }, [locale]);

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
          <img
            className="home-hero__image"
            src={homeHeroImage.large}
            alt={homeHeroImage.alt[locale]}
            fetchPriority="high"
            decoding="async"
          />
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

        <div className="date-list" aria-label={homeCopy.currentTitle[locale]}>
          {events.map((event) => (
            <article className="date-list__item" key={event.id}>
              <time className="date-list__date" dateTime={event.date ?? undefined}>
                {formatDate(event.date, locale)}
              </time>
              <div>
                <h3 className="date-list__title">{event.title}</h3>
                <p className="date-list__meta">{event.description ?? eventMeta(event)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section featured-work" aria-labelledby="featured-title">
        <img
          className="featured-work__image"
          src={featuredWorkBackgroundImage.large}
          alt={featuredWorkBackgroundImage.alt[locale]}
          loading="lazy"
          decoding="async"
        />
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
          {newsItems.map((item) => (
            <article className="news-preview__item" key={item.slug}>
              <p className="news-preview__date">{item.source}</p>
              <h3>{item.title[locale]}</h3>
              <p>{item.excerpt[locale]}</p>
              <Link className="text-link" to={localizePath(`/news/${item.slug}`, locale)}>
                {homeCopy.newsArchive[locale]}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section gallery-preview" aria-labelledby="gallery-title">
        <div className="home-section__header">
          <h2 id="gallery-title">{homeCopy.galleryTitle[locale]}</h2>
          <Link className="text-link" to={localizePath('/gallery', locale)}>
            {homeCopy.galleryArchive[locale]}
          </Link>
        </div>

        <div className="gallery-preview__grid">
          {galleryPreviewImages.map((image, index) => (
            <Link className="gallery-preview__item" to={localizePath('/gallery', locale)} key={image.slug}>
              <img src={image.thumb} alt={image.alt[locale]} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
              <span>{image.category[locale]}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section about-preview" aria-labelledby="about-title">
        <img className="about-preview__image" src={portraitImage.thumb} alt={portraitImage.alt[locale]} loading="lazy" decoding="async" />
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

      <section className="home-section contact-preview contact-preview--image" aria-labelledby="contact-title">
        <img className="contact-preview__image" src={contactBackgroundImage.large} alt={contactBackgroundImage.alt[locale]} loading="lazy" decoding="async" />
        <div className="contact-preview__content">
          <h2 id="contact-title">{homeCopy.contactTitle[locale]}</h2>
          <p>
            {homeCopy.contactCopy[locale]}
          </p>
          <Link className="text-link text-link--strong" to={localizePath('/contact', locale)}>
            {homeCopy.contactAction[locale]}
          </Link>
        </div>
      </section>
    </div>
  );
}
