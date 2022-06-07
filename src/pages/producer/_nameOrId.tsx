import { useQuery } from '@apollo/client';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SummaryLoader from '../../components/Paper/SummaryLoader';
import { GetAccountRanking, GET_ACCOUNT_RANKING } from '../../schemas/ranking.schema';
import Error from '../../components/Error';
import NotFound from '../NotFound';
import ProducerTabs from './ProducerTabs';
import Summary from './Summary';

const BlockProducer = () => {
  const { accountId: id, blockHeight } = useParams<{ accountId: string; blockHeight: string }>();
  const { data, error, loading } = useQuery<GetAccountRanking>(GET_ACCOUNT_RANKING, {
    variables: {
      stashAddress: id,
      blockHeight
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

  if (error) {
    return (
      <Container sx={{ my: 5 }}>
        <Typography variant='h1' maxWidth={'400px'} sx={{ mb: 5 }}>
          <Error type='data-unavailable' />
        </Typography>
      </Container>
    );
  }

  if (!data?.ranking || !data.ranking?.stashAddress) return <NotFound message='Producer Not Found'/>;
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
