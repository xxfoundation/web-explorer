import { useQuery } from '@apollo/client';
import { GetAccountByAddressType, GET_ACCOUNT_BY_PK } from '../schemas/accounts.schema';
import { GET_RANKED_ACCOUNTS } from '../schemas/ranking.schema';

const useFetchRankingAccountInfo = (
  accountId: string
): { loading: boolean; data?: Partial<GetAccountByAddressType> } => {
  const accountResult = useQuery<Omit<GetAccountByAddressType, 'ranking'>>(GET_ACCOUNT_BY_PK, {
    variables: { accountId }
  });
  const accountRankingResult = useQuery<Omit<GetAccountByAddressType, 'account'>>(
    GET_RANKED_ACCOUNTS,
    !accountResult.loading &&
      accountResult.data?.account &&
      accountResult.data.account.roles.validator
      ? {
          variables: {
            blockHeight: accountResult.data.account.blockHeight,
            stashAddress: accountResult.data.account.id
          }
        }
      : { skip: true }
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
