import type { ScoringContext } from './types';
import { createContext , useContext } from 'react';

const ScoringCTX = createContext<ScoringContext>({} as ScoringContext);

export const ScoringProvider = ScoringCTX.Provider;
export const useScoringContext = () => useContext(ScoringCTX);
export default ScoringCTX;
