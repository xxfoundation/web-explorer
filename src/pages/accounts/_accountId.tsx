import { Container, Grid, Skeleton, Tab, Typography } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

import Balances from './account/Balances';
import BlockchainCard from './account/blockchain';
import IdentityCard from './account/identity';
import AccountDetails from './account/AccountDetails';
import NotFound from '../NotFound';
import PageTabs, { Panel } from '../../components/PillTabs';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import RoundedButton from '../../components/buttons/Rounded';
import useFetchValidatorAccountInfo from '../../hooks/useFetchValidatorAccountInfo';

import { useToggle } from '../../hooks';
import BalanceHistoryChart from './account/BalanceHistoryChart';
import { GET_LATEST_ERA, LatestEraQuery } from '../../schemas/staking.schema';
import StakingCard from './account/staking';
import Tag from '../../components/Tags/Tag';
import GovernanceCard from './account/governance';
import ValidatorCard from './account/validator';

const validatorStatus = (inValidatorStats: boolean, currentlyActive: boolean) => {
  return (
    <Typography variant='body3' sx={{ position: 'absolute', right: '2rem', bottom: '1.5rem', fontWeight: 'bolder'}}>Validator Status:
      <Tag sx={{ marginLeft: '8px' }}>
        <Typography fontSize={'12px'} fontWeight={400}>
          {currentlyActive ? 'Active' : inValidatorStats ? 'Inactive' : 'in Waiting'}
        </Typography>
      </Tag>
    </Typography>)
}

const AccountId: FC = () => {
  const { t } = useTranslation();
  const { accountId } = useParams<{ accountId?: string }>();
  const latestEraQuery = useQuery<LatestEraQuery>(GET_LATEST_ERA);
  const { data, loading } = useFetchValidatorAccountInfo(accountId);
  const [historyExpanded, { toggle: toggleHistory }] = useToggle(false);
  const currEra = latestEraQuery?.data?.validatorStats[0].era;
  const [tab, setTab] = useState(0);

  const handleTab = useCallback((_e: React.SyntheticEvent, n: number) => {
    setTab(n);
  }, []);

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

  const account = data.account;
  const validator =
    data?.aggregates && data?.stats
      ? { aggregates: data?.aggregates, stats: data?.stats }
      : undefined;
  const inValidatorStats = validator && validator?.stats.length > 0 || false;
  const currentlyActive = inValidatorStats && validator?.stats[0].era == currEra || false;

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
              {historyExpanded ? t('Hide history') : t('Show history')}
            </RoundedButton>
          </PaperWrapStyled>
        </Grid>
        <Grid item xs={12} md={6}>
          <PaperWrapStyled sx={{ position: 'relative', pb: { xs: 8, sm: 8 } }}>
            <AccountDetails account={data.account} />
            {account.validator && validator && validatorStatus(inValidatorStats, currentlyActive)}
          </PaperWrapStyled>
        </Grid>
        {historyExpanded && currEra && (
          <Grid item xs={12}>
            <PaperWrapStyled>
              <BalanceHistoryChart accountId={account.id} era={currEra} />
            </PaperWrapStyled>
          </Grid>
        )}

        <Grid item xs={12}>
          <PageTabs value={tab} onChange={handleTab}>
            <Tab label={t('Blockchain')} />
            <Tab label={t('Governance')} />
            <Tab label={t('Staking')} />
            {validator !== undefined && (<Tab label={t('Validator')} />)}
          </PageTabs>
        </Grid>
        <Grid item xs={12}>
          <PaperWrapStyled sx={{ position: 'relative', overflow: 'hidden' }}>
            <Panel index={tab} value={0}>
              <BlockchainCard account={data.account} />
            </Panel>
            <Panel index={tab} value={1}>
              <GovernanceCard
                account={data.account}
              />
            </Panel>
            <Panel index={tab} value={2}>
              <StakingCard
                accountId={account.id}/>
            </Panel>
            {validator !== undefined && (
            <Panel index={tab} value={3}>
              <ValidatorCard
                accountId={account.id}
                active={currentlyActive}/>
            </Panel>)}
          </PaperWrapStyled>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountId;
