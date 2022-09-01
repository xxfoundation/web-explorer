import type { Performance } from './types';
import type { Account } from '../../schemas/accounts.schema';
import { Slash } from '../../schemas/slashes.schema';

type ScoringContext = {
  currentEra: number;
  account: Account;
  slashes: Slash[];
}

type ScoringArray = [Performance, (ctx: ScoringContext) => boolean][];
type DescriptionMap = Partial<Record<Performance, string>>;
type PerformanceScoring = {
  label: string;
  scoring: ScoringArray;
  descriptionTemplate?: string;
  descriptions: DescriptionMap;
}

const performances: PerformanceAnalysis[] = [
  {
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
    }
  }, {
    label: 'Address Creation',
    scoring: [
      ['Very Good', ({ account: a, currentEra: e }) => e - a.whenCreatedEra >= 365],
      ['Good', ({ account: a, currentEra: e }) => {
        const diff = e - a.whenCreatedEra;
        return diff < 365 && diff >= 180; 
      }],
      ['Neutral', ({ account: a, currentEra: e }) =>  e - a.whenCreatedEra < 180]
    ],
    descriptionTemplate: 'Stash address was created at block # blockNumber making it a {{description}}',
    descriptions: {
      'Neutral': 'junior',
      'Good': 'senior',
      'Very Good': 'veteran'
    }
  },
  {
    label: 'Slashes',
    scoring: [
      ['Very Bad', (ctx) => ctx.slashes.filter((s) => ctx.currentEra - s.era < 28).length > 1],
      ['Bad', (ctx) => ctx.slashes.filter((s) => ctx.currentEra - s.era < 28).length === 1],
      ['Good', (ctx) => true]
    ],
    descriptions: {
      'Very Bad': 'Slashed more than once',
      'Bad': 'Slashed only once',
      'Good': 'No slashes detected'
    }
  }
];

export const identityScoring: ScoringArray = ;

export const addressScoring: ScoringArray = [
  ['Very Good', ({ account: a, currentEra: e }) => e - a.whenCreatedEra >= 365],
  ['Good', ({ account: a, currentEra: e }) => {
    const diff = e - a.whenCreatedEra;
    return diff < 365 && diff >= 180; 
  }],
  ['Neutral', ({ account: a, currentEra: e }) =>  e - a.whenCreatedEra < 180]
];
