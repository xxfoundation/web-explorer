import { useQuery, useSubscription } from '@apollo/client';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Hash from '../../components/Hash';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable, headerCellsWrapper } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import RefreshButton from '../../components/buttons/Refresh';
import {
  GetAvailableExtrinsicActions,
  GET_AVAILABLE_EXTRINSIC_ACTIONS,
  ListExtrinsics,
  LIST_EXTRINSICS,
  SubscribeExtrinsicsSinceBlock,
  SUBSCRIBE_EXTRINSICS_SINCE_BLOCK
} from '../../schemas/extrinsics.schema';
import BooleanFilter from '../../components/Tables/filters/BooleanFilter';
import ValuesFilter from '../../components/Tables/filters/ValuesFilter';
import DateRangeFilter, { Range } from '../../components/Tables/filters/DateRangeFilter';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';
import useSessionState from '../../hooks/useSessionState';

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
  const { t } = useTranslation();
  /* ----------------- Query Available Extrinsic Module/Calls ----------------- */
  const actionsQuery = useQuery<GetAvailableExtrinsicActions>(GET_AVAILABLE_EXTRINSIC_ACTIONS);

  /* ----------------------- Initialize State Variables ----------------------- */
  const [range, setRange] = useSessionState<Range>('extrinsics.range', {
    from: null,
    to: null
  });

  const [resultFilter, setResultFilter] = useSessionState<boolean | null>(
    'extrinsics.result',
    null
  );

  const [modulesFilter, setModulesFilter] = useSessionState<string[] | undefined>(
    'extrinsics.modules',
    undefined
  );

  const [callsFilter, setCallsFilter] = useSessionState<string[] | undefined>(
    'extrinsics.calls',
    undefined
  );

  /* --------------------- Initialize Dependent Variables --------------------- */
  const availableModules = useMemo(
    () => actionsQuery.data?.modules.map((m) => m.module),
    [actionsQuery.data]
  );

  const availableCalls = useMemo(
    () => actionsQuery.data?.calls.map((c) => c.call),
    [actionsQuery.data]
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

  const where = useMemo(() => {
    return {
      ...(resultFilter !== null && {
        success: { _eq: resultFilter }
      }),
      timestamp: {
        ...(range.from ? { _gt: new Date(range.from).getTime() } : undefined),
        ...(range.to ? { _lt: new Date(range.to).getTime() } : undefined)
      },
      ...{ _and: moduleVariable },
      ...(callsFilter && callsFilter.length > 0 && { call: { _in: callsFilter } })
    };
  }, [resultFilter, range.from, range.to, moduleVariable, callsFilter]);

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc' }, { extrinsic_index: 'asc' }],
      where: where
    }),
    [where]
  );

  /* --------------------------------- Headers -------------------------------- */
  const headers = useMemo(
    () =>
      headerCellsWrapper([
        t('Extrinsic id'),
        t('Block'),
        t('Extrinsic hash'),
        [t('Time'), <DateRangeFilter onChange={setRange} value={range} />],
        [t('Result'), <BooleanFilter
          label={t('Result')}
          toggleLabel={(v) => (v ? 'Success' : 'Failed')}
          onChange={setResultFilter}
          value={resultFilter}
        />],
        [t('Modules'), <ValuesFilter
          availableValues={availableModules}
          buttonLabel={t('Module')}
          onChange={setModulesFilter}
          value={modulesFilter}
        />],
        ['Call', <ValuesFilter
          availableValues={availableCalls}
          buttonLabel={t('Call')}
          onChange={setCallsFilter}
          value={callsFilter}
        />]
      ]),
    [
      t,
      availableCalls,
      availableModules,
      callsFilter,
      modulesFilter,
      range,
      resultFilter,
      setCallsFilter,
      setModulesFilter,
      setRange,
      setResultFilter
    ]
  );

  /* ----------------------- Main Query - Get Extrinsics ---------------------- */
  const { data, error, loading, pagination, refetch } = usePaginatedQuery<ListExtrinsics>(
    LIST_EXTRINSICS,
    {
      variables
    }
  );
  const rows = useMemo(() => (data?.extrinsics || []).map(extrinsicToRow), [data]);

  /* ---------------------------- Setup Pagination ---------------------------- */
  const { reset } = pagination;
  useEffect(() => {
    reset();
  }, [range, callsFilter, moduleVariable, reset, resultFilter]);

  /* ----------------------------- Refresh Button ----------------------------- */
  const [latestExtrinsicBlock, setLatestExtrinsicBlock] = useState<number>();
  useEffect(() => {
    setLatestExtrinsicBlock(data?.extrinsics[0]?.blockNumber);
  }, [data?.extrinsics]);

  const subscribeVariables = useMemo(
    () => ({
      where: { ...where, ...{ block_number: { _gt: latestExtrinsicBlock } } }
    }),
    [latestExtrinsicBlock, where]
  );
  const extrinsicsSinceLastFetch = useSubscription<SubscribeExtrinsicsSinceBlock>(
    SUBSCRIBE_EXTRINSICS_SINCE_BLOCK,
    {
      skip: latestExtrinsicBlock === undefined,
      variables: subscribeVariables
    }
  );
  const blocksSinceFetch = extrinsicsSinceLastFetch?.data?.extrinsics?.aggregate?.count;

  /* ------------------------- Update External Counter ------------------------ */
  useEffect(() => {
    if (data?.agg) {
      props.setTotalOfExtrinsics(data.agg.aggregate.count);
    }
  });

  /* ----------------------------- Build Component ---------------------------- */
  return (
    <>
      <Box sx={{ textAlign: 'right' }}>
        {data?.extrinsics && <RefreshButton countSince={blocksSinceFetch} refetch={refetch} />}
      </Box>
      <BaselineTable
        error={!!error}
        loading={loading}
        headers={headers}
        rowsPerPage={pagination.rowsPerPage}
        rows={rows}
        footer={pagination.controls}
      />
    </>
  );
};

export default ExtrinsicsTable;
