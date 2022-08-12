import type { DeriveStakingAccount } from '@polkadot/api-derive/types';

import useApi from './useApi';
import { useCall } from './useCall';

function useStakingInfo(accountId: string | null): DeriveStakingAccount | undefined {
  const { api } = useApi();

  return useCall<DeriveStakingAccount>(api?.derive.staking?.account, [accountId]);
}

export default useStakingInfo;
