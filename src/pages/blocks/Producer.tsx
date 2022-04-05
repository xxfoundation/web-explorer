import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs';
import ProducerTabs from '../producer/ProducerTabs';
import Summary from '../producer/Summary';

const BlockProducer = () => {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Breadcrumb />
        </Grid>
        <Grid item xs={12}>
          <Typography variant={'h1'}>{nameOrId}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Summary />
        </Grid>
        <Grid item xs={12}>
          <ProducerTabs eras={[]} nominators={[]} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlockProducer;
