import { TFunction } from 'i18next';
import { MetricsType, ScoreDescriptions } from '../../types';

type TooltipsConfig = Record<
  MetricsType,
  {
    name: MetricsType;
    description: string;
    scores: ScoreDescriptions
  }
>;

const tooltipsConfiguration = (t: TFunction): TooltipsConfig => ({
  identity: {
    name: 'identity',
    description: t('Evaluate the quality of the identity data provided by the validator'),
    scores: {
      'very bad': t('None'),
      bad: t('Display Name'),
      good: t('Display Name and Email'),
      'very good': t('Display Name, Email and Blurb + Judgment (Known Good)')
    }
  },
  'address creation': {
    name: 'address creation',
    description: t('Evaluate how old is the validator address'),
    scores: {
      neutral: t('CurrentEra - CreationEra ≤ 180'),
      good: t('180 ≤ CurrentEra - CreationEra < 365'),
      'very good': t('CurrentEra - CreationEra ≥ 365')
    }
  },
  slashes: {
    name: 'slashes',
    description: t('Evaluate if the validator was slashed in the last 28 eras.'),
    scores: {
      'very bad': t('Slashed more than once OR at least once in the last 28 eras.'),
      bad: t('Slashed only once'),
      good: t('Never Slashed')
    }
  },
  subaccounts: {
    name: 'subaccounts',
    description: t('Evaluate if the validator uses sub-accounts.'),
    scores: {
      neutral: t('No subaccounts'),
      good: t('At least 1 subaccount')
    }
  },
  nominators: {
    name: 'nominators',
    description:
      t('Evaluate nominators and if the validator is oversubscribed (256 - pulled from chain).'),
    scores: {
      bad: t('> 256 Nominators'),
      neutral: t('150 < Nominators < 256'),
      good: t('Nominators < 150')
    }
  },
  'era points': {
    name: 'era points',
    description:
      t('Evaluate if the era points earned by the validator in the history are below or above average'),
    scores: {
      'very good': t('> 90th percentile'),
      good: t('≤ 90th percentile'),
      neutral: t('≤ 70th percentile'),
      bad: t('≤ 30th percentile'),
      'very bad': t('≤ 10th percentile')
    }
  },
  commission: {
    name: 'commission',
    description: t('Evaluate validator commission over time.'),
    scores: {
      'very bad': '> 30%',
      bad: '18 > 30%',
      neutral: '10 > 18%',
      good: '5 > 10%',
      'very good': '< 5%'
    }
  },
  'frequency of payouts': {
    name: 'frequency of payouts',
    description: t('Evaluate frequency of rewards distribution (max 84 eras)'),
    scores: {
      'very bad': t('< 60 Eras'),
      bad: t('60 < 30 Eras'),
      good: t('30 < 7 Eras'),
      'very good': t('7 < 1 Era')
    }
  },
  governance: {
    name: 'governance',
    description:
      t('Evaluate if the validator is backing a council member and if is participating in a current proposal or referendum (as proposer or voter).'),
    scores: {
      'very bad': t('Never participated in Democracy'),
      bad: t('No votes in > 90 eras (if there is anything to vote on)'),
      good: t('Actively Voting (≥ 1 proposal vote per month) + Voted for Council Member(s)'),
      'very good': t('Part of the Council AND Actively voting')
    }
  },
  'validator time': {
    name: 'validator time',
    description:
      t('Evaluate if the address was a validator for the majority of its time in the network (since first time as a validator).'),
    scores: {
      bad: t('No. Eras as validator / (CurrentEra - FirstValidatorEra) < 0.75'),
      neutral: t('No. Eras as validator / (CurrentEra - FirstValidatorEra) < 0.90'),
      good: t('No. Eras as validator / (CurrentEra - FirstValidatorEra) > 0.90')
    }
  }
});

export default tooltipsConfiguration;
