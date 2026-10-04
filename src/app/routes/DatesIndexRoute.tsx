import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getLocale } from '../i18n';
import { getPublishedEvents, type PublicEvent } from '../../content/events';

const copy = {
  pageTitle: {
    de: 'Termine',
    en: 'Dates',
  },
  intro: {
    de: 'Kommende Auffuehrungen und ein wachsendes Archiv vergangener Konzerte.',
    en: 'Upcoming performances and a growing archive of past concerts.',
  },
  upcoming: {
    de: 'Kommend',
    en: 'Upcoming',
  },
  archive: {
    de: 'Archiv',
    en: 'Archive',
  },
  noUpcoming: {
    de: 'Derzeit sind keine kommenden Termine veroeffentlicht.',
    en: 'No upcoming dates are currently published.',
  },
  noArchive: {
    de: 'Archivtermine werden ergaenzt, sobald sie freigegeben sind.',
    en: 'Archive dates will appear after they are approved.',
  },
  dateTbc: {
    de: 'Datum folgt',
    en: 'Date TBC',
  },
  info: {
    de: 'Info',
    en: 'Info',
  },
  loading: {
    de: 'Termine werden geladen.',
    en: 'Loading dates.',
  },
};

function formatDate(value: string | null, locale: 'de' | 'en') {
  if (!value) return copy.dateTbc[locale];
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`));
}

function eventLocation(event: PublicEvent) {
  return [event.venue, event.city].filter(Boolean).join(', ');
}

function EventList({
  events,
  empty,
  locale,
}: {
  events: PublicEvent[];
  empty: string;
  locale: 'de' | 'en';
}) {
  if (events.length === 0) {
    return <p className="dates-empty">{empty}</p>;
  }

  return (
    <div className="dates-list">
      {events.map((event) => (
        <article className="dates-list__item" key={event.id}>
          <time className="dates-list__date" dateTime={event.date ?? undefined}>
            {formatDate(event.date, locale)}
          </time>
          <div className="dates-list__body">
            <h3>{event.title}</h3>
            <div className="dates-list__meta">
              {event.type ? <span>{event.type}</span> : null}
              {eventLocation(event) ? <span>{eventLocation(event)}</span> : null}
            </div>
            {event.description ? <p>{event.description}</p> : null}
            {event.externalLink ? (
              <a className="text-link" href={event.externalLink} rel="noreferrer" target="_blank">
                {copy.info[locale]}
              </a>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export function DatesIndexRoute() {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);
  const [events, setEvents] = useState<{ upcoming: PublicEvent[]; archive: PublicEvent[] }>({ upcoming: [], archive: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    getPublishedEvents(locale).then((nextEvents) => {
      if (!cancelled) setEvents(nextEvents);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [locale]);

  return (
    <div className="page-frame dates-page">
      <section className="dates-intro" aria-labelledby="dates-title">
        <h1 id="dates-title">{copy.pageTitle[locale]}</h1>
        <p>{copy.intro[locale]}</p>
      </section>

      {isLoading ? <p className="dates-loading" role="status">{copy.loading[locale]}</p> : null}

      <section className="dates-section" aria-labelledby="dates-upcoming-title">
        <h2 id="dates-upcoming-title">{copy.upcoming[locale]}</h2>
        <EventList events={events.upcoming} empty={copy.noUpcoming[locale]} locale={locale} />
      </section>

      <section className="dates-section" aria-labelledby="dates-archive-title">
        <h2 id="dates-archive-title">{copy.archive[locale]}</h2>
        <EventList events={events.archive} empty={copy.noArchive[locale]} locale={locale} />
      </section>
    </div>
  );
}
