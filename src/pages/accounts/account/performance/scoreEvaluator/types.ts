import { Account } from '../../../../../schemas/accounts.schema';
import { Slash } from '../../../../../schemas/slashes.schema';
import { ValidatorStats } from '../../../../../schemas/staking.schema';

export type ScoringContext = {
  account: Account;
  currentEra: number;
  nominatorCount: number;
  slashes: Slash[];
  stats: ValidatorStats[];
  avgCommission: number;
  rewardFrequency: number;
  unclaimedRewards: number;
};