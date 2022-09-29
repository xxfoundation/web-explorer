import type { Nominator } from '../../../../schemas/staking.schema';

import React, { FC, useEffect, useMemo } from 'react';
import FormatBalance from '../../../../components/FormatBalance';
import XXNetworkAddress from '../../../../components/Hash/XXNetworkAddress';
import { BaseLineCellsWrapper, BaselineTable, HeaderCellsWrapper } from '../../../../components/Tables';
import { usePagination } from '../../../../hooks';
import { Divider, Typography } from '@mui/material';

const EraStake = (nominator: Nominator) => {
  return BaseLineCellsWrapper([
    <XXNetworkAddress truncated='mdDown' value={nominator.account_id} roles={{ nominator: true }} />,
    <FormatBalance value={nominator.stake} />,
    `${parseFloat(nominator.share).toFixed(2)}%`
  ]);
};

const DEFAULT_ROWS_PER_PAGE = 10;
const headers = HeaderCellsWrapper(['Account', 'Stake', 'Share']);

type Props = {
  nominators?: Nominator[];
}

const NominatorsTable: FC<Props> = ({ nominators }) => {
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

  let totalNominatorsStake = 0;
  let totalNominatorsShare = 0;
  nominators?.forEach((elem) => {
    totalNominatorsStake += parseFloat(elem.stake);
    totalNominatorsShare += parseFloat(elem.share);
  });

  const nominatorsFooter = useMemo(() => BaseLineCellsWrapper([
    <Typography variant='h4' sx={{ textAlign: 'end' }}>
      Total of Other Stake
    </Typography>,
    <FormatBalance value={totalNominatorsStake?.toString()} />,
    `${totalNominatorsShare.toFixed(2)}%`
  ]), [totalNominatorsShare, totalNominatorsStake]);

  if (nominatorsFooter && paginated?.length) {
    paginated?.push(BaseLineCellsWrapper([<Divider />, <Divider />, <Divider />]));
    paginated?.push(nominatorsFooter);
  }

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
