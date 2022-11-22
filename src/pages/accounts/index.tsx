import { Container, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import NewAccountsChart from '../../components/charts/highcharts/NewAccountsLineChart';
import AccountsTable from './AccountsTable';
import Summary from './Summary';

const LandingPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant='h1' sx={{ mb: 5 }}>
        {t('Accounts')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Summary />
        </Grid>
        <Grid item xs={12}>
          <NewAccountsChart />
        </Grid>
        <Grid item xs={12} md={12}>
          <AccountsTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandingPage;
