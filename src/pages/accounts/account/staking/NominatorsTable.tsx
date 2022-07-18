import type { Nominator } from '../../../../schemas/staking.schema';

import React, { FC, useEffect, useMemo } from 'react';
import FormatBalance from '../../../../components/FormatBalance';
import XXNetworkAddress from '../../../../components/Hash/XXNetworkAddress';
import { BaseLineCellsWrapper, BaselineTable } from '../../../../components/Tables';
import { usePagination } from '../../../../hooks';

const EraStake = (nominator: Nominator) => {
  return BaseLineCellsWrapper([
    <XXNetworkAddress truncated='mdDown' value={nominator.account_id} />,
    <FormatBalance value={nominator.stake} />,
    `${parseFloat(nominator.share).toFixed(2)}%`
  ]);
};

const DEFAULT_ROWS_PER_PAGE = 10;
const headers = BaseLineCellsWrapper(['Account', 'Stake', 'Share']);

const NominatorsTable: FC<{ nominators?: Nominator[] }> = ({ nominators }) => {
  const pagination = usePagination({ rowsPerPage: DEFAULT_ROWS_PER_PAGE });
  const { paginate, setCount } = pagination;

  useEffect(() => {
    if (nominators) {
      setCount(nominators.length);
    }
  }, [nominators, setCount]);

  const paginated = useMemo(
    () => nominators && paginate(nominators).map(EraStake),
    [nominators, paginate]
  );

  return (
    <BaselineTable
      loading={paginated === undefined}
      headers={headers}
      rows={paginated ?? []}
      rowsPerPage={pagination.rowsPerPage}
      footer={pagination.controls}
    />
  );
};

export default NominatorsTable;
