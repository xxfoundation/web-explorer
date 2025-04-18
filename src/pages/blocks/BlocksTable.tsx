import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash from '../../components/Hash';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable, HeaderCell, HeaderCellsWrapper } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import {
  GET_BLOCK_PRODUCERS,
  GetBlockProducers,
  ListOfBlocksOrdered,
  LIST_BLOCKS_ORDERED,
  SubscribeBlocksSinceBlock,
  SUBSCRIBE_BLOCKS_SINCE_BLOCK,
} from '../../schemas/blocks.schema';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import BooleanFilter from '../../components/Tables/filters/BooleanFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';
import RefreshButton from '../../components/buttons/Refresh';
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
          roles={block.authorName[0]}
          name={block.authorName[0]?.identity?.display}
          url={`/blocks/${block.number}/producer/${block.author}`}
        />
      )}
    </>,
    <Hash truncated value={block.hash} url={`/blocks/${block.number}`} />
  ]);
};

const BlocksTable: FC = () => {
  /* ----------------------- Initialize State Variables ----------------------- */
  const [range, setRange] = useSessionState<Range>('blocks.range', {
    from: null,
    to: null
  });
  const [statusFilter, setStatusFilter] = useSessionState<boolean | null>('blocks.status', null);
  const [selectedBlockProducers, setBlockProducers] = useSessionState<string[] | undefined>('blocks.producers', undefined);
  const [blockProducerSearch, setBlockProducerSearch] = useState<string>('');
  
  const possibleBlockProducersQuery = useQuery<GetBlockProducers>(GET_BLOCK_PRODUCERS, { 
    skip: blockProducerSearch.length < 2,
    variables: {
      search: `%${blockProducerSearch}%`
    }
  });
  const possibleBlockProducers = useMemo(
    () => possibleBlockProducersQuery.data?.producers.map((v) => v.address) ?? [],
    [possibleBlockProducersQuery.data?.producers]
  );

  /* --------------------- Initialize Dependent Variables --------------------- */
  const where = useMemo(() => {
    return {
      ...(statusFilter !== null && {
        finalized: { _eq: statusFilter }
      }),
      ...(selectedBlockProducers && selectedBlockProducers.length !== 0 && {
          account: {
            account_id: {
              _in: selectedBlockProducers,
            }
          }
      }),
      timestamp: {
        ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
        ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
      }
    };
  }, [range.from, range.to, selectedBlockProducers, statusFilter]);


  /* --------------------------------- Headers -------------------------------- */
  const headers = useMemo<HeaderCell[]>(
    () =>
      HeaderCellsWrapper([
        'block',
        ['Status', <BooleanFilter
          label='Status'
          onChange={setStatusFilter}
          toggleLabel={(v) => (v ? 'Success' : 'Pending')}
          value={statusFilter}
        />],
        'era',
        ['Time', <DateRangeFilter onChange={setRange} value={range} />],
        'extrinsics',
        ['block producer', (
          <ValuesFilter
            availableValues={possibleBlockProducers}
            buttonLabel='block producer'
            search={blockProducerSearch}
            transformValue={(v) => <Hash value={v} truncated />}
            onSearchChange={setBlockProducerSearch}
            value={selectedBlockProducers}
            valuesLoading={possibleBlockProducersQuery.loading}
            onChange={setBlockProducers}
          />
        )],
        'block hash'
      ]),
    [
      blockProducerSearch,
      selectedBlockProducers,
      possibleBlockProducers,
      possibleBlockProducersQuery.loading,
      range,
      setBlockProducers,
      setRange,
      setStatusFilter,
      statusFilter
    ]
  );

  /* ------------------------- Main Query - Get Blocks ------------------------ */
  const { data, error, loading, pagination, refetch } = usePaginatedQuery<ListOfBlocksOrdered>(
    LIST_BLOCKS_ORDERED,
    {
      variables: {
        where: where
      }
    }
  );
  const rows = useMemo(() => (data?.blocks || []).map(rowParser), [data]);

  /* ---------------------------- Setup Pagination ---------------------------- */
  const { reset } = pagination;
  useEffect(() => {
    reset();
  }, [reset, range, statusFilter]);

  /* ----------------------------- Refresh Button ----------------------------- */
  const [latestBlock, setLatestBlock] = useState<number>();
  useEffect(() => {
    setLatestBlock(data?.blocks[0]?.number);
  }, [data?.blocks]);

  const blocksSinceLastFetch = useSubscription<SubscribeBlocksSinceBlock>(
    SUBSCRIBE_BLOCKS_SINCE_BLOCK,
    {
      skip: latestBlock === undefined,
      variables: {
        where: { ...where, ...{ block_number: { _gt: latestBlock } } }
      }
    }
  );
  const blocksSinceFetch = blocksSinceLastFetch?.data?.blocks?.aggregate?.count;

  /* ----------------------------- Build Component ---------------------------- */
  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        {data?.blocks && <RefreshButton countSince={blocksSinceFetch} refetch={refetch} />}
      </Box>
      <BaselineTable
        id='baseline-table'
        error={!!error}
        loading={loading}
        headers={headers}
        rows={rows}
        rowsPerPage={pagination.rowsPerPage}
        footer={pagination.controls}
      />
    </>
  );
};

export default BlocksTable;
