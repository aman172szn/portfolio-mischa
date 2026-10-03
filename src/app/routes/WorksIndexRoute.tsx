import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAudioPlayer } from '../audio/useAudioPlayer';
import { getLocale, localizePath } from '../i18n';
import { useScoreReader } from '../score/useScoreReader';
import { getPublishedWorkPreviews } from '../../content/works';
import type { WorkPreview } from '../../content/supabaseWorkPreview';

const copy = {
  pageTitle: {
    de: 'Werke',
    en: 'Works',
  },
  intro: {
    de: 'Ein redaktionelles Werkverzeichnis. Die Eintraege sind Platzhalter, bis die verifizierte Werkliste, Besetzungen und Beschreibungen vorliegen.',
    en: 'An editorial works catalogue. Entries are placeholders until the verified work list, instrumentation and descriptions are supplied.',
  },
  tableYear: {
    de: 'Jahr',
    en: 'Year',
  },
  tableTitle: {
    de: 'Titel',
    en: 'Title',
  },
  tableInstrumentation: {
    de: 'Besetzung',
    en: 'Instrumentation',
  },
  tableActions: {
    de: 'Aktionen',
    en: 'Actions',
  },
  yearTbc: {
    de: 'folgt',
    en: 'TBC',
  },
  details: {
    de: 'Details',
    en: 'Details',
  },
  listen: {
    de: 'Anhoeren',
    en: 'Listen',
  },
  score: {
    de: 'Partitur',
    en: 'Score',
  },
  unavailable: {
    de: 'folgt',
    en: 'TBC',
  },
  loading: {
    de: 'Werke werden geladen.',
    en: 'Loading works.',
  },
} as const;

export function WorksIndexRoute() {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);
  const [works, setWorks] = useState<WorkPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { playTrack } = useAudioPlayer();
  const { openScore } = useScoreReader();

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    void getPublishedWorkPreviews(locale).then((nextWorks) => {
      if (isMounted) {
        setWorks(nextWorks);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  return (
    <div className="page-frame works-page">
      <section className="works-intro" aria-labelledby="works-title">
        <h1 id="works-title">{copy.pageTitle[locale]}</h1>
        <p>{copy.intro[locale]}</p>
      </section>

      <section className="works-list" aria-label={copy.pageTitle[locale]}>
        <div className="works-list__head" aria-hidden="true">
          <span>{copy.tableYear[locale]}</span>
          <span>{copy.tableTitle[locale]}</span>
          <span>{copy.tableInstrumentation[locale]}</span>
          <span>{copy.tableActions[locale]}</span>
        </div>

        {isLoading ? <p className="works-list__loading">{copy.loading[locale]}</p> : null}

        {works.map((work) => (
          <article className="works-list__row" key={work.id}>
            <p className="works-list__year">{work.year ?? copy.yearTbc[locale]}</p>
            <div className="works-list__identity">
              <h2>
                <Link to={localizePath(`/works/${work.slug}`, locale)}>
                  {work.title}
                </Link>
              </h2>
              {work.featured ? <span className="works-list__badge">Featured</span> : null}
            </div>
            <p className="works-list__instrumentation">
              {work.instrumentation ?? copy.unavailable[locale]}
            </p>
            <div className="works-list__actions" aria-label={copy.tableActions[locale]}>
              <Link className="text-link text-link--strong" to={localizePath(`/works/${work.slug}`, locale)}>
                {copy.details[locale]}
              </Link>
              {work.hasAudio ? (
                <button
                  className="works-list__audio-button"
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
                  {copy.listen[locale]}
                </button>
              ) : (
                <span aria-disabled="true">{copy.unavailable[locale]}</span>
              )}
              {work.hasScore ? (
                <button
                  className="works-list__score-button"
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
              ) : (
                <span aria-disabled="true">{copy.unavailable[locale]}</span>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
