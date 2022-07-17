import { MetricScores } from '../../../types';

const baseMsg = (value: unknown) => `The validator ${value}`;

const getGovernanceScore = ({
  democracy
}: {
  democracy: {
    latestNumberOfVotes: number;
    missedProposals: number;
    proposalVotePerMonth: number;
    proposalVoteForCouncil: number;
    councilMember: boolean;
  };
}): [MetricScores, string] => {
  if (!democracy) {
    return ['very bad', baseMsg('Never participated in Democracy')];
  }
  if (democracy.missedProposals && !!democracy.latestNumberOfVotes) {
    return ['bad', baseMsg('have not been actively participating in governance')];
  }
  if (democracy.proposalVotePerMonth && democracy.proposalVoteForCouncil) {
    return ['good', 'has been actively participating in governance'];
  }
  if (democracy.councilMember && !!democracy.missedProposals) {
    return [
      'very good',
      'is part of the Council and has been participating actively in governance'
    ];
  }
  // ???
  return ['neutral', baseMsg('has participated a unknown number of time in governance')];
};

export default getGovernanceScore;
