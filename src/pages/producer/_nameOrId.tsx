import { useQuery } from '@apollo/client';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SummaryLoader from '../../components/Paper/SummaryLoader';
import { GetAccountByAddressType, GET_ACCOUNT_BY_PK } from '../../schemas/accounts.schema';
import NotFound from '../NotFound';
import ProducerTabs from './ProducerTabs';
import Summary from './Summary';

const BlockProducer = () => {
  // TODO What I'm supposed to do here?
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const { data, loading } = useQuery<GetAccountByAddressType>(GET_ACCOUNT_BY_PK, {
    variables: { accountId: nameOrId }
  });
  if (loading) {
    return (
      <Container sx={{ my: 5 }}>
        <Skeleton />
        <Skeleton sx={{ mb: 5, maxWidth: '500px' }} />
        <SummaryLoader number={10} />
        {/* <Box sx={{ mt: 2 }}>
          <ProducerTabs eras={[]} nominators={[]} />
        </Box> */}
      </Container>
    );
  }
  if (!data?.account.id) return <NotFound />;
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' maxWidth={'400px'} sx={{ mb: 5 }}>
        {nameOrId}
      </Typography>
      <Summary account={data.account} />
      <Box sx={{ mt: 2 }}>
        <ProducerTabs eras={[]} nominators={[]} />
      </Box>
    </Container>
  );
};

export default BlockProducer;
