import { Container, Grid, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BalanceCard from './account/Balance';
import BlockchainCard from './account/blockchain';
import GovernanceCard from './account/governance';
import IdentityCard from './account/Identity';
import Info from './account/Info';
import PerformanceCard from './account/performance';
import StakingCard from './account/staking';
import { AccountType } from './types';

const sampleAccount: AccountType = {
  address: '6a7YefNJArBVBBVzdMdJ5V4giafmBdfhwi7DiAcxseKA2zbt',
  roles: ['nominator'],
  stash: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
  controller: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
  id: '0x6d6f646c43726f77646c6f610000000000000000',
  publicKey: '0x165161616161',

  rank: 1,
  transactions: 123,
  lockedCoin: '000000',
  balance: {
    transferable: '123231200000'
  },
  reserved: {
    bonded: '234565',
    unbonding: '2144',
    democracy: '234',
    election: '234',
    vesting: '2342'
  },
  locked: {
    bonded: '6772',
    unbonding: '3',
    democracy: '5',
    election: '76',
    vesting: '32'
  },

  era: 800,
  firstValidatorEra: 800,

  latestSlashes: 0,
  holderSlashes: 1,

  nominators: 100,

  eraPoints: 0,

  averageCommission: 99.9,

  democracy: {
    councilMember: false,
    proposalVoteForCouncil: 1,
    proposalVotePerMonth: 0,
    missedProposals: 13213,
    latestNumberOfVotes: 0
  },

  legalName: 'aaaaa',
  displayName: 'Display name',
  blurb:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices aliquet est ac consequat. Quisque tincidunt tellus at dapibus lacinia. Etiam gravida pulvinar vestibulum.',
  riotName: '@jacogr:matrix.parity.io',
  website: 'http://github/jacobgr',
  email: 'test@elixxir.io',
  twitter: 'xx_network',
  judgement: 'Known Good'
};

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const AccountId: FC = () => {
  // TODO remove code in development tests
  const query = useQuery();
  const rolesquery = query.get('roles');
  if (rolesquery) {
    sampleAccount.roles = rolesquery.split(',') as AccountType['roles'];
  }

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1'>{sampleAccount.displayName}</Typography>
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <IdentityCard account={sampleAccount} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BalanceCard
            balance={sampleAccount.balance}
            reserved={sampleAccount.reserved}
            locked={sampleAccount.locked}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Info createdDate={1652101618} nonce={23} roles={sampleAccount.roles} />
        </Grid>
        <Grid item xs={12}>
          <BlockchainCard roles={sampleAccount.roles} />
        </Grid>
        <Grid item xs={12}>
          <GovernanceCard roles={sampleAccount.roles} />
        </Grid>
        <Grid item xs={12}>
          <StakingCard roles={sampleAccount.roles} />
        </Grid>
        <Grid item xs={12}>
          <PerformanceCard account={sampleAccount} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountId;
