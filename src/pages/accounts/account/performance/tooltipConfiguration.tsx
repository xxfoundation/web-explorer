import { MetricScores, MetricsType } from '../../types';

const tooltipsConfiguration: Record<
  MetricsType,
  { name: MetricsType; description: string; scores: Partial<Record<MetricScores, string>> }
> = {
  identity: {
    name: 'identity',
    description: 'Evaluate the quality of the identity data provided by the validator',
    scores: {
      'very bad': 'None',
      bad: 'Display Name',
      neutral: '',
      good: 'Display Name and Email',
      'very good': 'Display Name, Email and Blurb + Judgment (Known Good)'
    }
  },
  'address creation': {
    name: 'address creation',
    description: 'Evaluate how old is the validator address',
    scores: {
      neutral: 'CurrentEra - CreationEra ≤ 180',
      good: '180 ≤ CurrentEra - CreationEra < 365',
      'very good': 'CurrentEra - CreationEra ≥ 365'
    }
  },
  slashes: {
    name: 'slashes',
    description: 'Evaluate if the validator was slashed in the last 28 eras.',
    scores: {
      'very bad': 'Slashed more than once OR at least once in the last 28 eras.',
      bad: 'Slashed only once',
      good: 'Never Slashed'
    }
  },
  subaccounts: {
    name: 'subaccounts',
    description: 'Evaluate if the validator uses sub-accounts.',
    scores: {
      neutral: 'No subaccounts',
      good: 'At least 1 subaccount'
    }
  },
  nominators: {
    name: 'nominators',
    description:
      'Evaluate nominators and if the validator is oversubscribed (256 - pulled from chain).',
    scores: {
      bad: '> 256 Nominators',
      neutral: '150 < Nominators < 256',
      good: 'Nominators < 150'
    }
  },
  'era points': {
    name: 'era points',
    description:
      'Evaluate if the era points earned by the validator in the history are below or above average',
    scores: {
      'very good': '> 90th percentile',
      good: '≤ 90th percentile',
      neutral: '≤ 70th percentile',
      bad: '≤ 30th percentile',
      'very bad': '≤ 10th percentil'
    }
  },
  commission: {
    name: 'commission',
    description: 'Evaluate validator commission over time.',
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
    description: 'Evaluate frequency of rewards distribution (max 84 eras)',
    scores: {
      'very bad': '< 60 Eras',
      bad: '60 < 30 Eras',
      good: '30 < 7 Eras',
      'very good': '7 < 1 Era'
    }
  },
  governance: {
    name: 'governance',
    description:
      'Evaluate if the validator is backing a council member and if is participating in a current proposal or referendum (as proposer or voter).',
    scores: {
      'very bad': 'Never participated in Democracy',
      bad: 'No votes in > 90 eras (if there is anything to vote on)',
      good: 'Actively Voting (≥ 1 proposal vote per month) + Voted for Council Member(s)',
      'very good': 'Part of the Council AND Actively voting'
    }
  },
  'validator time': {
    name: 'validator time',
    description:
      'Evaluate if the address was a validator for the majority of its time in the network (since first time as a validator).',
    scores: {
      bad: 'No. Eras as validator / (CurrentEra - FirstValidatorEra) < 0.75',
      neutral: 'No. Eras as validator / (CurrentEra - FirstValidatorEra) < 0.90',
      good: 'No. Eras as validator / (CurrentEra - FirstValidatorEra) > 0.90'
    }
  }
};

const toolttipConfiguration = (metric: MetricsType) => {
  return { ...tooltipsConfiguration[metric] };
};

export default toolttipConfiguration;
