import type { PerformanceData, ScoringContext, ScoringArray } from './types';

const getPerformance = (ctx: ScoringContext, predicates: ScoringArray): Performance => {
  const score = predicates.find(([,fn]) => !!fn(ctx))?.[0] ?? 'Very Bad';
  // IDE shitting the bed here
  return score as unknown as Performance;
}

const getDescription = ({ descriptionTemplate, descriptions }: PerformanceData, score: Performance): string => {
  const description = descriptions[score];
}