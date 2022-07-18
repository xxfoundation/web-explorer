import {
  BalanceHistory,
  GetBalanceHistory,
  GET_BALANCE_HISTORY_BY_ID
} from '../../../schemas/accounts.schema';
import type { TooltipFormatterContextObject } from 'highcharts';
import type { DataPoint } from '../../../components/charts/highcharts';

import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import StepChart from '../../../components/charts/highcharts/StepChart';
import { formatBalance } from '../../../components/FormatBalance/formatter';
import { useQuery } from '@apollo/client';
import Loader from '../../../components/charts/highcharts/Loader';

const ERAS_IN_A_MONTH = 30;
const ERAS_IN_A_WEEK = 7;

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y?.toString() ?? 0, { withUnit: ' XX' });
  return `Era: ${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const filterEra = (fromEra: number) => (b: BalanceHistory) => b.era > fromEra;

const computeBalanceHistory = (
  era: number,
  timeframe: number,
  data?: BalanceHistory[]
): DataPoint[] => {
  if (!data) {
    return [];
  }
  const fromEra = Math.max(era - timeframe, 0);
  const history = Object.values(data)
    .filter(filterEra(fromEra))
    .map((elem) => [elem.era, elem.totalBalance] as DataPoint);
  return history;
};

type Props = {
  accountId: string;
  era: number;
};

const BalanceHistoryChart: FC<Props> = ({ accountId, era }) => {
  const timeframes: Record<string, number> = {
    All: era,
    Month: ERAS_IN_A_MONTH,
    Week: ERAS_IN_A_WEEK
  };
  const [timeframe, setTimeframe] = useState(ERAS_IN_A_MONTH);
  const balanceHistoryQuery = useQuery<GetBalanceHistory>(GET_BALANCE_HISTORY_BY_ID, {
    variables: { accountId }
  });
  const totalBalanceHistory = useMemo(
    () => computeBalanceHistory(era, timeframe, balanceHistoryQuery?.data?.history),
    [era, timeframe, balanceHistoryQuery]
  );
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );

  if (balanceHistoryQuery.loading) {
    return <Loader />;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pr: 2, mb: 1 }}>
        <Typography sx={{ mt: 0.4 }}>Balance (XX)</Typography>
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
      <StepChart
        seriesName='Total Balance'
        xName='Era'
        data={totalBalanceHistory}
        tooltipFormatter={amountByEraTooltip}
        labelFormatters={{
          yAxis: (ctx) =>
            formatBalance(ctx.value?.toString() ?? 0, { withUnit: ' XX', precision: 0 })
        }}
      />
    </>
  );
};

export default BalanceHistoryChart;
