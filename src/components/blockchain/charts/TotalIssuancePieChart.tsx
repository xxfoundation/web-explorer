import React from 'react';
import { theme } from '../../../themes/default';
import { PieChartWithLegend } from '../../charts/highcharts/PieChart';
import DefaultTile from '../../DefaultTile';

const sampleCustomData = [
  { name: 'stakeable', value: 162301, percentage: 84, title: true, id: 'stakeable' },
  { name: 'team', value: 82145, percentage: 1, id: 'stakeable-team' },
  { name: 'foundation', value: 80156, percentage: 83, id: 'stakeable-foundation' },
  { name: 'unstakeable', value: 162301, percentage: 80, title: true, id: 'unstakeable' },
  { name: 'team', value: 82145, percentage: 40, id: 'unstakeable-team' },
  { name: 'foundation', value: 80156, percentage: 40, id: 'unstakeable-foundation' }
];

const TotalIssuance = () => {
  // TODO make sure the order is circulation, vesting, ...
  const data = [
    {
      name: 'circulation',
      y: 6,
      color: '#13EEF9',
      custom: {
        data: [...sampleCustomData]
      }
    },
    {
      name: 'vesting',
      y: 49,
      color: theme.palette.primary.main,
      custom: {
        data: [...sampleCustomData]
      }
    },
    {
      name: 'rewards',
      y: 39,
      color: '#6F74FF',
      custom: {
        data: [...sampleCustomData]
      }
    },
    {
      name: 'others',
      y: 6,
      color: '#7BE03D',
      custom: {
        data: [
          { name: 'total', value: 214446, percentage: 2.145, id: 'total', title: true },
          { name: 'treasury', value: 72145, percentage: 0.722, id: 'treasury' },
          { name: 'canaryNetReward', value: 72145, percentage: 0.722, id: 'canaryNetReward' },
          { name: 'liquidityStaking', value: 70156, percentage: 0.701, id: 'liquidityStaking' }
        ]
      }
    }
  ];

  const crustData = [
    {
      name: 'staking supply',
      y: 10,
      color: theme.palette.warning.main,
      custom: {
        data: [...sampleCustomData]
      },
      states: {
        hover: {
          brightness: -0.2,
          halo: { size: 0 }
        }
      }
    },
    {
      name: 'staking supply missing',
      y: 90,
      color: theme.palette.grey[200],
      states: {
        hover: {
          brightness: 0,
          halo: { size: 0 }
        }
      },
      custom: {
        hiddenLegend: true,
        noClick: true
      }
    }
  ];
  const value = '9999120003'; // TODO will be obtained by a aggregation of the values
  return (
    <>
      <DefaultTile>
        <PieChartWithLegend data={data} crustData={crustData} name='total issuance' value={value} />
      </DefaultTile>
    </>
  );
};

export default TotalIssuance;
