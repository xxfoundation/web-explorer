import { useQuery } from '@apollo/client';
import React, { FC, useCallback, useMemo, useState } from 'react';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import { GetNominatorsOfAccount, GET_NOMINATORS_OF_ACCOUNT } from '../../schemas/nominators.schema';

const EraStake = ({ accountId, share, stake }: GetNominatorsOfAccount['nominations'][0]) => {
  return BaseLineCellsWrapper([
    <Link to={`/accounts/${accountId}`}>{accountId}</Link>,
    <FormatBalance value={stake.toString()} />,
    `${share}%`
  ]);
};

const DEFAULT_ROWS_PER_PAGE = 5;
const headers = BaseLineCellsWrapper(['Account', 'Stake', 'Share']);

const NominatorsTable: FC<{ stashAddress: string }> = ({ stashAddress }) => {
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  const onPageChange = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);
  const { data, loading } = useQuery<GetNominatorsOfAccount>(GET_NOMINATORS_OF_ACCOUNT, {
    variables: {
      stashAddress,
      orderBy: [{ block_number: 'desc', event_index: 'asc' }],
      limit: rowsPerPage,
      offset: page * rowsPerPage
    }
  });
  const rows = useMemo(() => {
    return (data?.nominations || []).map(EraStake);
  }, [data?.nominations]);
  const footer = useMemo(() => {
    if (data?.agg && data?.nominations && data.nominations.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE, 20, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.agg, data?.nominations, onPageChange, onRowsPerPageChange, page, rowsPerPage]);
  if (loading) return <TableSkeleton rows={DEFAULT_ROWS_PER_PAGE} cells={headers.length} />;
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default NominatorsTable;
