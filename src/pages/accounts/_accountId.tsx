import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import useFetchRankingAccountInfo from '../../hooks/useFetchRankingAccountInfo';
import NotFound from '../NotFound';
import BalanceCard from './account/Balance';
import BlockchainCard from './account/blockchain';
import IdentityCard from './account/identity';
import Info from './account/Info';
import PerformanceCard from './account/performance';

const AccountId: FC = ({}) => {
  const { accountId } = useParams<{ accountId: string }>();
  const { data, loading } = useFetchRankingAccountInfo(accountId);
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
  console.warn(data.account.identity);
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' maxWidth='700px'>
        {data.account.identity.display || accountId}
      </Typography>
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <IdentityCard account={data.account} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BalanceCard account={data.account} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Info account={data.account} />
        </Grid>
        <Grid item xs={12}>
          <BlockchainCard account={data.account} />
        </Grid>
        {/* <Grid item xs={12}>
          <GovernanceCard roles={sampleAccount.roles} />
        </Grid> 
        <Grid item xs={12}>
          <StakingCard account={data.account} roles={roles} />
        </Grid> */}
        {/* <Grid item xs={12}>
          {data.ranking && <PerformanceCard account={data.account} ranking={data.ranking} />}
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default AccountId;
