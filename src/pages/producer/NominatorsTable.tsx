import React, { FC, useCallback, useMemo, useState } from 'react';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';

export type NominatorsOfAccount = {
  share: string;
  stake: string;
  account_id: string;
};

const EraStake = (nominator: NominatorsOfAccount) => {
  return BaseLineCellsWrapper([
    <Link to={`/accounts/${nominator.account_id}`}>{nominator.account_id}</Link>,
    <FormatBalance value={nominator.stake.toString()} />,
    `${nominator.share}%`
  ]);
};

const DEFAULT_ROWS_PER_PAGE = 5;
const headers = BaseLineCellsWrapper(['Account', 'Stake', 'Share']);

const paginate = (
  nominators: NominatorsOfAccount[],
  rowsPerPage: number,
  page: number
): NominatorsOfAccount[] => {
  // page starts at 0
  return nominators.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
};

const NominatorsTable: FC<{ nominations: string }> = ({ nominations }) => {
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  const onPageChange = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);

  const accountNominators = nominations as unknown as NominatorsOfAccount[];
  const rows = useMemo(() => {
    return paginate(accountNominators, rowsPerPage, page).map(EraStake);
  }, [accountNominators, page, rowsPerPage]);
  const footer = useMemo(() => {
    if (accountNominators && accountNominators.length) {
      return (
        <TablePagination
          page={page}
          count={accountNominators.length}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE, 20, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [accountNominators, onPageChange, onRowsPerPageChange, page, rowsPerPage]);
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default NominatorsTable;
