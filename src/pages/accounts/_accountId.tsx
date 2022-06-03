import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import useFetchRankingAccountInfo from '../../hooks/useFetchRankingAccountInfo';
import { Roles } from '../../schemas/accounts.schema';
import NotFound from '../NotFound';
import BalanceCard from './account/Balance';
import BlockchainCard from './account/blockchain';
import IdentityCard from './account/identity';
import Info from './account/Info';
import PerformanceCard from './account/performance';

// const useTestRole = (): Roles[] => {
//   const { search } = useLocation();
//   const query = useMemo(() => new URLSearchParams(search), [search]);
//   const rolesquery = query.get('roles');
//   return (rolesquery ? rolesquery.split(',') : ['nominators']) as Roles[];
// };

const AccountId: FC = ({}) => {
  const { accountId } = useParams<{ accountId: string }>();
  const { data, loading } = useFetchRankingAccountInfo(accountId);
  // const roles = useTestRole();
  if (loading)
    return (
      <Container sx={{ my: 5 }}>
        <Typography maxWidth={'100px'}>
          <Skeleton />
        </Typography>
        <Typography variant='h1' maxWidth={'500px'}>
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
  const roles = Object.entries(data.account.roles)
    .filter((entry) => entry[1])
    .map(([role]) => role as Roles);
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' maxWidth='700px'>
        {data.account.identityDisplay || accountId}
      </Typography>
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <IdentityCard account={data.account} roles={roles} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BalanceCard account={data.account} roles={roles} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Info createdDate={data.account.timestamp} nonce={data.account.nonce} roles={roles} />
        </Grid>
        <Grid item xs={12}>
          <BlockchainCard account={data.account} roles={roles} />
        </Grid>
        {/* <Grid item xs={12}>
          <GovernanceCard roles={sampleAccount.roles} />
        </Grid> 
        <Grid item xs={12}>
          <StakingCard account={data.account} roles={roles} />
        </Grid> */}
        <Grid item xs={12}>
          {data.ranking && <PerformanceCard account={data.account} ranking={data.ranking} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountId;
