import { useQuery } from '@apollo/client';
import { Box, Container, Skeleton, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { SummaryLoader } from '../../components/Summary';
import { GetValidatorStats, GET_VALIDATOR_STATS } from '../../schemas/staking.schema';
import Error from '../../components/Error';
import NotFound from '../NotFound';
import Summary from './Summary';
import { ResponsiveHash } from '../../components/Hash/Hash';
import ProducerTabs from './ProducerTabs';
import { GET_BLOCKS_BY_BP, ProducedBlocks } from '../../schemas/blocks.schema';

const BlockProducer = () => {
  const { producerId } = useParams<{ producerId: string }>();
  const validatorQuery = useQuery<GetValidatorStats>(GET_VALIDATOR_STATS, {
    variables: { accountId: producerId }
  });
  const variables = useMemo(() => {
    return {
      orderBy: [{ block_number: 'desc' }],
      where: {
        block_author: { _eq: producerId },
        finalized: { _eq: true }
      }
    };
  }, [producerId]);
  const producedBlocksQuery = useQuery<ProducedBlocks>(GET_BLOCKS_BY_BP, { variables });

  const validatorStats = validatorQuery.data?.stats;
  const validatorStatsCount = validatorQuery.data?.aggregates.aggregate.count;
  const validatorInfo = validatorQuery.data?.stats && validatorQuery.data?.stats[0];

  if (validatorQuery.loading || producedBlocksQuery.loading) {
    return (
      <Container sx={{ my: 5 }}>
        <Skeleton />
        <Skeleton sx={{ mb: 5, maxWidth: '500px' }} />
        <SummaryLoader number={10} />
      </Container>
    );
  }

  if (validatorQuery.error || producedBlocksQuery.error) {
    return (
      <Container sx={{ my: 5 }}>
        <Typography variant='h1' maxWidth={'400px'} sx={{ mb: 5 }}>
          <Error type='data-unavailable' />;
        </Typography>
      </Container>
    );
  }

  if (!validatorQuery?.data) {
    return <NotFound message='Producer Not Found' />;
  }

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' sx={{ mb: 1 }}>
        Block Producer
      </Typography>
      <Typography variant='h2' color='grey.700' sx={{ mb: 5 }}>
        <ResponsiveHash truncated='lgDown' value={producerId} />
      </Typography>
      <Summary info={validatorInfo} />
      <Box sx={{ mt: 2 }}>
        <ProducerTabs
          producedBlocks={producedBlocksQuery.data}
          validatorStats={validatorStats}
          validatorStatsCount={validatorStatsCount}
          error={!!validatorQuery.error || !!producedBlocksQuery.error}
        />
      </Box>
    </Container>
  );
};

export default BlockProducer;
