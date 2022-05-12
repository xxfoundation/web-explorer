import { Container, Grid, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BalanceCard from './account/Balance';
import BlockchainCard from './account/blockchain';
import CouncilCard from './account/council';
import GovernanceCard from './account/governance';
import IdentityCard from './account/Identity';
import Info from './account/Info';
import PerformanceCard from './account/performance';
import StakingCard from './account/staking';
import { AccountType } from './types';

const sampleData: AccountType = {
  roles: ['nominator'],
  name: 'Display name',
  id: '0x6d6f646c43726f77646c6f610000000000000000',
  publicKey: '0x165161616161',
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
  personalIntroduction:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices aliquet est ac consequat. Quisque tincidunt tellus at dapibus lacinia. Etiam gravida pulvinar vestibulum.',
  address: '6a7YefNJArBVBBVzdMdJ5V4giafmBdfhwi7DiAcxseKA2zbt',
  stash: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
  controller: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
  riotID: '@jacogr:matrix.parity.io',
  website: 'http://github/jacobgr',
  email: 'test@elixxir.io',
  twitter: 'xx_network'
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
    sampleData.roles = rolesquery.split(',') as AccountType['roles'];
  }

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      {/*We need this name here the same info on AccountIdentity */}
      <Typography variant='h1'>{sampleData.name}</Typography>
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <IdentityCard account={sampleData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BalanceCard
            balance={sampleData.balance}
            reserved={sampleData.reserved}
            locked={sampleData.locked}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Info createdDate={1652101618} nonce={23} roles={sampleData.roles} />
        </Grid>
        <Grid item xs={12}>
          <BlockchainCard roles={sampleData.roles} />
        </Grid>
        <Grid item xs={12}>
          <GovernanceCard roles={sampleData.roles} />
        </Grid>
        <Grid item xs={12}>
          <StakingCard roles={sampleData.roles} />
        </Grid>
        <Grid item xs={12}>
          <CouncilCard roles={sampleData.roles} />
        </Grid>
        <Grid item xs={12}>
          <PerformanceCard roles={sampleData.roles} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountId;
