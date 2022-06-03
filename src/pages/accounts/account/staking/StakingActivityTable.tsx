import React, { FC } from 'react';
import { Address } from '../../../../components/ChainId';
import FormatBalance from '../../../../components/FormatBalance';
import Link from '../../../../components/Link';
import { BaselineCell, BaselineTable } from '../../../../components/Tables';

type StakingActivityType = {
  validator: string;
  validatorAddress: string;
  bonded: string;
  bond: number;
  totalBonded: string;
  nominator: number;
  commission: number;
  share: number;
};

const headers = [
  {
    value: 'validator'
  },
  { value: 'validator bonded' },
  { value: 'mybond' },
  { value: 'total bonded' },
  { value: 'nominator' },
  { value: 'commission' },
  { value: 'my share' }
];

const sampleData = [
  {
    validatorAddress: '6agYSwtSM4AVwxBjVDaVcC9SVwUZa9a6xcZERLoYdJHJVH2T',
    validator: 'pos.dog/4',
    bonded: '30000000',
    bond: 0,
    totalBonded: '1620936584655401318',
    nominator: 162,
    commission: 2.0,
    share: 2.95
  }
];

const stakingActivityToRow = (item: StakingActivityType): BaselineCell[] => {
  return [
    { value: <Address value={item.validatorAddress} name={item.validator} truncated /> },
    { value: <FormatBalance value={item.bonded.toString()} /> },
    { value: item.bond.toString() },
    { value: <FormatBalance value={item.totalBonded.toString()} /> },
    { value: <Link to={`/account/${item.nominator}`}>{item.nominator}</Link> },
    { value: `${item.commission.toPrecision(3)}%` },
    { value: `${item.share.toPrecision(3)}%` }
  ];
};

const StakingActivityTable: FC = ({}) => {
  return <BaselineTable rows={sampleData.map(stakingActivityToRow)} headers={headers} />;
};

export default StakingActivityTable;
