import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ProducerTabs from './ProducerTabs';
import Summary from './Summary';

const BlockProducer = () => {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' maxWidth={'400px'} sx={{ mb: 5 }}>
        {nameOrId}
      </Typography>
      <Summary />
      <Box sx={{ mt: 2 }}>
        <ProducerTabs eras={[]} nominators={[]} />
      </Box>
    </Container>
  );
};

export default BlockProducer;
