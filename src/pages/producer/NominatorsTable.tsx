import type { Nominator } from '../../schemas/accounts.schema';

import React, { FC, useEffect, useMemo } from 'react';
import FormatBalance from '../../components/FormatBalance';
import XXNetworkAddress from '../../components/Hash/XXNetworkAddress';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import { usePagination } from '../../hooks';

export type NominatorsOfAccount = {
  share: string;
  stake: string;
  account_id: string;
};

const EraStake = (nominator: NominatorsOfAccount) => {
  return BaseLineCellsWrapper([
    <XXNetworkAddress truncated='mdDown' value={nominator.account_id} />,
    <FormatBalance value={nominator.stake.toString()} />,
    `${nominator.share}%`
  ]);
};

const DEFAULT_ROWS_PER_PAGE = 10;
const headers = BaseLineCellsWrapper(['Account', 'Stake', 'Share']);

const NominatorsTable: FC<{ nominations?: Nominator[] }> = ({ nominations }) => {
  const pagination = usePagination({ rowsPerPage: DEFAULT_ROWS_PER_PAGE });
  const { paginate, setCount } = pagination;

  useEffect(() => {
    if (nominations) {
      setCount(nominations.length);
    }
  }, [nominations, setCount])

  const paginated = useMemo(
    () => nominations && paginate(nominations).map(EraStake),
    [nominations, paginate]
  );

  return (
    <BaselineTable
      loading={paginated === undefined}
      headers={headers}
      rows={paginated ?? []}
      rowsPerPage={pagination.rowsPerPage}
      footer={pagination.controls} />
  );
};

export default NominatorsTable;
