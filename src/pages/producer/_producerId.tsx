import { useQuery } from '@apollo/client';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SummaryLoader } from '../../components/Summary';
import { GetAccountRanking, GET_ACCOUNT_RANKING } from '../../schemas/ranking.schema';
import Error from '../../components/Error';
import NotFound from '../NotFound';
import ProducerTabs from './ProducerTabs';
import Summary from './Summary';
import { shortString } from '../../utils';

const BlockProducer = () => {
  const { producerId } = useParams<{ producerId: string }>();
  const { data, error, loading } = useQuery<GetAccountRanking>(GET_ACCOUNT_RANKING, {
    variables: {
      where: { stash_address: { _eq: producerId } }
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

  if (!data?.ranking || !data.ranking[0]?.stashAddress)
    return <NotFound message='Producer Not Found' />;

  const ranking = data.ranking[0];
  const identity = JSON.parse(ranking.identity);
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' sx={{ mb: 5 }}>
        Block Producer . {identity.display || shortString(ranking.stashAddress)}
      </Typography>
      <Summary ranking={ranking} name={identity.display} />
      <Box sx={{ mt: 2 }}>
        <ProducerTabs
          producerId={ranking.stashAddress}
          eras={ranking.activeEras}
          eraPointsHistory={ranking.eraPointsHistory}
          nominators={ranking.nominators}
          nominations={ranking.nominations}
        />
      </Box>
    </Container>
  );
};

export default BlockProducer;
