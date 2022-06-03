import type { FC } from 'react';
import type { Economics } from '../../schemas/economics.schema';
import type { ChartJSOrUndefined, ChartProps } from 'react-chartjs-2/dist/types';

import { useSubscription } from '@apollo/client';
import React, { useRef, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Stack, Typography } from '@mui/material';
import { pick, mapValues } from 'lodash';
import BN from 'bn.js';

import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';
import { LightTooltipHeader, LightTooltip } from '../Tooltips';
import useCustomTooltip from '../../hooks/useCustomTooltip';
import { LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';

type Options = ChartProps<'doughnut'>['options'];
enum DataLabels {
  Circulating = 'Circulating',
  Vesting = 'Vesting',
  Rewards = 'Rewards',
  Others = 'Others',
  StakeableSupply = 'Stakeable Supply',
  Other = 'Other'
}

type Data = {
  label: DataLabels;
  value: BN;
  percentage: number;
  color: string;
  hideTooltip?: boolean;
};

const seriesKeys: (keyof Economics)[] = [
  'circulating',
  'rewards',
  'totalSupply',
  'vesting',
  'stakeableSupply'
];

const keysCollapsedUnderOther: (keyof Economics)[] = [
  'bridge',
  'canary',
  'claims',
  'custody',
  'sales',
  'treasury'
];

const OthersTooltipExtension: FC<Economics> = (economics) => (
  <Stack spacing={1} sx={{ mt: 1 }}>
    <Box>
      <LightTooltipHeader>Treasury</LightTooltipHeader>
      <FormatBalance value={economics.treasury} />
    </Box>
    <Box>
      <LightTooltipHeader>Canary</LightTooltipHeader>
      <FormatBalance value={economics.canary} />
    </Box>
    <Box>
      <LightTooltipHeader>Sales</LightTooltipHeader>
      <FormatBalance value={economics.sales} />
    </Box>
    <Box>
      <LightTooltipHeader>Claims</LightTooltipHeader>
      <FormatBalance value={economics.claims} />
    </Box>
    <Box>
      <LightTooltipHeader>Bridge</LightTooltipHeader>
      <FormatBalance value={economics.bridge} />
    </Box>
    <Box>
      <LightTooltipHeader>Custody</LightTooltipHeader>
      <FormatBalance value={economics.custody} />
    </Box>
  </Stack>
);

const extractChartData = (economics?: Economics) => {
  if (!economics) {
    return {
      legendData: [],
      data: {
        datasets: []
      }
    };
  }
  const converted = mapValues(
    pick(economics, seriesKeys.concat(keysCollapsedUnderOther)),
    (o) => new BN(o.toString().replace('.', ''))
  );
  const others = Object.values(pick(converted, keysCollapsedUnderOther)).reduce(
    (acc, cur) => acc.add(cur),
    new BN('0')
  );
  console.warn(converted);
  const { circulating, rewards, stakeableSupply, totalSupply, vesting } = converted;

  const calculatePercentage = (n: BN) => n.muln(1e6).div(totalSupply).toNumber() / 1e6;

  const serieA: Data[] = [
    {
      color: '#13EEF9',
      label: DataLabels.Circulating,
      value: circulating,
      percentage: calculatePercentage(circulating)
    },
    {
      color: '#00A2D6',
      label: DataLabels.Vesting,
      value: vesting,
      percentage: calculatePercentage(vesting)
    },
    {
      color: '#6F74FF',
      label: DataLabels.Rewards,
      value: rewards,
      percentage: calculatePercentage(rewards)
    },
    {
      color: '#59BD1C',
      label: DataLabels.Others,
      value: others,
      percentage: calculatePercentage(others)
    }
  ];

  const other = totalSupply.sub(stakeableSupply);

  const serieB: Data[] = [
    {
      color: '#FFC908',
      label: DataLabels.StakeableSupply,
      value: stakeableSupply,
      percentage: calculatePercentage(stakeableSupply)
    },
    {
      color: '#EAEAEA',
      label: DataLabels.Other,
      value: other,
      percentage: calculatePercentage(other),
      hideTooltip: true
    }
  ];

  const legendMapper = ({ color, label, percentage }: Data) => ({
    label: `${percentage}% ${label}`,
    color
  });

  const legendData = serieA
    .concat(serieB)
    .filter((s) => !s.hideTooltip)
    .map(legendMapper);

  return {
    legendData,
    data: {
      datasets: [
        {
          backgroundColor: serieA.map((s) => s.color),
          data: serieA
        },
        {
          backgroundColor: serieB.map((s) => s.color),
          data: serieB
        }
      ]
    }
  };
};

const TotalIssuanceDonutChart = () => {
  const subscription = useSubscription<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
  const economics = subscription.data?.economics[0];

  const chartRef = useRef<ChartJSOrUndefined<'doughnut', Data[]>>(null);
  const customTooltip = useCustomTooltip(chartRef);
  const { data, legendData } = useMemo(() => extractChartData(economics), [economics]);

  const chartOptions = useMemo<Options>(
    () => ({
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        tooltip: customTooltip.plugin
      },
      parsing: {
        xAxisKey: 'label',
        yAxisKey: 'percentage'
      }
    }),
    [customTooltip.plugin]
  );

  if (subscription.error) {
    return <Typography color='red'>Something went wrong...</Typography>;
  }

  return (
    <Stack direction='row' spacing={3} sx={{ flexGrow: 1 }}>
      <Box className='chart-container' style={{ width: '50%', flexGrow: 1, position: 'relative' }}>
        <Doughnut ref={chartRef} options={chartOptions} data={data} />
        {!customTooltip.data?.hideTooltip && (
          <LightTooltip style={customTooltip.styles}>
            <LightTooltipHeader>
              {customTooltip.data?.label} {customTooltip.data?.percentage}%
            </LightTooltipHeader>
            {customTooltip.data?.value && (
              <FormatBalance value={customTooltip.data.value} denomination={9} />
            )}
            {economics && customTooltip.data?.label === DataLabels.Others && (
              <OthersTooltipExtension {...economics} />
            )}
          </LightTooltip>
        )}
      </Box>
      <Stack style={{ minWidth: '33%' }} spacing={2}>
        <Box>
          {economics?.totalSupply && (
            <>
              <LegendTypographyHeader>Total Issuance</LegendTypographyHeader>
              <LegendTypographySubHeaders>
                <FormatBalance value={economics.totalSupply} denomination={9} />
              </LegendTypographySubHeaders>
            </>
          )}
        </Box>
        <Legend data={legendData} />
      </Stack>
    </Stack>
  );
};
export default TotalIssuanceDonutChart;
