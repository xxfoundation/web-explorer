import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import ProducerTabs from './ProducerTabs';
import Summary from './Summary';

const BlockProducer = () => {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  return (
    <Grid container spacing={2}>
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
  );
};

export default BlockProducer;
