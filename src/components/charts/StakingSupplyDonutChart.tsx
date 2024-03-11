import type { ChartJSOrUndefined, ChartProps } from 'react-chartjs-2/dist/types';

import React, { FC, useMemo, useRef } from 'react';
import { Economics, LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';

import { Doughnut } from 'react-chartjs-2';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { mapValues, pick } from 'lodash';
import { BN } from '@polkadot/util/bn';

import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';
import { LightTooltipHeader, LightTooltip } from '../Tooltips';
import useCustomTooltip from '../../hooks/useCustomTooltip';
import Error from '../Error';
import Loading from '../Loading';

enum DataLabels {
  Staked = 'Staked',
  Liquid = 'Liquid',
  Treasury = 'Treasury',
  Unbonding = 'Unbonding',
  InactiveStaked = 'Staked (inactive)'
}

type Data = {
  label: DataLabels;
  value: BN;
  percentage: string;
  color: string;
  hideTooltip?: boolean;
};

const fields: (keyof Economics)[] = ['staked', 'inactiveStaked', 'unbonding', 'stakeableSupply', 'liquid', 'treasury'];

export const extractChartData = (economics?: Economics) => {
  if (!economics) {
    return {
      legendData: [],
      data: {
        datasets: []
      }
    };
  }

  const { inactiveStaked, liquid, stakeableSupply, staked, treasury, unbonding } = mapValues(
    pick(economics, fields),
    (o) => new BN(o.toString())
  );

  const actualLiquid = liquid.sub(treasury);

  const roundNumber = (num: number, scale: number) =>
    Math.round(parseFloat(parseFloat(num + 'e+' + scale) + 'e-' + scale));

  const calculatePercentage = (n: BN) => {
    return roundNumber(n.muln(1e6).div(stakeableSupply).toNumber() / 1e4, 4).toString();
  };

  const serieA: Data[] = [
    {
      color: '#13EEF9',
      label: DataLabels.Liquid,
      value: actualLiquid,
      percentage: calculatePercentage(actualLiquid)
    },
    {
      color: '#C0C0C0',
      label: DataLabels.Treasury,
      value: treasury,
      percentage: calculatePercentage(treasury)
    },
    {
      color: '#59BD1C',
      label: DataLabels.Unbonding,
      value: unbonding,
      percentage: calculatePercentage(unbonding)
    },
    {
      color: '#FFC908',
      label: DataLabels.InactiveStaked,
      value: inactiveStaked,
      percentage: calculatePercentage(inactiveStaked)
    },
    {
      color: '#6F74FF',
      label: DataLabels.Staked,
      value: staked,
      percentage: calculatePercentage(staked)
    }
  ];

  const legendMapper = ({ color, label, percentage }: Data) => ({
    label: `${percentage}% ${label}`,
    color
  });

  const legendData = serieA.filter((s) => !s.hideTooltip).map(legendMapper);

  return {
    legendData,
    data: {
      datasets: [
        {
          backgroundColor: serieA.map((s) => s.color),
          data: serieA
        }
      ]
    }
  };
};
type Options = ChartProps<'doughnut'>['options'];

const StakingSupplyDonutChart: FC = () => {
  const subscription = useQuery<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
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
      }
    }),
    [customTooltip.plugin]
  );

  if (subscription.error) {
    return <Error type='data-unavailable' />;
  }

  if (subscription.loading) {
    return <Loading />;
  }

  return (
    <Stack cy-id='staking-supply-chart' direction='row' spacing={3} sx={{ flexGrow: 1 }}>
      <Box
        className='chart-container'
        style={{ width: '50%', flexShrink: 1, position: 'relative' }}
      >
        <Doughnut ref={chartRef} options={chartOptions} data={data} />
        <LightTooltip style={customTooltip.styles}>
          <LightTooltipHeader>
            {customTooltip.data?.label} | {customTooltip.data?.percentage}%
          </LightTooltipHeader>
          <Typography variant={'body1'}>
            {customTooltip.data?.value && <FormatBalance value={customTooltip.data.value} />}
          </Typography>
        </LightTooltip>
      </Box>
      <Stack style={{ minWidth: '33%' }} spacing={2}>
        {economics?.stakeableSupply && (
          <Box>
            <LegendTypographyHeader>Stakeable Supply</LegendTypographyHeader>
            <LegendTypographySubHeaders>
              <FormatBalance value={economics.stakeableSupply} price priceTooltip={true} withTooltip={false}/>
            </LegendTypographySubHeaders>
          </Box>
        )}
        <Legend data={legendData} />
      </Stack>
    </Stack>
  );
};

export default StakingSupplyDonutChart;
