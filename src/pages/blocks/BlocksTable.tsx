import React, { FC, useEffect, useMemo } from 'react';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash from '../../components/Hash';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import { ListOfBlocksOrdered, LIST_BLOCKS_ORDERED } from '../../schemas/blocks.schema';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import BooleanFilter from '../../components/Tables/filters/BooleanFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';
import useSessionState from '../../hooks/useSessionState';

const rowParser = (block: ListOfBlocksOrdered['blocks'][0]): BaselineCell[] => {
  return BaseLineCellsWrapper([
    <Link to={`/blocks/${block.number}`}>{block.number}</Link>,
    <BlockStatusIcon status={block.finalized ? 'successful' : 'pending'} />,
    block.currentEra,
    <TimeAgoComponent date={block.timestamp} />,
    block.totalExtrinsics,
    <>
      {!block.author ? (
        'Genesis'
      ) : (
        <Address
          truncated
          value={block.author}
          name={block.authorName[0]?.identity?.display}
          url={`/blocks/${block.number}/producer/${block.author}`}
        />
      )}
    </>,
    <Hash truncated value={block.hash} url={`/blocks/${block.number}`} />
  ]);
};

const BlocksTable: FC = () => {
  const [range, setRange] = useSessionState<Range>('blocks.range', {
    from: null,
    to: null
  });

  const [statusFilter, setStatusFilter] = useSessionState<boolean | null>('blocks.status', null);

  const headers = useMemo(
    () =>
      BaseLineCellsWrapper([
        'block',
        <BooleanFilter
          label='Status'
          onChange={setStatusFilter}
          toggleLabel={(v) => (v ? 'Success' : 'Pending')}
          value={statusFilter}
        />,
        'era',
        <DateRangeFilter onChange={setRange} value={range} />,
        'extrinsics',
        'block producer',
        'block hash'
      ]),
    [range, setRange, setStatusFilter, statusFilter]
  );

  const variables = useMemo(
    () => ({
      where: {
        ...(statusFilter !== null && {
          finalized: { _eq: statusFilter }
        }),
        timestamp: {
          ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
          ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
        }
      }
    }),
    [range.from, range.to, statusFilter]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<ListOfBlocksOrdered>(
    LIST_BLOCKS_ORDERED,
    {
      variables
    }
  );

  const { reset } = pagination;

  useEffect(() => {
    reset();
  }, [reset, range, statusFilter]);

  const rows = useMemo(() => (data?.blocks || []).map(rowParser), [data]);

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rows={rows}
      rowsPerPage={pagination.rowsPerPage}
      footer={pagination.controls}
    />
  );
};

export default BlocksTable;
