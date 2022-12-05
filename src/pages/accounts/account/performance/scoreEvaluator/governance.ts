import { MetricScores } from '../../../types';
import { ScoringContext } from './types';

const getGovernanceScore = ({
  // democracy
  t,
}: ScoringContext): [MetricScores, string] => {
  // if (!democracy) {
  //   return ['very bad', baseMsg('Never participated in Democracy')];
  // }

  // if (democracy.missedProposals && !!democracy.latestNumberOfVotes) {
  //   return ['bad', baseMsg('have not been actively participating in governance')];
  // }

  // if (democracy.proposalVotePerMonth && democracy.proposalVoteForCouncil) {
  //   return ['good', 'has been actively participating in governance'];
  // }

  // if (democracy.councilMember && !!democracy.missedProposals) {
  //   return [
  //     'very good',
  //     'is part of the Council and has been participating actively in governance'
  //   ];
  // }

  return ['neutral', t('The validator has participated a unknown number of time in governance')];
};

export default getGovernanceScore;
