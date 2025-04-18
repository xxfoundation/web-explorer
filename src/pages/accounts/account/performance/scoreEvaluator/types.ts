import { Account } from '../../../../../schemas/accounts.schema';
import { Slash } from '../../../../../schemas/slashes.schema';
import { ValidatorStats } from '../../../../../schemas/staking.schema';
import { GetAvgValidatorRelativePerformance } from '../../../../../schemas/validator.schema';

export type ScoringContext = {
  account: Account;
  currentEra: number;
  nominatorCount: number;
  slashes: Slash[];
  stats: ValidatorStats[];
  commission: number;
  payoutTotalEras: number;
  payoutClaimedEras: number;
  networkEraPoints: GetAvgValidatorRelativePerformance;
};