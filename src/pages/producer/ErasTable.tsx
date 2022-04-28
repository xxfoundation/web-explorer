import React from 'react';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';

type Era = {
  index: string;
  startBlock: number;
  endBlock: number;
  rewardPoint: number;
  blocksProduced: number;
  blockNumber: number;
};

const eras = [
  {
    index: '12313',
    startBlock: 1245151,
    endBlock: 15666655,
    rewardPoint: 12313.31231,
    blocksProduced: 113,
    blockNumber: 123123
  }
];

const EraRow = (rowData: Era) => {
  return BaseLineCellsWrapper([
    rowData.index,
    <Link to={`/block/${rowData.startBlock}`}>{rowData.startBlock}</Link>,
    <Link to={`/block/${rowData.endBlock}`}>{rowData.endBlock}</Link>,
    rowData.rewardPoint,
    <Link to={`/blocks/${rowData.blockNumber}/producer/${rowData.blocksProduced}`}>
      {rowData.blocksProduced}
    </Link>
  ]);
};

const headers = BaseLineCellsWrapper([
  'era',
  'start block',
  'end block',
  'reward point',
  'blocks producer'
]);

const ErasTables = () => <BaselineTable headers={headers} rows={eras.map(EraRow)} />;

export default ErasTables;
