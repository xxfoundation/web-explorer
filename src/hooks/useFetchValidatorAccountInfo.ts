import { useQuery } from '@apollo/client';
import { GetAccountByAddressType, GET_ACCOUNT_BY_PK } from '../schemas/accounts.schema';
import { GET_VALIDATOR_STATS } from '../schemas/staking.schema';

const useFetchValidatorAccountInfo = (
  accountId: string
): { loading: boolean; data?: Partial<GetAccountByAddressType> } => {
  const accountResult = useQuery<Omit<GetAccountByAddressType, 'validator'>>(GET_ACCOUNT_BY_PK, {
    variables: { accountId }
  });
  const validatorStatsResult = useQuery<Omit<GetAccountByAddressType, 'account'>>(
    GET_VALIDATOR_STATS,
    {
      variables: {
        where: {
          stash_address: {
            _eq: accountId
          }
        }
      }
    }
  );

  if (accountResult.loading || validatorStatsResult.loading) {
    return { loading: true };
  }

  return {
    loading: false,
    data: {
      account: accountResult.data?.account,
      validator: validatorStatsResult.data?.validator
    }
  };
};

export default useFetchValidatorAccountInfo;
