import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import RoundedButton from '../../components/buttons/Rounded';
import useFetchRankingAccountInfo from '../../hooks/useFetchRankingAccountInfo';
import NotFound from '../NotFound';
import BalanceCard from './account/Balance';
import BlockchainCard from './account/blockchain';
import IdentityCard from './account/identity';
import Info from './account/Info';
import Summary from '../producer/Summary';

import { shortString } from '../../utils';
import { useToggle } from '../../hooks';
import BalanceHistory from './account/blockchain/BalanceHistoryChart';
import { useQuery } from '@apollo/client';
import { GetTransferByAccountId, GET_TRANSFERS_BY_ACCOUNT_ID } from '../../schemas/transfers.schema';

const AccountId: FC = ({}) => {
  const { accountId } = useParams<{ accountId: string }>();
  const { data, loading } = useFetchRankingAccountInfo(accountId);
  const transfersQuery = useQuery<GetTransferByAccountId>(GET_TRANSFERS_BY_ACCOUNT_ID, { variables: { accountId } })
  const [expanded, { toggle }] = useToggle(false);
  
  if (loading || transfersQuery.loading) {
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
  }

  if (!data?.account) return <NotFound message='Account Not Found' />;

  const ranking = data?.ranking && data?.ranking[0];
  const identity = ranking?.identity && JSON.parse(ranking?.identity);

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' maxWidth='700px'>
        {data.account.identity.display || shortString(accountId, 10)}
      </Typography>
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <IdentityCard account={data.account} />
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{ position: 'relative' }}>
            <BalanceCard account={data.account}  />
            <RoundedButton style={{ position: 'absolute', right: '2rem', bottom: '1.5rem'}} variant='contained' onClick={toggle}>
              {expanded ? 'Hide history' : 'Show history'}
            </RoundedButton>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Info account={data.account} />
        </Grid>
        {expanded && (
          <Grid item xs={12}>
            <PaperWrapStyled>
              <BalanceHistory account={data.account} transfers={transfersQuery.data?.transfers} />
            </PaperWrapStyled>
          </Grid>
        )}
        {ranking && (
          <Grid item xs={12}>
            <Summary ranking={ranking} name={identity.display} />
          </Grid>
        )}
        <Grid item xs={12}>
          <BlockchainCard account={data.account} ranking={ranking} />
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
