import { Box, Container, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SummaryLoader from '../../components/Paper/SummaryLoader';
import useFetchRankingAccountInfo from '../../hooks/useFetchRankingAccountInfo';
import NotFound from '../NotFound';
import ProducerTabs from './ProducerTabs';
import Summary from './Summary';

const BlockProducer = () => {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const { data, loading } = useFetchRankingAccountInfo(nameOrId);
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
  if (!data?.account || !data.account.id) return <NotFound />;
  if (!data?.ranking || !data.ranking?.stashAddress) return <NotFound />;
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' maxWidth={'400px'} sx={{ mb: 5 }}>
        {nameOrId}
      </Typography>
      <Summary account={data.account} ranking={data.ranking} />
      <Box sx={{ mt: 2 }}>
        <ProducerTabs eras={[]} nominators={[]} />
      </Box>
    </Container>
  );
};

export default BlockProducer;
