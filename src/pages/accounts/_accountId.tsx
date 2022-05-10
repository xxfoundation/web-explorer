import { Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Balance from './account/Balance';
import Blockchain from './account/Blockchain';
import Governance from './account/Governance';
import Identity from './account/Identity';
import Summary from './account/Summary';
import { AccountType } from './types';

const sampleData: AccountType = {
  role: 'nominator',
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

const AccountId: FC = () => {
  // const { accountId } = useParams<{ accountId: string }>();
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      {/*We need this name here the same info on AccountIdentity */}
      <Typography variant='h1'>{sampleData.name}</Typography>
      <Grid container spacing={3} marginTop='5px'>
        <Grid item xs={12}>
          <Identity account={sampleData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Balance
            balance={sampleData.balance}
            reserved={sampleData.reserved}
            locked={sampleData.locked}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Summary createdDate={1652101618} nonce={23} roles={['council', 'validator']} />
        </Grid>
        <Grid item xs={12}>
          <Blockchain role='nominator' />
        </Grid>
        <Grid item xs={12}>
          <Governance />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountId;
