import { useQuery } from '@apollo/client';
import { Stack, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import CopyButton from '../../components/buttons/CopyButton';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import { LIST_BLOCK } from '../../schemas/blocks.schema';

const ROWS_PER_PAGE = 25;

type Block = {
  hash: string;
  number: number;
  numberFinalized: number;
  currentEra: number;
  timestamp: number;
  totalExtrinsics: number;
  author: string;
  authorName: string;
};
type Response = { blocks: Block[]; agg: { aggregate: { count: number } } };

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500
  }
});

const HashColumnWithTooltip: FC<{ blockHash: string }> = ({ blockHash, children }) => {
  return (
    <CustomWidthTooltip
      title={
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography variant='body5'>{blockHash}</Typography>
          <CopyButton value={blockHash} />
        </Stack>
      }
      placement='left'
      arrow
    >
      <span>{children}</span>
    </CustomWidthTooltip>
  );
};

const RenderProducer: FC<{
  number: number;
  blockProducer: { id: string; name?: string };
}> = ({ blockProducer: { id, name }, number }) => {
  const idString = id.toString();
  const content = name
    ? name
    : idString.length > 16
      ? idString.slice(0, 7) + '....' + idString.slice(-5)
      : idString;
  return <Link to={`/blocks/${number}/producer/${id || name}`}>{content}</Link>;
};

const rowParser = (block: Block): BaselineCell[] => {
  return BaseLineCellsWrapper([
    <Link to={`/blocks/${block.number}`}>{block.number}</Link>,
    <BlockStatusIcon status={block.number > block.numberFinalized ? 'pending' : 'successful'} />,
    block.currentEra,
    <TimeAgoComponent date={'2022-02-16 01:56:42 (+UTC)'} />,
    <Link to='#'>{block.totalExtrinsics}</Link>,
    <RenderProducer
      number={block.number}
      blockProducer={{ id: block.author, name: block.authorName }}
    />,
    <HashColumnWithTooltip blockHash={block.hash}>
      <Hash value={block.hash} link={`/blocks/${block.number}`} truncated />
    </HashColumnWithTooltip>
  ]);
};

const headers = BaseLineCellsWrapper([
  'block',
  'status',
  'era',
  'time',
  'extrinsics',
  'block producer',
  'block hash'
]);

const BlocksTable: FC = () => {
  const [blockNumber, setBlockNumber] = useState<number>();
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback((event) => {
    setBlockNumber(undefined);
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  }, []);
  const { data, loading } = useQuery<Response>(LIST_BLOCK, {
    variables: {
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where: {
        block_number: {
          _lte: blockNumber
        }
      }
    }
  });
  const rows = useMemo(() => (data?.blocks || []).map(rowParser), [data]);
  const onPageChange = useCallback(
    (_: unknown, number: number) => {
      if (!blockNumber) {
        setBlockNumber(data?.blocks.at(0)?.number);
      }
      setPage(number);
    },
    [blockNumber, data?.blocks]
  );

  if (loading) return <TableSkeleton rows={6} cells={6} footer />;
  return (
    <BaselineTable
      headers={headers}
      rows={rows}
      footer={
        <TablePagination
          count={data?.agg.aggregate.count || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          rowsPerPageOptions={[ROWS_PER_PAGE, 20, 30, 40]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      }
    />
  );
};

export default BlocksTable;
