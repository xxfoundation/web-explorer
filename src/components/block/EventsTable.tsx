import { useQuery } from '@apollo/client';
import { Box,TableCellProps } from '@mui/material';
import React, { FC, useEffect, useMemo } from 'react';

import CodeDisplay from '../CodeDisplay';
import { EVENTS_OF_BLOCK, ListEvents, Event } from '../../schemas/events.schema';
import { BaselineCell, BaselineTable } from '../Tables';
import TimeAgoComponent from '../TimeAgo';
import { usePagination } from '../../hooks';
import { useTranslation } from 'react-i18next';
import { processEventDoc } from '../utils';

const ROWS_PER_PAGE = 10;

const props: TableCellProps = { align: 'left' };

export const DataTile: FC<{ headers?: string[]; values: string[] }> = ({ headers, values }) => {
  return values.length !== 0 ? (
    <CodeDisplay>
      {values.map((value, index) => (
        <Box key={index}>
          {headers && headers.length === values.length && (
            <>
              <b>{headers[index]}</b>
              {': '}
            </>
          )}
          {JSON.stringify(value, null, 2)}
        </Box>
      ))}
    </CodeDisplay>
  ) : null;
};

const rowsParser = ({
  blockNumber,
  call,
  data,
  doc,
  index,
  module,
  timestamp
}: Event): BaselineCell[] => {
  return [
    { value: `${blockNumber}-${index}`, props },
    { value: <TimeAgoComponent date={timestamp} /> },
    { value: `${module} (${call})` },
    { value: <DataTile headers={processEventDoc(doc)} values={JSON.parse(data)} /> }
  ];
};

type Props = {
  setCount?: (count: number) => void;
  where: Record<string, unknown>;
};

const EventsTable: FC<Props> = ({ setCount = () => {}, where }) => {
  const { t } = useTranslation();
  const pagination = usePagination({ rowsPerPage: ROWS_PER_PAGE });
  const { paginate, setCount: setPaginationCount } = pagination;

  const variables = useMemo(
    () => ({
      orderBy: [{ block_number: 'desc', event_index: 'asc' }],
      where
    }),
    [where]
  );
  const { data, error, loading } = useQuery<ListEvents>(EVENTS_OF_BLOCK, { variables });

  const rows = useMemo(() => {
    return paginate(data?.events || []).map(rowsParser);
  }, [data?.events, paginate]);

  useEffect(() => {
    if (data?.agg) {
      setCount(data.agg.aggregate.count);
      setPaginationCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setCount, setPaginationCount]);

  const headers = useMemo(() => [
    { value: t('event id'), props },
    { value: t('time') },
    { value: t('action') },
    { value: t('data') }
  ], [t]);

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

export default EventsTable;
