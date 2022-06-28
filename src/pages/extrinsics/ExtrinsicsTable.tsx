import { useQuery } from '@apollo/client';
import React, { FC, useEffect, useMemo, useState } from 'react';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import { Hash } from '../../components/ChainId';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import TimeAgoComponent from '../../components/TimeAgo';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { GetAvailableExtrinsicActions, GET_AVAILABLE_EXTRINSIC_ACTIONS, ListExtrinsics, LIST_EXTRINSICS } from '../../schemas/extrinsics.schema';
import ResultFilter from './ResultFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';

const ROWS_PER_PAGE = 20;

const extrinsicToRow = (extrinsic: ListExtrinsics['extrinsics'][0]): BaselineCell[] => {
  const linkToExtrinsic = `/extrinsics/${extrinsic.blockNumber}-${extrinsic.index}`;
  return BaseLineCellsWrapper([
    <Link to={linkToExtrinsic}>{`${extrinsic.blockNumber}-${extrinsic.index}`}</Link>,
    <Link to={`/blocks/${extrinsic.blockNumber}`}>{extrinsic.blockNumber}</Link>,
    <Hash truncated value={extrinsic.hash} link={linkToExtrinsic} showTooltip />,
    <TimeAgoComponent date={extrinsic.timestamp} />,
    <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />,
    <>{extrinsic.method}</>,
    <>{extrinsic.section}</>
  ]);
};

const HistoryTable: FC<{
  setTotalOfExtrinsics: (total?: number) => void;
}> = (props) => {
  const {
    cursorField: id,
    limit,
    makeOnPageChange,
    offset,
    onRowsPerPageChange,
    page,
    rowsPerPage
  } = usePaginatorByCursor<ListExtrinsics['extrinsics'][0]>({
    cursorField: 'id',
    rowsPerPage: ROWS_PER_PAGE
  });

  const [range, setRange] = useState<Range>({
    from: null,
    to: null
  });

  const [resultFilter, setResultFilter] = useState<boolean | null>(null);

  const actionsQuery = useQuery<GetAvailableExtrinsicActions>(GET_AVAILABLE_EXTRINSIC_ACTIONS);
  
  const [methodsFilter, setMethodsFilter] = useState<string[]>();
  const availableMethods = useMemo(
    () => actionsQuery.data?.methods.map((m) => m.method),
    [actionsQuery.data]
  )

  const [callsFilter, setCallsFilter] = useState<string[]>();
  const availableCalls = useMemo(
    () => actionsQuery.data?.calls.map((c) => c.section),
    [actionsQuery.data]
  );

  const headers = useMemo(() => BaseLineCellsWrapper([
    'Extrinsics id',
    'Block',
    'Extrinsics hash',
    <DateRangeFilter onChange={setRange} value={range} />,
    <ResultFilter onChange={setResultFilter} value={resultFilter} />,
    <ValuesFilter availableValues={availableMethods} buttonLabel='Method' onChange={setMethodsFilter} value={methodsFilter} />,
    <ValuesFilter availableValues={availableCalls} buttonLabel='Call' onChange={setCallsFilter} value={callsFilter} />,
  ]), [availableCalls, availableMethods, callsFilter, methodsFilter, range, resultFilter]);

  const variables = useMemo(
    () => ({
      limit,
      offset,
      orderBy: [{ id: 'desc' }],
      where: {
        ...(resultFilter !== null && ({
          success: { _eq: resultFilter }
        })), 
        timestamp: {
          ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
          ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
        },
        id: { _lte: id },
        ...(methodsFilter && methodsFilter.length > 0 && ({ method: { _in: methodsFilter }})),
        ...(callsFilter && callsFilter.length > 0 && ({ section: { _in: callsFilter }}))
      }
    }),
    [
      callsFilter,
      id,
      limit,
      methodsFilter,
      offset,
      range.from,
      range.to,
      resultFilter
    ]
  );

  const { data, error, loading } = useQuery<ListExtrinsics>(LIST_EXTRINSICS, { variables });

  const rows = useMemo(() => (data?.extrinsics || []).map(extrinsicToRow), [data]);

  useEffect(() => {
    if (data?.agg && !id) {
      props.setTotalOfExtrinsics(data.agg.aggregate.count);
    }
  });

  const footer = useMemo(() => {
    if (data?.agg && data?.extrinsics && data.extrinsics.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={makeOnPageChange(data.extrinsics[0])}
          rowsPerPageOptions={[ROWS_PER_PAGE, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.extrinsics, makeOnPageChange, onRowsPerPageChange, page, rowsPerPage]);

  if (loading) return <TableSkeleton rows={rowsPerPage} cells={headers.length} footer />;

  return <BaselineTable error={!!error} headers={headers} rows={rows} footer={footer} />;
};

export default HistoryTable;
