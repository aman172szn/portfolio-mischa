import { createContext } from 'react';

export type ScoreDocument = {
  id: string;
  title: string;
  metadata: string;
  source?: string | null;
};

export type ScoreReaderContextValue = {
  activeScore: ScoreDocument | null;
  currentPage: number;
  isOpen: boolean;
  openScore: (score: ScoreDocument) => void;
  closeScore: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
};

export const ScoreReaderContext = createContext<ScoreReaderContextValue | null>(null);
