import { useEffect, useRef } from 'react';

import { getLocale, type Locale } from '../i18n';
import { placeholderScorePdf } from './scorePlaceholder';
import { useScoreReader } from './useScoreReader';

type ScoreReaderProps = {
  locale: Locale;
};

const copy = {
  close: {
    de: 'Schliessen',
    en: 'Close',
  },
  download: {
    de: 'Partitur herunterladen',
    en: 'Download score',
  },
  fullscreen: {
    de: 'Vollbild',
    en: 'Fullscreen',
  },
  next: {
    de: 'Naechste Seite',
    en: 'Next page',
  },
  page: {
    de: 'Seite',
    en: 'Page',
  },
  previous: {
    de: 'Vorherige Seite',
    en: 'Previous page',
  },
  readerLabel: {
    de: 'Partiturleser',
    en: 'Score reader',
  },
} as const;

export function ScoreReader({ locale }: ScoreReaderProps) {
  const {
    activeScore,
    closeScore,
    currentPage,
    goToNextPage,
    goToPreviousPage,
    isOpen,
  } = useScoreReader();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const resolvedLocale = getLocale(locale);
  const source = activeScore?.source || placeholderScorePdf;
  const framedSource = `${source}#page=${currentPage}&toolbar=0&navpanes=0`;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeScore();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    panelRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeScore, isOpen]);

  if (!isOpen || !activeScore) {
    return null;
  }

  return (
    <div className="score-reader" role="presentation">
      <div
        aria-label={copy.readerLabel[resolvedLocale]}
        aria-modal="true"
        className="score-reader__panel"
        ref={panelRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className="score-reader__header">
          <div>
            <p className="score-reader__meta">{activeScore.metadata}</p>
            <h2>{activeScore.title}</h2>
          </div>
          <button className="score-reader__close" type="button" onClick={closeScore}>
            {copy.close[resolvedLocale]}
          </button>
        </header>

        <div className="score-reader__toolbar" aria-label={copy.readerLabel[resolvedLocale]}>
          <button type="button" disabled={currentPage <= 1} onClick={goToPreviousPage}>
            {copy.previous[resolvedLocale]}
          </button>
          <span>
            {copy.page[resolvedLocale]} {currentPage}
          </span>
          <button type="button" onClick={goToNextPage}>
            {copy.next[resolvedLocale]}
          </button>
          <button
            type="button"
            onClick={() => {
              void panelRef.current?.requestFullscreen();
            }}
          >
            {copy.fullscreen[resolvedLocale]}
          </button>
          <a download={`${activeScore.id}.pdf`} href={source}>
            {copy.download[resolvedLocale]}
          </a>
        </div>

        <iframe
          className="score-reader__frame"
          src={framedSource}
          title={activeScore.title}
        />
      </div>
      <button
        aria-label={copy.close[resolvedLocale]}
        className="score-reader__backdrop"
        type="button"
        onClick={closeScore}
      />
    </div>
  );
}
