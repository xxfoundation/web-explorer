import type { ChartJSOrUndefined, ChartProps } from 'react-chartjs-2/dist/types';

import React, { FC, useMemo, useRef } from 'react';
import { Economics, EconomicsAdjusted, LISTEN_FOR_ECONOMICS, adjustEconomics } from '../../schemas/economics.schema';

import { Doughnut } from 'react-chartjs-2';
import { Box, Grid, Stack, Typography } from '@mui/material';
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
  Unbonding = 'Unbonding',
  Locked = 'Locked',
  InactiveStaked = 'Staked (inactive)'
}

type Data = {
  label: DataLabels;
  value: BN;
  percentage: string;
  color: string;
  hideTooltip?: boolean;
};

const seriesKeys: (keyof EconomicsAdjusted)[] = [
  'staked',
  'inactiveStaked',
  'unbonding',
  'stakeableSupply',
  'liquid',
];

const keysCollapsedUnderOther: (keyof EconomicsAdjusted)[] = [
  'treasury',
  'bridge',
  'actualLiquid'
];

const tooltipHeaderWidth = 7;
const OthersTooltipExtension: FC<EconomicsAdjusted> = (economics) => (
  <Grid container sx={{ mt: 1, minWidth: '10rem', fontSize: '13px' }}>
    <Grid item xs={tooltipHeaderWidth}>
      Actual liquid &nbsp;
    </Grid>
    <Grid item>
      <FormatBalance value={economics.actualLiquid} />
    </Grid>
    <Grid item xs={tooltipHeaderWidth}>
      Treasury &nbsp;
    </Grid>
    <Grid item>
      <FormatBalance value={economics.treasury} />
    </Grid>
    <Grid item xs={tooltipHeaderWidth}>
      Bridge (WXX) &nbsp;
    </Grid>
    <Grid item>
      <FormatBalance value={economics.bridge} />
    </Grid>
  </Grid>
);

const extractChartData = (economics?: EconomicsAdjusted) => {
  if (!economics) {
    return {
      legendData: [],
      data: {
        datasets: []
      }
    };
  }

  const keysToConvert = seriesKeys.concat(keysCollapsedUnderOther)

  const converted = mapValues(
    pick(economics, keysToConvert),
    (o) => new BN(o.toString())
  );

  const { inactiveStaked, liquid, stakeableSupply, staked, unbonding } = converted;

  const locked = stakeableSupply.sub(liquid).sub(staked).sub(unbonding).sub(inactiveStaked);

  const roundNumber = (num: number, scale: number) =>
    Math.round(parseFloat(parseFloat(num + 'e+' + scale) + 'e-' + scale));

  const calculatePercentage = (n: BN) => {
    return roundNumber(n.muln(1e6).div(stakeableSupply).toNumber() / 1e4, 4).toString();
  };

  const serieA: Data[] = [
    {
      color: '#13EEF9',
      label: DataLabels.Liquid,
      value: liquid,
      percentage: calculatePercentage(liquid)
    },
    {
      color: '#C0C0C0',
      label: DataLabels.Locked,
      value: locked,
      percentage: calculatePercentage(locked)
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
  const economicsAdjusted = useMemo(() => economics && adjustEconomics(economics), [economics])

  const { data, legendData } = useMemo(() => extractChartData(economicsAdjusted), [economicsAdjusted]);

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
          {economicsAdjusted && customTooltip.data?.label === DataLabels.Liquid && (
            <OthersTooltipExtension {...economicsAdjusted} />
          )}
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
