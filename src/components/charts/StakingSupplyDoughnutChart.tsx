import React, { FC, useMemo } from 'react';
import { Doughnut, ChartProps }  from 'react-chartjs-2';
import { Box, Stack } from '@mui/material'
import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';

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

const StakingSupply: FC = () => {
  const legend = useMemo(() => customDataSample.map(({ color, name, percentage }) => ({
    label: `${percentage}% ${name}`,
    color,
  })), []);

  return (
    <Stack direction='row' spacing={3} sx={{ flexGrow: 1 }}>
      <Box className='chart-container' style={{  width: '50%', flexGrow: 1 }}>
        <Doughnut options={{ maintainAspectRatio: false, responsive: true }} data={data}/>
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
