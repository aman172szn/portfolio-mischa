import { useCallback, useMemo, useState, type ReactNode } from 'react';

import {
  ScoreReaderContext,
  type ScoreDocument,
  type ScoreReaderContextValue,
} from './scoreReaderContextValue';

type ScoreReaderProviderProps = {
  children: ReactNode;
};

export function ScoreReaderProvider({ children }: ScoreReaderProviderProps) {
  const [activeScore, setActiveScore] = useState<ScoreDocument | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const openScore = useCallback((score: ScoreDocument) => {
    setActiveScore(score);
    setCurrentPage(1);
  }, []);

  const closeScore = useCallback(() => {
    setActiveScore(null);
    setCurrentPage(1);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((page) => page + 1);
  }, []);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(1, page - 1));
  }, []);

  const contextValue = useMemo<ScoreReaderContextValue>(
    () => ({
      activeScore,
      closeScore,
      currentPage,
      goToNextPage,
      goToPreviousPage,
      isOpen: Boolean(activeScore),
      openScore,
    }),
    [activeScore, closeScore, currentPage, goToNextPage, goToPreviousPage, openScore],
  );

  return (
    <ScoreReaderContext.Provider value={contextValue}>
      {children}
    </ScoreReaderContext.Provider>
  );
}
