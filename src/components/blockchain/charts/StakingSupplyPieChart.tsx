import React from 'react';
import { theme } from '../../../themes/default';
import { PieChartWithLegend } from '../../charts/highcharts/PieChart';
import DefaultTile from '../../DefaultTile';

const customDataSample = [
  { name: 'stakeable', value: 52301, percentage: 5.2, id: 'stakeable', title: true },
  { name: 'team', value: 22145, percentage: 2.2, id: 'stakeable-team' },
  { name: 'foundation', value: 30156, percentage: 3, id: 'stakeable-foundation' },
  { name: 'unstakeable', value: 52301, percentage: 43.3, id: 'unstakeable', title: true },
  { name: 'team', value: 22145, percentage: 23.2, id: 'unstakeable-team' },
  { name: 'foundation', value: 30156, percentage: 20.1, id: 'unstakeable-foundation' }
];

const value = '9999120003';
const data = [
  {
    name: 'staked',
    y: 58,
    color: theme.palette.primary.main,
    custom: { data: [...customDataSample] }
  },
  {
    name: 'liquid',
    y: 34,
    color: '#13EEF9',
    custom: { data: [...customDataSample] }
  },
  {
    name: 'unbonding',
    y: 8,
    color: '#6F74FF',
    custom: { data: [...customDataSample] }
  }
];

const StakingSupply = () => {
  return (
    <DefaultTile>
      <PieChartWithLegend data={data} name='staking supply' value={value} />
    </DefaultTile>
  );
};

export default StakingSupply;
