import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAudioPlayer } from '../audio/useAudioPlayer';
import { getLocale, localizePath } from '../i18n';
import { useScoreReader } from '../score/useScoreReader';
import { getPublishedWorkBySlug, type WorkDetail } from '../../content/works';

const copy = {
  back: {
    de: 'Zurueck zu den Werken',
    en: 'Back to works',
  },
  notFoundTitle: {
    de: 'Werk nicht gefunden',
    en: 'Work not found',
  },
  notFoundBody: {
    de: 'Dieser Eintrag ist nicht verfuegbar oder noch nicht veroeffentlicht.',
    en: 'This entry is unavailable or has not been published yet.',
  },
  year: {
    de: 'Jahr',
    en: 'Year',
  },
  instrumentation: {
    de: 'Besetzung',
    en: 'Instrumentation',
  },
  duration: {
    de: 'Dauer',
    en: 'Duration',
  },
  audio: {
    de: 'Audio',
    en: 'Audio',
  },
  playTrack: {
    de: 'Abspielen',
    en: 'Play',
  },
  score: {
    de: 'Partitur',
    en: 'Score',
  },
  performances: {
    de: 'Auffuehrungen',
    en: 'Performances',
  },
  listenPlaceholder: {
    de: 'Aufnahme abspielen.',
    en: 'Play the available recording.',
  },
  scorePlaceholder: {
    de: 'Partitur im Browser oeffnen oder herunterladen.',
    en: 'Open the score in the browser or download it.',
  },
  performancesPlaceholder: {
    de: 'Derzeit sind keine Auffuehrungsdetails gelistet.',
    en: 'No performance details are listed yet.',
  },
  unavailable: {
    de: 'Nicht angegeben',
    en: 'Not listed',
  },
  loading: {
    de: 'Werk wird geladen.',
    en: 'Loading work.',
  },
} as const;

export function WorkDetailRoute() {
  const { locale: localeParam, slug } = useParams();
  const locale = getLocale(localeParam);
  const [work, setWork] = useState<WorkDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { playTrack } = useAudioPlayer();
  const { openScore } = useScoreReader();
  const audioTracks = work?.media.filter((item) => item.type === 'audio') ?? [];

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    void getPublishedWorkBySlug(slug, locale).then((nextWork) => {
      if (isMounted) {
        setWork(nextWork);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [locale, slug]);

  if (isLoading) {
    return (
      <div className="page-frame work-detail">
        <Link className="text-link" to={localizePath('/works', locale)}>
          {copy.back[locale]}
        </Link>
        <section className="route-placeholder" aria-labelledby="page-title">
          <h1 className="route-placeholder__title" id="page-title">
            {copy.loading[locale]}
          </h1>
        </section>
      </div>
    );
  }

  if (!work) {
    return (
      <div className="page-frame work-detail">
        <Link className="text-link" to={localizePath('/works', locale)}>
          {copy.back[locale]}
        </Link>
        <section className="route-placeholder" aria-labelledby="page-title">
          <h1 className="route-placeholder__title" id="page-title">
            {copy.notFoundTitle[locale]}
          </h1>
          <p className="route-placeholder__copy">{copy.notFoundBody[locale]}</p>
        </section>
      </div>
    );
  }

  return (
    <div className="page-frame work-detail">
      <Link className="text-link" to={localizePath('/works', locale)}>
        {copy.back[locale]}
      </Link>

      <article className="work-detail__article">
        <header className="work-detail__header">
          <div>
            <h1>{work.title}</h1>
            <p>{work.description ?? copy.unavailable[locale]}</p>
          </div>
          <dl className="work-detail__meta">
            <div>
              <dt>{copy.year[locale]}</dt>
              <dd>{work.year ?? copy.unavailable[locale]}</dd>
            </div>
            <div>
              <dt>{copy.instrumentation[locale]}</dt>
              <dd>{work.instrumentation ?? copy.unavailable[locale]}</dd>
            </div>
            <div>
              <dt>{copy.duration[locale]}</dt>
              <dd>{work.duration ?? copy.unavailable[locale]}</dd>
            </div>
          </dl>
        </header>

        <div className="work-detail__image" aria-hidden="true" />

        <section className="work-detail__section" aria-labelledby="work-audio-title">
          <h2 id="work-audio-title">{copy.audio[locale]}</h2>
          {audioTracks.length > 0 ? (
            <div className="work-detail__track-list">
              {audioTracks.map((track) => (
                <button
                  className="work-detail__track-button"
                  key={track.id}
                  type="button"
                  onClick={() => {
                    void playTrack({
                      id: track.id,
                      metadata: track.duration
                        ? `${work.title} - ${track.duration}`
                        : work.title,
                      source: track.source,
                      title: track.title,
                    });
                  }}
                >
                  <span>{track.title}</span>
                  <span>
                    {track.duration ?? copy.playTrack[locale]}
                  </span>
                </button>
              ))}
            </div>
          ) : work.hasAudio ? (
            <>
              <p>{copy.listenPlaceholder[locale]}</p>
              <button
                className="work-detail__audio-button"
                type="button"
                onClick={() => {
                  void playTrack({
                    id: work.id,
                    metadata: work.instrumentation ?? copy.unavailable[locale],
                    source: work.audioPath,
                    title: work.title,
                  });
                }}
              >
                {copy.audio[locale]}
              </button>
            </>
          ) : null}
        </section>

        <section className="work-detail__section" aria-labelledby="work-score-title">
          <h2 id="work-score-title">{copy.score[locale]}</h2>
          <p>{copy.scorePlaceholder[locale]}</p>
          {work.hasScore ? (
            <button
              className="work-detail__score-button"
              type="button"
              onClick={() => {
                openScore({
                  id: work.id,
                  metadata: work.instrumentation ?? copy.unavailable[locale],
                  source: work.scorePdfPath,
                  title: work.title,
                });
              }}
            >
              {copy.score[locale]}
            </button>
          ) : null}
        </section>

        <section className="work-detail__section" aria-labelledby="work-performances-title">
          <h2 id="work-performances-title">{copy.performances[locale]}</h2>
          <p>{copy.performancesPlaceholder[locale]}</p>
        </section>
      </article>
    </div>
  );
}
