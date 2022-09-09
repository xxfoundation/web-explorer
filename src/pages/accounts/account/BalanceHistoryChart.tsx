import {
  BalanceHistory,
  GetBalanceHistory,
  GET_BALANCE_HISTORY_BY_ID
} from '../../../schemas/accounts.schema';
import type { SeriesOptionsType, TooltipFormatterContextObject } from 'highcharts';
import type { DataPoint } from '../../../components/charts/highcharts';

import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import StepChart from '../../../components/charts/highcharts/StepChart';
import { formatBalance } from '../../../components/FormatBalance/formatter';
import { useQuery } from '@apollo/client';
import Loading from '../../../components/Loading';
import AreaChart from './AreaChart';

const ERAS_IN_A_MONTH = 30;
const ERAS_IN_A_WEEK = 7;

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y?.toString() ?? 0, { withUnit: ' XX' });
  return `Era: ${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const filterEra = (fromEra: number) => (b: BalanceHistory) => b.era >= fromEra;

const constructBalanceSeries = (
  era: number,
  timeframe: number,
  data?: BalanceHistory[]
): SeriesOptionsType[] => {
  if (!data) {
    return [];
  }
  const fromEra = Math.max(era - timeframe, 0);
  const history = Object.values(data)
    .filter(filterEra(fromEra));

  const mapByEra = (key: keyof BalanceHistory) => history.map((h) => [h.era, h[key]]);

  return [{
    type: 'area',
    name: 'Reserved',
    color: '#99e6ff',
    data: mapByEra('reserved')
  }, {
    type: 'area',
    name: 'Locked',
    color: '#66d9ff',
    data: mapByEra('locked')
  }, {
    type: 'area',
    name: 'Transferrable',
    color: '#33ccff',
    data: mapByEra('transferrable')
  }, {
    type: 'area',
    name: 'Bonded',
    color: '#00bfff',
    data: mapByEra('bonded')
  }, {
    type: 'area',
    name: 'Vesting',
    color: '#00a2d6',
    data: mapByEra('vesting')
  }, {
    type: 'area',
    name: 'Council',
    color: '#0086b3',
    data: mapByEra('council')
  }, {
    type: 'area',
    name: 'Democracy',
    color: '#006080',
    data: mapByEra('democracy')
  }];
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
  const series = useMemo(
    () => constructBalanceSeries(era, timeframe, balanceHistoryQuery?.data?.history),
    [era, timeframe, balanceHistoryQuery]
  );
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );

  if (balanceHistoryQuery.loading) {
    return <Loading />;
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
      <AreaChart
        xName='Era'
        series={series}
        tooltipFormatter={amountByEraTooltip}
        labelFormatters={{
          yAxis: (ctx) =>
            formatBalance(ctx.value?.toString() ?? 0, { withUnit: ' XX', precision: 0 })
        }}/>
    </>
  );
};

export default BalanceHistoryChart;
