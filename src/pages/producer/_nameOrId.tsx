import { useQuery } from '@apollo/client';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SummaryLoader from '../../components/Paper/SummaryLoader';
import { GetAccountRanking, GET_ACCOUNT_RANKING } from '../../schemas/ranking.schema';
import NotFound from '../NotFound';
import ProducerTabs from './ProducerTabs';
import Summary from './Summary';

const BlockProducer = () => {
  const { accountId: id, number: blockNumber } = useParams<{ accountId: string; number: string }>();
  const { data, loading } = useQuery<GetAccountRanking>(GET_ACCOUNT_RANKING, {
    variables: {
      blockHeight: blockNumber,
      stashAddress: id
    }
  });
  if (loading) {
    return (
      <Container sx={{ my: 5 }}>
        <Skeleton />
        <Skeleton sx={{ mb: 5, maxWidth: '500px' }} />
        <SummaryLoader number={10} />
      </Container>
    );
  }
  if (!data?.ranking || !data.ranking?.stashAddress) return <NotFound />;
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' maxWidth={'400px'} sx={{ mb: 5 }}>
        {id}
      </Typography>
      <Summary ranking={data.ranking} />
      <Box sx={{ mt: 2 }}>
        <ProducerTabs
          addressStash={data.ranking.stashAddress}
          blockHeight={data.ranking.blockHeight}
          eras={data.ranking.activeEras}
          nominators={data.ranking.nominators}
        />
      </Box>
    </Container>
  );
};

export default BlockProducer;
