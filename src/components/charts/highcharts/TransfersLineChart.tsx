import { useQuery } from '@apollo/client';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { ListenForEraTransfers, LISTEN_FOR_ERA_TRANSFERS } from '../../../schemas/transfers.schema';
import DefaultTile from '../../DefaultTile';
import Loader from './Loader';

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

const TransfersLineChart = () => {
  const { data, loading } = useQuery<ListenForEraTransfers>(LISTEN_FOR_ERA_TRANSFERS);
  const timeframes: Record<string, number> = {
    All: 0,
    Quarter: ERAS_IN_A_QUARTER,
    Month: ERAS_IN_A_MONTH
  };
  const [timeframe, setTimeframe] = useState(ERAS_IN_A_MONTH);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );
  const chartData: DataPoint[] = useMemo(
    () =>
      (data?.eraTransfers || [])
        .slice()
        .sort((a, b) => a.era - b.era)
        .map((item) => [item.era, item.transfers], [data?.eraTransfers])
        .slice(-timeframe) as DataPoint[],
    [data?.eraTransfers, timeframe]
  );
  return (
    <DefaultTile header='Transfers' height='435px'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'right', pr: 2 }}>
            <FormControl variant='standard'>
              <Select
                labelId='timeframe-label'
                id='timeframe-select'
                value={timeframe}
                label='Timeframe'
                onChange={onChange}
              >
                {Object.entries(timeframes).map(([label, time]) => (
                  <MenuItem value={time} key={time}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} />
        </>
      )}
    </DefaultTile>
  );
};

export default TransfersLineChart;
