/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useSubscription } from '@apollo/client';
import React, { FC, useEffect, useMemo, useState } from 'react';

import { Box } from '@mui/material';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Hash from '../../components/Hash';
import Link from '../../components/Link';
import { BaselineCell, BaseLineCellsWrapper, BaselineTable, HeaderCellsWrapper } from '../../components/Tables';
import TimeAgoComponent from '../../components/TimeAgo';
import RefreshButton from '../../components/buttons/Refresh';
import {
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
import { GetRuntimeMetadata, GET_RUNTIME_METADATA } from '../../schemas/chaindata.schema';

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

type PalletAndExtrinsics = {
  name: string;
  calls: string[];
}[]

const snakeToCamel = (value: string): string => {
  return value.toLowerCase().replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  );
}

const processMetadata = (metadata: any) => {
  const palletsAndExtrinsics: { name: string; calls: string[]; }[] = []
  if(!metadata) {return undefined}
  // eslint-disable-next-line no-unused-vars
  metadata.pallets.forEach((pallet: { calls: { type: null; }; name: string; }) => {
    const callsId = pallet.calls?.type || null
    const calls: string[] = []
    const palletAndExtrinsics = {
      name: pallet.name.startsWith('XX')
            ? `xx${pallet.name.substring(2, pallet.name.length)}`
            : pallet.name.toLowerCase(),
      calls,
    }
    if (callsId) {
      metadata.lookup.types
        .filter(
          ({ id, type }: any) =>
            type.path.includes('Call') && id === callsId
        )
        .forEach(({ type }: any) => {
          type.def.variant.variants.forEach((variant: { name: string }) => {
            palletAndExtrinsics.calls.push(
              variant.name.startsWith('xx')
              ? `XX${variant.name.substring(
                  2,
                  variant.name.length
                )}`
              : snakeToCamel(variant.name)
            )
          })
        })
    }
    palletsAndExtrinsics.push(palletAndExtrinsics)
  })
  return palletsAndExtrinsics;
} 

const getCalls = (palletsAndExtrinsics: PalletAndExtrinsics, moduleFilter: string[]): string[] => {
  let calls: string[] = []
  moduleFilter.forEach((module) => {
    calls = [...palletsAndExtrinsics.filter(pallet => pallet.name === module).map((pallet) => pallet.calls)[0], ...calls]
  })
  return calls
}

const ExtrinsicsTable: FC<Props> = (props) => {
  /* ----------------- Query Available Extrinsic Module/Calls ----------------- */
  const [availableCalls, setAvailableCalls] = useState<string[]>();
  const metadata = useQuery<GetRuntimeMetadata>(GET_RUNTIME_METADATA);
  const palletsAndExtrinsics = processMetadata(metadata?.data?.runtime[0].metadata.metadata.v14 && JSON.parse(JSON.stringify(metadata?.data?.runtime[0].metadata.metadata.v14)))

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

  useEffect(() => {
    setCallsFilter([])
    if(modulesFilter) {
      setAvailableCalls(palletsAndExtrinsics && getCalls(palletsAndExtrinsics, modulesFilter))
    }
    // Would like to call this function only when the modulesFilter is updated 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modulesFilter])

  /* --------------------- Initialize Dependent Variables --------------------- */
  const availableModules = useMemo(
    () => palletsAndExtrinsics?.filter(({ calls }) => calls.length !== 0)
        .map(({ name }) => name)
        .sort(),
    [palletsAndExtrinsics]
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
      HeaderCellsWrapper([
        'Extrinsic id',
        'Block',
        'Extrinsic hash',
        ['Time', <DateRangeFilter onChange={setRange} value={range} />],
        ['Result', <BooleanFilter
          label='Result'
          toggleLabel={(v) => (v ? 'Success' : 'Failed')}
          onChange={setResultFilter}
          value={resultFilter}
        />],
        ['Modules', <ValuesFilter
          availableValues={availableModules}
          buttonLabel='Module'
          onChange={setModulesFilter}
          value={modulesFilter}
        />],
        ['Call', <ValuesFilter
          availableValues={availableCalls}
          buttonLabel='Call'
          onChange={setCallsFilter}
          value={callsFilter}
          disabled={!modulesFilter || modulesFilter?.length === 0}
        />]
      ]),
    [
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
        id='baseline-table'
        error={!!error}
        loading={loading || !palletsAndExtrinsics}
        headers={headers}
        rowsPerPage={pagination.rowsPerPage}
        rows={rows}
        footer={pagination.controls}
      />
    </>
  );
};

export default ExtrinsicsTable;
