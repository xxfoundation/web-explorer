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
  balance: {
    bonded: '1232312',
    unbonding: '15151',
    democracy: '12551',
    election: '155151',
    vesting: '151515'
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
          <AccountIdentity id={sampleData.id} />
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
