import type { PluginChartOptions } from 'chart.js';
import type { ChartJSOrUndefined, ChartProps } from 'react-chartjs-2/dist/types';

import React, { CSSProperties, FC, useCallback, useMemo, useRef, useState } from 'react';
import { Doughnut }  from 'react-chartjs-2';
import { Box, Stack } from '@mui/material'
import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';
import { LightHeader, LightTooltip } from '../Tooltips';

const customDataSample = [
  { name: 'Staked', color: '#00A2D6', value: 52301, percentage: 5.2, id: 'stakeable' },
  { name: 'Liquid', color: '#6F74FF', value: 22145, percentage: 34, id: 'stakeable-team' },
  { name: 'Unbonding', color: '#59BD1C', value: 30156, percentage: 8, id: 'stakeable-foundation' },
];

const data: ChartProps<'doughnut'>['data'] = {
  labels: customDataSample.map((s) => s.name),
  datasets: [{
    backgroundColor: customDataSample.map((s) => s.color),
    data: customDataSample.map((s) => s.percentage)
  }],
};

type Options = ChartProps<'doughnut'>['options'];
type CustomTooltip = PluginChartOptions<'doughnut'>['plugins']['tooltip']['external'];

const StakingSupply: FC = () => {
  const chartRef = useRef<ChartJSOrUndefined<'doughnut', number[], unknown>>(null);
  const [tooltipStyles, setTooltipStyles] = useState<CSSProperties>({
    opacity: 1,
    left: 0,
    right: 0,
  });
  
  const legend = useMemo(() => customDataSample.map(({ color, name, percentage }) => ({
    label: `${percentage}% ${name}`,
    color,
  })), []);

  const customTooltip = useCallback<CustomTooltip>((context) => {
    if (context.tooltip.opacity == 0) {
      setTooltipStyles((styles) => ({ ...styles, opacity: 0 }));
      return;
    }

    const chart = chartRef.current;
    const canvas = chart?.canvas;
    if (canvas) {
      // enable tooltip visibilty
      setTooltipStyles((styles) => ({ ...styles, opacity: 1 }));

      // set position of tooltip
      const left = context.tooltip.x;
      const top = context.tooltip.y;

      // handle tooltip multiple rerender
      if (tooltipStyles?.top != top) {
        setTooltipStyles((styles) => ({ ...styles, top, left }));
      }
    }
  }, [tooltipStyles?.top])

  const chartOptions = useMemo<Options>(() => ({
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: customTooltip
      }
    }
  }), [customTooltip]);

  return (
    <Stack direction='row' spacing={3} sx={{ flexGrow: 1 }}>
      <Box className='chart-container' style={{  width: '50%', flexGrow: 1, position: 'relative' }}>
        <Doughnut ref={chartRef} options={chartOptions} data={data}/>
        <LightTooltip style={tooltipStyles}>
          <LightHeader>
            I have things here
          </LightHeader>
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
