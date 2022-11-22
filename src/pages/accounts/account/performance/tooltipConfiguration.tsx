import { MetricsType, ScoreDescriptions } from '../../types';

const tooltipsConfiguration: Record<
  MetricsType,
  { name: MetricsType; description: string; scores: ScoreDescriptions }
> = {
  identity: {
    name: 'identity',
    description: 'Evaluate the identity data provided by the validator',
    scores: {
      'very bad': 'None',
      bad: 'Display name',
      neutral: 'Display name and one contact info',
      good: 'Display name and at least two contact info',
      'very good': 'Display name, at least two contact info and, website or blurb'
    }
  },
  'address creation': {
    name: 'address creation',
    description: 'Evaluate how old is the validator address',
    scores: {
      neutral: 'Less than 6 months old',
      good: 'Between 6 months to a year old',
      'very good': 'More than a year old'
    }
  },
  slashes: {
    name: 'slashes',
    description: 'Evaluate if the validator was slashed in the last 28 eras.',
    scores: {
      'very bad': 'Slashed more than once or at least once in the last 28 eras.',
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
      bad: 'More than 256 nominators',
      neutral: 'Between 150 and 256 nominators',
      good: 'Less than 150 nominators'
    }
  },
  'performance': {
    name: 'performance',
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
      'very bad': '> 60 eras unclaimed',
      bad: '30 > 60 eras unclaimed',
      good: '7 > 30 eras unclaimed',
      'very good': '< 7 eras unclaimed'
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

export default tooltipsConfiguration;
