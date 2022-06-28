import React, { FC } from 'react';
import Address from '../../../../components/Hash/XXNetworkAddress';
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

const stakingActivityToRow = (item: StakingActivityType): BaselineCell[] => {
  return [
    { value: <Address value={item.validatorAddress} name={item.validator} /> },
    { value: <FormatBalance value={item.bonded.toString()} /> },
    { value: item.bond.toString() },
    { value: <FormatBalance value={item.totalBonded.toString()} /> },
    { value: <Link to={`/account/${item.nominator}`}>{item.nominator}</Link> },
    { value: `${item.commission.toPrecision(3)}%` },
    { value: `${item.share.toPrecision(3)}%` }
  ];
};

const StakingActivityTable: FC = ({}) => {
  return <BaselineTable rows={[].map(stakingActivityToRow)} headers={headers} />;
};

export default StakingActivityTable;
