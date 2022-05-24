import type { ChartJSOrUndefined, ChartProps } from 'react-chartjs-2/dist/types';

import React, { FC, useMemo, useRef } from 'react';
import { Doughnut }  from 'react-chartjs-2';
import { Box, Stack } from '@mui/material'
import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';
import { LightTooltipHeader, LightTooltip } from '../Tooltips';
import useCustomTooltip from '../../hooks/useCustomTooltip';

const data = {
  labels: ['Staked', 'Liquid', 'Unbonding'],
  datasets: [{
    label: 'Percentage',
    backgroundColor: [
      '#00A2D6',
      '#6F74FF',
      '#59BD1C'
    ],
    data: [5.2, 34, 8]
  }],
};

type Options = ChartProps<'doughnut'>['options'];

const StakingSupply: FC = () => {
  const chartRef = useRef<ChartJSOrUndefined<'doughnut', number[], unknown>>(null);
  const customTooltip = useCustomTooltip(chartRef);

  const legend = useMemo(() => data.datasets[0].data.map((percentage, index) => ({
    label: `${percentage}% ${data.labels[index]}`,
    color: data.datasets[0]?.backgroundColor[index],
  })), []);

  const chartOptions = useMemo<Options>(() => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: customTooltip.plugin
    }
  }), [customTooltip.plugin]);

  return (
    <Stack direction='row' spacing={3} sx={{ flexGrow: 1 }}>
      <Box className='chart-container' style={{  width: '50%', flexGrow: 1, position: 'relative' }}>
        <Doughnut ref={chartRef} options={chartOptions} data={data}/>
        <LightTooltip style={customTooltip.styles}>
          <LightTooltipHeader>
            {customTooltip.label} {customTooltip.value}%
          </LightTooltipHeader>
        </LightTooltip>
      </Box>
      <Stack
        style={{ minWidth: '33%' }}
        spacing={2}>
        <Box>
          <LegendTypographyHeader>
            Staking Supply
          </LegendTypographyHeader>
          <LegendTypographySubHeaders>
            <FormatBalance value='118716570' />
          </LegendTypographySubHeaders>
        </Box>
        <Legend data={legend} />
      </Stack>
    </Stack>
  );
}

export default StakingSupply;
