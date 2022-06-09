import { OperationVariables, QueryResult, useQuery } from '@apollo/client';
import React, { useCallback } from 'react';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import Hidden from '@mui/material/Hidden';
import { useHistory, useParams } from 'react-router-dom';
import { BlockNav } from '../../components/block/Block.styled';
import BlockDetailedEventsTabs from '../../components/block/BlockDetailedEventsTabs';
import BlockSummary from '../../components/block/BlockSummary';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BackAndForwardArrows from '../../components/buttons/BackAndForwardArrows';
import Link from '../../components/Link';
import { GetBlockByPK, GET_BLOCK_BY_PK } from '../../schemas/blocks.schema';
import NotFound from '../NotFound';

const useArrowButtonsOptions = (number: number) => {
  const history = useHistory();

  const variables = useCallback((blockNumber: number) => {
    return { variables: { blockNumber } };
  }, []);

  const buttonProps = useCallback(
    ({ data, loading }: QueryResult<GetBlockByPK, OperationVariables>) => ({
      disabled: loading || !data?.block?.number,
      onClick: () => {
        history.push(`/blocks/${data?.block?.number}`);
      }
    }),
    [history]
  );

  const nextBlockQuery = useQuery<GetBlockByPK>(GET_BLOCK_BY_PK, variables(number + 1));
  
  const previousBlockQuery = useQuery<GetBlockByPK>(GET_BLOCK_BY_PK, variables(number - 1));
  
  return { next: buttonProps(nextBlockQuery), previous: buttonProps(previousBlockQuery) };
};

const BlockSummaryHeader: React.FC<{
  blockNumber: number;
}> = ({ blockNumber }) => {
  const arrowsOptions = useArrowButtonsOptions(blockNumber);
  return (
    <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
      <Typography variant='h1' style={{ whiteSpace: 'break-spaces' }}>Block No. {blockNumber}</Typography>
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
  const { number } = useParams<{ number: string }>();
  const blockNumber = Number(number);
  const { data, loading } = useQuery<GetBlockByPK>(GET_BLOCK_BY_PK, {
    variables: { blockNumber }
  });

  if (!loading && !data?.block && !data?.block?.number) {
    return <NotFound />;
  }

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <BlockSummaryHeader blockNumber={blockNumber} />
      <BlockSummary block={data?.block} />
      <Box sx={{ mt: 2 }}>
        <BlockDetailedEventsTabs
          blockNumber={blockNumber}
          loading={loading}
          events={data?.block.totalEvents}
          extrinsics={data?.block.totalExtrinsics}
        />
      </Box>
    </Container>
  );
};

export default Block;
