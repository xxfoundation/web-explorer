import { useQuery } from '@apollo/client';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { BlockNav } from '../../components/block/Block.styled';
import BlockDetailedEventsTabs from '../../components/block/BlockDetailedEventsTabs';
import BlockSummary from '../../components/block/BlockSummary';
import { BlockSummaryType } from '../../components/block/types';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BackAndForwardArrows from '../../components/buttons/BackAndForwardArrows';
import Link from '../../components/Link';
import { GET_BLOCK_BY_PK } from '../../schemas/blocks.schema';
import NotFound from '../NotFound';

const BlockSummaryHeader: React.FC<{
  blockNumber: number;
  nextNumber?: number;
  prevNumber?: number;
}> = ({ blockNumber, nextNumber, prevNumber }) => {
  const history = useHistory();
  return (
    <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
      <Typography variant='h1'>Block No. {blockNumber}</Typography>
      <BlockNav direction={'row'} alignItems={'center'} spacing={2}>
        <Link to='/blocks'>
          <Typography variant='h4'>blocks</Typography>
        </Link>
        <Divider orientation='vertical' variant='middle' flexItem />
        <BackAndForwardArrows
          back={{
            disabled: !prevNumber,
            onClick: () => {
              history.push(`/blocks/${prevNumber}`);
            }
          }}
          forward={{
            disabled: !nextNumber,
            onClick: () => {
              history.push(`/blocks/${nextNumber}`);
            }
          }}
        />
      </BlockNav>
    </Stack>
  );
};

const Block = () => {
  const { number } = useParams<{ number: string }>();
  const variables = useMemo(() => {
    const blockNumber = Number(number);
    return {
      prevBlockNumber: blockNumber - 1,
      blockNumber,
      nextBlockNumber: blockNumber + 1
    };
  }, [number]);
  const { data, loading } = useQuery<BlockSummaryType>(GET_BLOCK_BY_PK, { variables });

  if (!loading && !data?.block?.number) {
    return <NotFound />;
  }
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <BlockSummaryHeader
        blockNumber={variables.blockNumber}
        nextNumber={data?.next?.number}
        prevNumber={data?.prev?.number}
      />
      <BlockSummary data={data?.block} loading={loading} />
      <Box sx={{ mt: 2 }}>
        <BlockDetailedEventsTabs
          blockNumber={variables.blockNumber}
          loading={loading}
          events={data?.block.totalEvents}
          extrinsics={data?.block.numTransfers}
        />
      </Box>
    </Container>
  );
};

export default Block;
