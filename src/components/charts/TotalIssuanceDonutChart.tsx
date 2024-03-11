import type { FC } from 'react';
import type { Economics } from '../../schemas/economics.schema';
import type { ChartJSOrUndefined, ChartProps } from 'react-chartjs-2/dist/types';

import { useQuery } from '@apollo/client';
import React, { useRef, useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { pick, mapValues } from 'lodash';
import { BN } from '@polkadot/util/bn';

import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';
import { LightTooltipHeader, LightTooltip } from '../Tooltips';
import useCustomTooltip from '../../hooks/useCustomTooltip';
import { LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';
import Error from '../Error';
import Loading from '../Loading';

type Options = ChartProps<'doughnut'>['options'];

enum DataLabels {
  Circulating = 'Circulating',
  Vesting = 'Vesting',
  Rewards = 'Rewards',
  Others = 'Other',
  StakeableSupply = 'Stakeable',
  StakeableSupplyOther = 'Other'
}

type Data = {
  label: DataLabels;
  value: BN;
  percentage: string;
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
  'sales'
];

const tooltipHeaderWidth = 5;
const tooltipBalanceaWidth = 7;
const OthersTooltipExtension: FC<Economics> = (economics) => (
  <Grid container sx={{ mt: 1, minWidth: '10rem', fontSize: '12px' }}>
    <Grid item xs={tooltipHeaderWidth}>
      Canary &nbsp;
    </Grid>
    <Grid item xs={tooltipBalanceaWidth}>
      <FormatBalance value={economics.canary} />
    </Grid>
    <Grid item xs={tooltipHeaderWidth}>
      Sales &nbsp;
    </Grid>
    <Grid item xs={tooltipBalanceaWidth}>
      <FormatBalance value={economics.sales} />
    </Grid>
    <Grid item xs={tooltipHeaderWidth}>
      Claims &nbsp;
    </Grid>
    <Grid item xs={tooltipBalanceaWidth}>
      <FormatBalance value={economics.claims} />
    </Grid>
    <Grid item xs={tooltipHeaderWidth}>
      Bridge &nbsp;
    </Grid>
    <Grid item xs={tooltipBalanceaWidth}>
      <FormatBalance value={economics.bridge} />
    </Grid>
    <Grid item xs={tooltipHeaderWidth}>
      Custody &nbsp;
    </Grid>
    <Grid item xs={tooltipBalanceaWidth}>
      <FormatBalance value={economics.custody} />
    </Grid>
  </Grid>
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

  const keysToConvert = seriesKeys.concat(keysCollapsedUnderOther)
  
  const converted = mapValues(
    pick(economics, keysToConvert),
    (o) => new BN(o.toString())
  );

  const others = Object.values(pick(converted, keysCollapsedUnderOther)).reduce(
    (acc, cur) => acc.add(cur),
    new BN('0')
  );
  const { circulating, rewards, stakeableSupply, totalSupply, vesting } = converted;

  const roundNumber = (num: number, scale: number) =>
    Math.round(parseFloat(parseFloat(num + 'e+' + scale) + 'e-' + scale));

  const calculatePercentage = (n: BN) => {
    return roundNumber(n.muln(1e6).div(totalSupply).toNumber() / 1e4, 4).toString();
  };

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
      color: '#FFFFFF',
      label: DataLabels.StakeableSupplyOther,
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
  const subscription = useQuery<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
  const economics = subscription.data?.economics[0];

  const chartRef = useRef<ChartJSOrUndefined<'doughnut', Data[]>>(null);
  const customTooltip = useCustomTooltip(chartRef);
  const { data, legendData } = useMemo(() => extractChartData(economics), [economics]);

  const chartOptions = useMemo<Options>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
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
    return <Error type='data-unavailable' />;
  }

  if (subscription.loading) {
    return <Loading />;
  }

  return (
    <Stack direction='row' style={{ width: '100%' }} spacing={2}>
      <Box style={{ flexShrink: 1, flexGrow: 1, position: 'relative' }}>
        <Doughnut
          style={{ position: 'absolute', width: '100%', left: 0, top: 0 }}
          ref={chartRef}
          options={chartOptions}
          data={data}
        />
        {!customTooltip.data?.hideTooltip && (
          <LightTooltip style={customTooltip.styles}>
            <LightTooltipHeader>
              {customTooltip.data?.label} | {customTooltip.data?.percentage}%
            </LightTooltipHeader>
            <Typography variant={'body1'}>
              {customTooltip.data?.value && <FormatBalance value={customTooltip.data.value}/>}
            </Typography>
            {economics && customTooltip.data?.label === DataLabels.Others && (
              <OthersTooltipExtension {...economics} />
            )}
          </LightTooltip>
        )}
      </Box>
      <Stack style={{ minWidth: '33%' }} spacing={2}>
        {economics?.totalSupply && (
          <Box>
            <LegendTypographyHeader>Total Supply</LegendTypographyHeader>
            <LegendTypographySubHeaders>
              <FormatBalance value={economics.totalSupply} price priceTooltip={true} withTooltip={false}/>
            </LegendTypographySubHeaders>
          </Box>
        )}
        <Legend data={legendData} />
      </Stack>
    </Stack>
  );
};
export default TotalIssuanceDonutChart;
