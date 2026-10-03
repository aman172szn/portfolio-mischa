import { useState, type CSSProperties } from 'react';

import { useAudioPlayer } from './useAudioPlayer';
import type { Locale } from '../i18n';

type PersistentAudioPlayerProps = {
  locale: Locale;
};

const copy = {
  idleTitle: {
    de: 'Audio bereit',
    en: 'Audio ready',
  },
  idleMeta: {
    de: 'Waehle ein Werk aus dem Katalog.',
    en: 'Choose a work from the catalogue.',
  },
  play: {
    de: 'Abspielen',
    en: 'Play',
  },
  pause: {
    de: 'Pausieren',
    en: 'Pause',
  },
  progress: {
    de: 'Wiedergabeposition',
    en: 'Playback position',
  },
  expand: {
    de: 'Player erweitern',
    en: 'Expand player',
  },
  collapse: {
    de: 'Player einklappen',
    en: 'Collapse player',
  },
} as const;

const waveformBars = [34, 58, 42, 76, 48, 64, 38, 70, 52, 84, 44, 68, 36, 62, 46, 74];

function formatTime(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return '0:00';
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');

  return `${minutes}:${seconds}`;
}

export function PersistentAudioPlayer({ locale }: PersistentAudioPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    activeTrack,
    currentTime,
    duration,
    isPlaying,
    progress,
    seekToPercent,
    togglePlayback,
  } = useAudioPlayer();
  const title = activeTrack?.title ?? copy.idleTitle[locale];
  const metadata = activeTrack?.metadata ?? copy.idleMeta[locale];

  return (
    <aside
      aria-label="Audio player"
      className="audio-player"
      data-expanded={isExpanded}
      data-idle={!activeTrack}
    >
      <button
        aria-label={isPlaying ? copy.pause[locale] : copy.play[locale]}
        className="audio-player__play"
        disabled={!activeTrack}
        type="button"
        onClick={() => {
          void togglePlayback();
        }}
      >
        <span aria-hidden="true" className={isPlaying ? 'audio-player__pause-icon' : 'audio-player__play-icon'} />
      </button>

      <div className="audio-player__track">
        <p className="audio-player__title">{title}</p>
        <p className="audio-player__meta">{metadata}</p>
      </div>

      <div className="audio-player__waveform" aria-hidden="true">
        {waveformBars.map((height, index) => (
          <span
            data-active={(index / waveformBars.length) * 100 <= progress}
            key={`${height}-${index}`}
            style={{ '--bar-height': `${height}%` } as CSSProperties}
          />
        ))}
      </div>

      <div className="audio-player__time" aria-live="polite">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <label className="audio-player__seek">
        <span>{copy.progress[locale]}</span>
        <input
          aria-label={copy.progress[locale]}
          disabled={!activeTrack || !duration}
          max="100"
          min="0"
          step="0.1"
          type="range"
          value={progress}
          onChange={(event) => {
            seekToPercent(Number(event.currentTarget.value));
          }}
          onInput={(event) => {
            seekToPercent(Number(event.currentTarget.value));
          }}
        />
      </label>

      <button
        aria-label={isExpanded ? copy.collapse[locale] : copy.expand[locale]}
        className="audio-player__expand"
        type="button"
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span aria-hidden="true" />
      </button>
    </aside>
  );
}
