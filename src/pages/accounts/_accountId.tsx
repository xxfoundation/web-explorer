import { Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AccountBalance from './AccountBalance';
import AccountBlockchain from './AccountBlockchain';
import AccountGovernance from './AccountGovernance';
import AccountIdentity from './AccountIdentity';
import AccountExtraInfo from './AccountsExtraInfo';

const sampleData = {
  name: 'Display name',
  id: '0x6d6f646c43726f77646c6f610000000000000000',
  address: '0x87184fe3de0d79cc086165374c3b2de11c811e3e1b299218384032b67d33a643',
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
  }
};

const AccountId: FC = () => {
  // const { accountId } = useParams<{ accountId: string }>();
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1'>{sampleData.name}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <AccountIdentity
            id={sampleData.id}
            publicKey={sampleData.publicKey}
            address={sampleData.address}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountBalance
            balance={sampleData.balance}
            reserved={sampleData.reserved}
            locked={sampleData.locked}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AccountExtraInfo createdDate={1652101618} nonce={23} roles={['council', 'validator']} />
        </Grid>
        <Grid item xs={12}>
          <AccountBlockchain role='nominator' />
        </Grid>
        <Grid item xs={12}>
          <AccountGovernance />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountId;
