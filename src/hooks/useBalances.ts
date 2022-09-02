import type { DeriveBalancesAll } from '@polkadot/api-derive/types';

import useApi from './useApi';
import useCall from './useCall';

/**
 * Gets the account full balance information
 *
 * @param accountAddress The account address of which balance is to be returned
 * @returns full information about account's balances
 */
function useBalances(accountAddress: string): DeriveBalancesAll | undefined {
  const { api } = useApi();

  return useCall<DeriveBalancesAll>(api?.derive.balances?.all, [accountAddress]);
}

export default useBalances;
