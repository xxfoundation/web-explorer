import { useQuery } from '@apollo/client';
import { GetAccountByAddressType, GET_ACCOUNT_BY_PK } from '../schemas/accounts.schema';
import { GET_ACCOUNT_RANKING } from '../schemas/ranking.schema';

const useFetchRankingAccountInfo = (
  accountId: string
): { loading: boolean; data?: Partial<GetAccountByAddressType> } => {
  const accountResult = useQuery<Omit<GetAccountByAddressType, 'ranking'>>(GET_ACCOUNT_BY_PK, {
    variables: { accountId }
  });
  const accountRankingResult = useQuery<Omit<GetAccountByAddressType, 'account'>>(
    GET_ACCOUNT_RANKING,
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

  if (accountResult.loading || accountRankingResult.loading) {
    return { loading: true };
  }

  return {
    loading: false,
    data: {
      account: accountResult.data?.account,
      ranking: accountRankingResult.data?.ranking
    }
  };
};

export default useFetchRankingAccountInfo;
