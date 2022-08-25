import { Container, Grid, Skeleton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import RoundedButton from '../../components/buttons/Rounded';
import useFetchValidatorAccountInfo from '../../hooks/useFetchValidatorAccountInfo';
import NotFound from '../NotFound';
import Balances from './account/Balances';
import BlockchainCard from './account/blockchain';
import IdentityCard from './account/identity';
import AccountDetails from './account/AccountDetails';

import { useToggle } from '../../hooks';
import BalanceHistoryChart from './account/BalanceHistoryChart';
import { GET_LATEST_ERA, LatestEraQuery } from '../../schemas/staking.schema';
import StakingCard from './account/staking';

const AccountId: FC = () => {
  const { accountId } = useParams<{ accountId?: string }>();
  const latestEraQuery = useQuery<LatestEraQuery>(GET_LATEST_ERA);
  const { data, loading } = useFetchValidatorAccountInfo(accountId);
  const [historyExpanded, { toggle: toggleHistory }] = useToggle(false);
  const [validatorInfoExpanded, { toggle: toggleValidatorInfo }] = useToggle(false);
  const currEra = latestEraQuery?.data?.validatorStats[0].era;

  if (loading || latestEraQuery.loading) {
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

  const account = data?.account;
  const validator =
    data?.aggregates && data?.stats
      ? { aggregates: data?.aggregates, stats: data?.stats }
      : undefined;

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      {account.identity?.display && (
        <Typography variant='h1'>{account.identity?.display}</Typography>
      )}
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <IdentityCard account={data.account} />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled sx={{ position: 'relative', pb: { xs: 8, sm: 8 } }}>
            <Balances account={data.account} />
            <RoundedButton
              style={{ position: 'absolute', right: '2rem', bottom: '1.5rem' }}
              variant='contained'
              onClick={toggleHistory}
            >
              {historyExpanded ? 'Hide history' : 'Show history'}
            </RoundedButton>
          </PaperWrapStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled sx={{ position: 'relative', pb: { xs: 8, sm: 8 } }}>
            <AccountDetails account={data.account} />
            {account.roles.validator && (
              <RoundedButton
                style={{ position: 'absolute', right: '2rem', bottom: '1.5rem' }}
                variant='contained'
                onClick={toggleValidatorInfo}
              >
                {validatorInfoExpanded ? 'Hide validator info' : 'Show validator info'}
              </RoundedButton>
            )}
          </PaperWrapStyled>
        </Grid>

        {validatorInfoExpanded && account.roles.validator && validator !== undefined && (
          <Grid item xs={12}>
            <StakingCard accountId={account.id} validator={validator} />
          </Grid>
        )}
        {historyExpanded && currEra && (
          <Grid item xs={12}>
            <PaperWrapStyled>
              <BalanceHistoryChart accountId={account.id} era={currEra} />
            </PaperWrapStyled>
          </Grid>
        )}
        <Grid item xs={12}>
          <BlockchainCard account={data.account} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountId;
