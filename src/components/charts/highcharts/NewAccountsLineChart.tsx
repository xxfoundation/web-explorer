import type { DataPoint } from '.';
import type { SeriesClickEventObject } from 'highcharts';

import { useQuery } from '@apollo/client';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { amountByEraTooltip, LineChart } from '.';
import { CreatedEras, GET_WHEN_CREATED_ERAS } from '../../../schemas/accounts.schema';
import DefaultTile from '../../DefaultTile';
import Loading from '../../Loading';

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

const NewAccountsChart = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<CreatedEras>(GET_WHEN_CREATED_ERAS);
  const newAccounts = data?.account;
  const latestEra = data?.history[0].latestEra || 999;
  const timeframes: Record<string, number> = {
    All: latestEra,
    Quarter: ERAS_IN_A_QUARTER,
    Month: ERAS_IN_A_MONTH
  };
  const [timeframe, setTimeframe] = useState(ERAS_IN_A_MONTH);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );

  const eraRange: { start: number; end: number } = useMemo(() => {
    return { start: Math.max(latestEra - timeframe, 0), end: latestEra };
  }, [latestEra, timeframe]);

  const chartData = useMemo(() => {
    const counter: { [era: number]: number } = {};

    newAccounts?.forEach(({ era }) => {
      counter[era] = (counter[era] || 0) + 1;
    });

    // Initialize to 0 eras with no new accounts
    for (let i = latestEra; i >= 0; i--) {
      if (!(i in counter)) {
        counter[i] = 0;
      }
    }
    return Object.entries(counter).map(([k, v]) => [parseInt(k), v] as DataPoint);
  }, [latestEra, newAccounts]);

  const onClick = useCallback((evt: SeriesClickEventObject) => {
    navigate(`/accounts?era=${evt.point.options.x}`);
  }, [navigate]);

  const dataRange = useMemo(() => chartData.slice(eraRange.start, eraRange.end), [chartData, eraRange.end, eraRange.start])

  return (
    <DefaultTile header='new accounts' height='435px'>
      {loading || !chartData || !latestEra ? (
        <Loading />
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
          <LineChart
            data={dataRange}
            onClick={onClick}
            tooltipFormatter={amountByEraTooltip}
          />
        </>
      )}
    </DefaultTile>
  );
};

export default NewAccountsChart;
