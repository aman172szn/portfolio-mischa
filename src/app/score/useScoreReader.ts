import { useContext } from 'react';

import { ScoreReaderContext } from './scoreReaderContextValue';

export function useScoreReader() {
  const context = useContext(ScoreReaderContext);

  if (!context) {
    throw new Error('useScoreReader must be used within ScoreReaderProvider');
  }

  return context;
}
