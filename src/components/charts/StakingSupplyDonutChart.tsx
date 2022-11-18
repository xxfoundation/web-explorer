import type { ChartJSOrUndefined, ChartProps } from 'react-chartjs-2/dist/types';
import type { TFunction } from 'i18next';

import React, { FC, useMemo, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Box, Stack, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { mapValues, pick } from 'lodash';
import { BN } from '@polkadot/util/bn';
import { useTranslation } from 'react-i18next';

import { Economics, LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';
import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';
import { LightTooltipHeader, LightTooltip } from '../Tooltips';
import useCustomTooltip from '../../hooks/useCustomTooltip';
import Error from '../Error';
import Loading from '../Loading';

type Data = {
  label: string;
  value: BN;
  percentage: string;
  color: string;
  hideTooltip?: boolean;
};

const fields: (keyof Economics)[] = ['staked', 'inactiveStaked', 'unbonding', 'stakeableSupply', 'liquid'];

export const extractChartData = (t: TFunction, economics?: Economics) => {
  if (!economics) {
    return {
      legendData: [],
      data: {
        datasets: []
      }
    };
  }

  const { inactiveStaked, liquid, stakeableSupply, staked, unbonding } = mapValues(
    pick(economics, fields),
    (o) => new BN(o.toString())
  );

  const vesting = stakeableSupply.sub(staked).sub(unbonding).sub(liquid).sub(inactiveStaked);

  const roundNumber = (num: number, scale: number) =>
    Math.round(parseFloat(parseFloat(num + 'e+' + scale) + 'e-' + scale));

  const calculatePercentage = (n: BN) => {
    return roundNumber(n.muln(1e6).div(stakeableSupply).toNumber() / 1e4, 4).toString();
  };

  const serieA: Data[] = [
    {
      color: '#13EEF9',
      label: t('Liquid'),
      value: liquid,
      percentage: calculatePercentage(liquid)
    },
    {
      color: '#00A2D6',
      label: t('Vesting'),
      value: vesting,
      percentage: calculatePercentage(vesting)
    },
    {
      color: '#6F74FF',
      label: t('Staked'),
      value: staked,
      percentage: calculatePercentage(staked)
    },
    {
      color: '#C0C0C0',
      label: t('Staked (inactive)'),
      value: inactiveStaked,
      percentage: calculatePercentage(inactiveStaked)
    },
    {
      color: '#59BD1C',
      label: t('Unbonding'),
      value: unbonding,
      percentage: calculatePercentage(unbonding)
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
  const { t } = useTranslation();
  const subscription = useQuery<{ economics: [Economics] }>(LISTEN_FOR_ECONOMICS);
  const economics = subscription.data?.economics[0];
  const chartRef = useRef<ChartJSOrUndefined<'doughnut', Data[]>>(null);
  const customTooltip = useCustomTooltip(chartRef);

  const { data, legendData } = useMemo(
    () => extractChartData(t, economics),
    [economics, t]
  );

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
    <Stack direction='row' spacing={3} sx={{ flexGrow: 1 }}>
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
            <LegendTypographyHeader>
              {t('Stakeable Supply')}
            </LegendTypographyHeader>
            <LegendTypographySubHeaders>
              <FormatBalance value={economics.stakeableSupply} />
            </LegendTypographySubHeaders>
          </Box>
        )}
        <Legend data={legendData} />
      </Stack>
    </Stack>
  );
};

export default StakingSupplyDonutChart;
