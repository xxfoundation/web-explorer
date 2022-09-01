import React, { FC, useMemo } from 'react';
import PerformanceCard from '../account/performance';
import { useScoringContext } from '../ScoringContext';
import { PerformanceData, ScoringArray, ScoringContext } from '../types';

const performance: PerformanceData = {
  label: 'Identity',
  scoring: [
    ['Very Good', (ctx) => {
      const i = ctx.account.identity;
      return !!i.display && !!i.email && !!i.blurb && !!i.judgements?.includes('Known Good');
    }],
    ['Good', (ctx) => {
      const i = ctx.account.identity;
      return !!i.display && !!i.email;
    }],
    ['Bad', (ctx) => !!ctx.account.identity.display],
    ['Very Bad', () => true]
  ],
  descriptionTemplate: 'Validator {{description}} information on his identity',
  descriptions: {
    'Very Good': 'provides all possible',
    'Good': 'partially provides',
    'Bad': 'barely provides',
    'Very Bad': 'did not add any',
  },
  tooltip: <></>
};


const Identity = () => {
  const ctx = useScoringContext();
  const score = 