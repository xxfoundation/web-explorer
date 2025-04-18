import { OperationVariables, QueryResult, useQuery } from '@apollo/client';
import React, { useCallback } from 'react';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useNavigate, useParams } from 'react-router-dom';
import { isHex } from '@polkadot/util';

import { BlockNav } from '../../components/block/Block.styled';
import BlockDetailedTabs from '../../components/block/BlockDetailedTabs';
import BlockSummary from '../../components/block/BlockSummary';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BackAndForwardArrows from '../../components/buttons/BackAndForwardArrows';
import Link from '../../components/Link';
import {
  GetBlockByHash,
  GetBlockByPK,
  GET_BLOCK_BY_HASH,
  GET_BLOCK_BY_BLOCK_NUMBER
} from '../../schemas/blocks.schema';
import NotFound from '../NotFound';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

const useArrowButtonsOptions = (number: number) => {
  const navigate = useNavigate();

  const variables = useCallback((blockNumber: number) => {
    return { variables: { blockNumber } };
  }, []);

  const buttonProps = useCallback(
    ({ data, loading }: QueryResult<GetBlockByPK, OperationVariables>) => ({
      disabled: loading || !data?.block || (data?.block && data?.block?.number < 0),
      onClick: () => {
        navigate(`/blocks/${data?.block?.number}`);
      }
    }),
    [navigate]
  );

  const nextBlockQuery = useQuery<GetBlockByPK>(GET_BLOCK_BY_BLOCK_NUMBER, variables(number + 1));
  useQuery<GetBlockByPK>(GET_BLOCK_BY_BLOCK_NUMBER, variables(number + 2));

  const previousBlockQuery = useQuery<GetBlockByPK>(
    GET_BLOCK_BY_BLOCK_NUMBER,
    variables(number - 1)
  );
  useQuery<GetBlockByPK>(
    GET_BLOCK_BY_BLOCK_NUMBER,
    variables(number - 2)
  );

  return { next: buttonProps(nextBlockQuery), previous: buttonProps(previousBlockQuery) };
};

const BlockSummaryHeader: React.FC<{
  blockNumber: number;
}> = ({ blockNumber }) => {
  const arrowsOptions = useArrowButtonsOptions(blockNumber);
  return (
    <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
      <Typography variant='h1' style={{ whiteSpace: 'break-spaces' }}>
        Block No. {blockNumber}
      </Typography>
      <BlockNav direction={'row'} alignItems={'center'} spacing={2}>
        <Hidden mdDown>
          <Link to='/blocks'>
            <Typography variant='h4'>blocks</Typography>
          </Link>
          <Divider orientation='vertical' variant='middle' flexItem />
        </Hidden>
        <BackAndForwardArrows back={arrowsOptions.previous} forward={arrowsOptions.next} />
      </BlockNav>
    </Stack>
  );
};

const Block = () => {
  const { numberOrHash } = useParams<{ numberOrHash: string }>();
  const isHash = isHex(numberOrHash);
  const blockNumber = !isHash && Number(numberOrHash);
  const blockHash = isHash && numberOrHash;

  const numberQuery = useQuery<GetBlockByPK>(GET_BLOCK_BY_BLOCK_NUMBER, {
    skip: isHash,
    variables: { blockNumber }
  });
  const hashQuery = useQuery<GetBlockByHash>(GET_BLOCK_BY_HASH, {
    skip: !isHash,
    variables: { hash: blockHash }
  });
  const loading = numberQuery.loading || hashQuery.loading;
  const error = numberQuery.error || hashQuery.error;

  const block = hashQuery.data?.block[0] || numberQuery.data?.block;

  if (!loading && !error && !block) {
    return <NotFound />;
  }

  if (error && !loading && !block) {
    console.error(error);
    return <Container sx={{ my: 5 }}><Error /></Container>;
  }

  return (
    <Container sx={{ my: 5 }}>
      {(loading || !block ) ? <Loading size='lg' sx={{ my: 5 }} />
      : <>
        <Breadcrumb />
        <BlockSummaryHeader blockNumber={block.number} />
        <BlockSummary block={block} />
        <Box sx={{ mt: 2 }}>
          <BlockDetailedTabs blockNumber={block.number} loading={loading} />
        </Box>
      </>
      }
    </Container>
  );
};

export default Block;
