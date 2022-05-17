import React, { useMemo } from 'react';
import { Doughnut, ChartProps }  from 'react-chartjs-2';
import { Box, Stack } from '@mui/material'
import Legend from './Legend';
import { LegendTypographyHeader, LegendTypographySubHeaders } from '../typographies';
import FormatBalance from '../FormatBalance';

const sampleCustomData = [
  { name: 'circulation', color: '#13EEF9', value: 162301, percentage: 6, title: true, id: 'stakeable' },
  { name: 'vesting',  color: '#00A2D6', value: 80156, percentage: 49, id: 'stakeable-foundation' },
  { name: 'rewards', color: '#6F74FF', value: 162301, percentage: 39, title: true, id: 'unstakeable' },
  { name: 'others', color: '#59BD1C', value: 82145, percentage: 6, id: 'unstakeable-team' }
];

const data: ChartProps<'doughnut'>['data'] = {
  labels: sampleCustomData.map((s) => s.name),
  datasets: [{
    backgroundColor: sampleCustomData.map((s) => s.color),
    data: sampleCustomData.map((s) => s.percentage)
  }, {
    backgroundColor: ['#FFC908', '#EAEAEA'],
    data: [10, 90]
  }],
};

const TotalIssuance = () => {
  const legend = useMemo(() => sampleCustomData.map(({ color, name, percentage }) => ({
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
            Total Issuance
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
export default TotalIssuance;
