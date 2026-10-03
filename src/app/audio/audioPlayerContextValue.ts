import { createContext } from 'react';

export type AudioTrack = {
  id: string;
  title: string;
  metadata: string;
  source?: string | null;
};

export type AudioPlayerContextValue = {
  activeTrack: AudioTrack | null;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  progress: number;
  playTrack: (track: AudioTrack) => Promise<void>;
  togglePlayback: () => Promise<void>;
  seekToPercent: (value: number) => void;
};

export const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);
