import { useQuery } from '@apollo/client';
import React, { FC, useEffect, useMemo, useState } from 'react';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Hash from '../../components/Hash';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import {
  GetAvailableExtrinsicActions,
  GET_AVAILABLE_EXTRINSIC_ACTIONS,
  ListExtrinsics,
  LIST_EXTRINSICS
} from '../../schemas/extrinsics.schema';
import BooleanFilter from '../../components/Tables/filters/BooleanFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';

const extrinsicToRow = (extrinsic: ListExtrinsics['extrinsics'][0]): BaselineCell[] => {
  const linkToExtrinsic = `/extrinsics/${extrinsic.blockNumber}-${extrinsic.extrinsicIndex}`;

  return BaseLineCellsWrapper([
    <Link to={linkToExtrinsic}>{`${extrinsic.blockNumber}-${extrinsic.extrinsicIndex}`}</Link>,
    <Link to={`/blocks/${extrinsic.blockNumber}`}>{extrinsic.blockNumber}</Link>,
    <Hash truncated value={extrinsic.hash} url={linkToExtrinsic} showTooltip />,
    <TimeAgoComponent date={extrinsic.timestamp} />,
    <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />,
    <>{extrinsic.module}</>,
    <>{extrinsic.call}</>
  ]);
};

type Props = {
  setTotalOfExtrinsics: (total?: number) => void;
  withTimestampEvents: boolean;
};
const ExtrinsicsTable: FC<Props> = (props) => {
  const [range, setRange] = useState<Range>({
    from: null,
    to: null
  });

  const [resultFilter, setResultFilter] = useState<boolean | null>(null);

  const actionsQuery = useQuery<GetAvailableExtrinsicActions>(GET_AVAILABLE_EXTRINSIC_ACTIONS);

  const [modulesFilter, setModulesFilter] = useState<string[]>();
  const availableModules = useMemo(
    () => actionsQuery.data?.modules.map((m) => m.module),
    [actionsQuery.data]
  );

  const [callsFilter, setCallsFilter] = useState<string[]>();
  const availableCalls = useMemo(
    () => actionsQuery.data?.calls.map((c) => c.call),
    [actionsQuery.data]
  );

  const headers = useMemo(
    () =>
      BaseLineCellsWrapper([
        'Extrinsics id',
        'Block',
        'Extrinsics hash',
        <DateRangeFilter onChange={setRange} value={range} />,
        <BooleanFilter
          label='Result'
          toggleLabel={(v) => (v ? 'Success' : 'Failed')}
          onChange={setResultFilter}
          value={resultFilter}
        />,
        <ValuesFilter
          availableValues={availableModules}
          buttonLabel='Module'
          onChange={setModulesFilter}
          value={modulesFilter}
        />,
        <ValuesFilter
          availableValues={availableCalls}
          buttonLabel='Call'
          onChange={setCallsFilter}
          value={callsFilter}
        />
      ]),
    [availableCalls, availableModules, callsFilter, modulesFilter, range, resultFilter]
  );

  const moduleVariable = useMemo(() => {
    const conditions = [];
    if (!props.withTimestampEvents) {
      conditions.push({ module: { _neq: 'timestamp' } });
    }
    if (modulesFilter && modulesFilter.length > 0) {
      conditions.push({ module: { _in: modulesFilter } });
    }
    return conditions;
  }, [props.withTimestampEvents, modulesFilter]);

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc' }, { extrinsic_index: 'asc' }],
      where: {
        ...(resultFilter !== null && {
          success: { _eq: resultFilter }
        }),
        timestamp: {
          ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
          ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
        },
        ...{ _and: moduleVariable },
        ...(callsFilter && callsFilter.length > 0 && { call: { _in: callsFilter } })
      }
    }),
    [resultFilter, range.from, range.to, moduleVariable, callsFilter]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<ListExtrinsics>(LIST_EXTRINSICS, {
    variables
  });

  const rows = useMemo(() => (data?.extrinsics || []).map(extrinsicToRow), [data]);

  useEffect(() => {
    if (data?.agg) {
      props.setTotalOfExtrinsics(data.agg.aggregate.count);
    }
  });

  const { reset } = pagination;
  useEffect(() => {
    reset();
  }, [range, callsFilter, moduleVariable, reset, resultFilter]);

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rowsPerPage={pagination.rowsPerPage}
      rows={rows}
      footer={pagination.controls}
    />
  );
};

export default ExtrinsicsTable;
