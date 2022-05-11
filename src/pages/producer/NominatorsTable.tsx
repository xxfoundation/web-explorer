import React, { useMemo } from 'react';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';

type Stake = {
  account: string;
  stake: string;
  share: string;
};

const data = [
  {
    account: '6aTgpWh4Ny1j8uvXbvBb5pY1cokWMthuAUvcMKi9V1WkCsUo',
    stake: '200.00 XX',
    share: '0.00%'
  }
];

const EraStake = ({ account, share, stake }: Stake) => {
  return BaseLineCellsWrapper([<Link to={`/accounts/${account}`}>{account}</Link>, stake, share]);
};

const NominatorsTable = () => {
  const headers = useMemo(() => {
    return BaseLineCellsWrapper(['Account', 'Stake', 'Share']);
  }, []);
  const rows = useMemo(() => {
    return data.map(EraStake);
  }, []);
  return <BaselineTable headers={headers} rows={rows} />;
};

export default NominatorsTable;
