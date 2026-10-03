import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';

import { getPlaceholderAudioSource } from './audioPlaceholder';
import {
  AudioPlayerContext,
  type AudioPlayerContextValue,
  type AudioTrack,
} from './audioPlayerContextValue';

type AudioPlayerProviderProps = {
  children: ReactNode;
};

export function AudioPlayerProvider({ children }: AudioPlayerProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] = useState<AudioTrack | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'metadata';
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime ?? 0);
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      audioRef.current.addEventListener('pause', () => {
        setIsPlaying(false);
      });
      audioRef.current.addEventListener('play', () => {
        setIsPlaying(true);
      });
    }

    return audioRef.current;
  }, []);

  const playTrack = useCallback(
    async (track: AudioTrack) => {
      const audio = ensureAudio();
      const source = track.source || getPlaceholderAudioSource();

      if (activeTrack?.id !== track.id || audio.src !== source) {
        audio.src = source;
        audio.currentTime = 0;
        setCurrentTime(0);
        setDuration(0);
        setActiveTrack(track);
      }

      await audio.play();
    },
    [activeTrack?.id, ensureAudio],
  );

  const togglePlayback = useCallback(async () => {
    const audio = ensureAudio();

    if (!activeTrack) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      return;
    }

    audio.pause();
  }, [activeTrack, ensureAudio]);

  const seekToPercent = useCallback(
    (value: number) => {
      const audio = ensureAudio();

      if (!duration) {
        return;
      }

      const nextTime = (duration * value) / 100;
      audio.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration, ensureAudio],
  );

  const contextValue = useMemo<AudioPlayerContextValue>(
    () => ({
      activeTrack,
      currentTime,
      duration,
      isPlaying,
      progress: duration ? (currentTime / duration) * 100 : 0,
      playTrack,
      seekToPercent,
      togglePlayback,
    }),
    [activeTrack, currentTime, duration, isPlaying, playTrack, seekToPercent, togglePlayback],
  );

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
