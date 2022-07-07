import { useQuery } from '@apollo/client';
import React, { FC, useEffect, useMemo, useState } from 'react';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Hash from '../../components/Hash';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import { GetAvailableExtrinsicActions, GET_AVAILABLE_EXTRINSIC_ACTIONS, ListExtrinsics, LIST_EXTRINSICS } from '../../schemas/extrinsics.schema';
import BooleanFilter from '../../components/Tables/filters/BooleanFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';

const extrinsicToRow = (extrinsic: ListExtrinsics['extrinsics'][0]): BaselineCell[] => {
  const linkToExtrinsic = `/extrinsics/${extrinsic.blockNumber}-${extrinsic.index}`;
  
  return BaseLineCellsWrapper([
    <Link to={linkToExtrinsic}>{`${extrinsic.blockNumber}-${extrinsic.index}`}</Link>,
    <Link to={`/blocks/${extrinsic.blockNumber}`}>{extrinsic.blockNumber}</Link>,
    <Hash truncated value={extrinsic.hash} url={linkToExtrinsic} showTooltip />,
    <TimeAgoComponent date={extrinsic.timestamp} />,
    <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />,
    <>{extrinsic.method}</>,
    <>{extrinsic.section}</>
  ]);
};

const ExtrinsicsTable: FC<{
  setTotalOfExtrinsics: (total?: number) => void;
}> = (props) => {
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
    <BooleanFilter
      label='Result'
      toggleLabel={(v) => v ? 'Success' : 'Failed'}
      onChange={setResultFilter}
      value={resultFilter} />,
    <ValuesFilter availableValues={availableMethods} buttonLabel='Method' onChange={setMethodsFilter} value={methodsFilter} />,
    <ValuesFilter availableValues={availableCalls} buttonLabel='Call' onChange={setCallsFilter} value={callsFilter} />,
  ]), [availableCalls, availableMethods, callsFilter, methodsFilter, range, resultFilter]);

  const variables = useMemo(
    () => ({
      orderBy: [{ id: 'desc' }],
      where: {
        ...(resultFilter !== null && ({
          success: { _eq: resultFilter }
        })), 
        timestamp: {
          ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
          ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
        },
        ...(methodsFilter && methodsFilter.length > 0 && ({ method: { _in: methodsFilter }})),
        ...(callsFilter && callsFilter.length > 0 && ({ section: { _in: callsFilter }}))
      }
    }),
    [
      callsFilter,
      methodsFilter,
      range.from,
      range.to,
      resultFilter
    ]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<ListExtrinsics>(LIST_EXTRINSICS, { variables });

  const rows = useMemo(() => (data?.extrinsics || []).map(extrinsicToRow), [data]);

  useEffect(() => {
    if (data?.agg) {
      props.setTotalOfExtrinsics(data.agg.aggregate.count);
    }
  });

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rowsPerPage={pagination.rowsPerPage}
      rows={rows} footer={pagination.controls} />
  );
};

export default ExtrinsicsTable;
