import { useQuery } from '@apollo/client';
import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import { GetAccountByAddress, GET_ACCOUNT_BY_PK } from '../../schemas/accounts.schema';
import { GetRankingByAccountId, GET_RANKING_BY_ACCOUNT_ID } from '../../schemas/ranking.schema';
import NotFound from '../NotFound';
import BalanceCard from './account/Balance';
import BlockchainCard from './account/blockchain';
import IdentityCard from './account/identity';
import Info from './account/Info';
import StakingCard from './account/staking';

// const useTestRole = (): Roles[] => {
//   const { search } = useLocation();
//   const query = useMemo(() => new URLSearchParams(search), [search]);
//   const rolesquery = query.get('roles');
//   return (rolesquery ? rolesquery.split(',') : ['nominators']) as Roles[];
// };

const useGetAccount = (
  accountId: string
): {
  data?: { account: GetAccountByAddress['account']; ranking?: GetRankingByAccountId['ranking'] };
  loading: boolean;
} => {
  const accountResult = useQuery<GetAccountByAddress>(GET_ACCOUNT_BY_PK, {
    variables: { accountId }
  });

  const rankingResult = useQuery<GetRankingByAccountId>(GET_RANKING_BY_ACCOUNT_ID, {
    skip:
      accountResult.loading ||
      !accountResult.data?.account ||
      !accountResult.data.account.roles?.includes('validator'),
    variables: accountResult.data?.account && {
      blockHeight: accountResult.data.account.blockHeight,
      stashAddress: accountResult.data.account.id
    }
  });

  const loading = accountResult.loading || rankingResult.loading;
  if (loading) {
    return { loading: true };
  }

  if (accountResult.data?.account && accountResult.data.account.roles?.includes('validator')) {
    return {
      data: {
        account: accountResult.data?.account,
        ranking: rankingResult.data?.ranking
      },
      loading: false
    };
  }

  return accountResult;
};

const AccountId: FC = ({}) => {
  const { accountId } = useParams<{ accountId: string }>();
  const { data, loading } = useGetAccount(accountId);
  // const role = useTestRole();
  if (loading)
    return (
      <Container sx={{ my: 5 }}>
        <Typography>
          <Skeleton />
        </Typography>
        <Typography variant='h1'>
          <Skeleton />
        </Typography>
        <Grid container spacing={3} marginTop='5px'>
          <Grid item xs={12}>
            <PaperWrapStyled sx={{ maxWidth: '1142px', height: 'fit-content' }}>
              <Skeleton />
            </PaperWrapStyled>
          </Grid>
        </Grid>
      </Container>
    );
  if (!data?.account) return <NotFound />;
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1'>{data.account.identityDisplay || accountId}</Typography>
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <IdentityCard account={data.account} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BalanceCard account={data.account} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Info
            createdDate={1652101618}
            nonce={data.account.nonce}
            roles={data.account.roles || ['???', '????']}
          />
        </Grid>
        <Grid item xs={12}>
          <BlockchainCard account={data.account} />
        </Grid>
        {/* <Grid item xs={12}>
          <GovernanceCard roles={sampleAccount.roles} />
        </Grid>  */}
        <Grid item xs={12}>
          <StakingCard account={data.account} />
        </Grid>
        {/* <Grid item xs={12}>
          <PerformanceCard account={sampleAccount} />
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default AccountId;
