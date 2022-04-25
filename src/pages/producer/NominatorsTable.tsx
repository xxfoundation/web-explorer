import React from 'react';
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
  return BaseLineCellsWrapper([<Link to={`/account/${account}`}>{account}</Link>, stake, share]);
};

const NominatorsTable = () => {
  return (
    <BaselineTable
      headers={BaseLineCellsWrapper(['Account', 'Stake', 'Share'])}
      rows={data.map(EraStake)}
    />
  );
};

export default NominatorsTable;
