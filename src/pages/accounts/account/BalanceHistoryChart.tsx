import {
  BalanceHistory,
  GetBalanceHistory,
  GET_BALANCE_HISTORY_BY_ID
} from '../../../schemas/accounts.schema';
import type { SeriesOptionsType, TooltipFormatterContextObject } from 'highcharts';

import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { formatBalance } from '../../../components/FormatBalance/formatter';
import { useQuery } from '@apollo/client';
import Loading from '../../../components/Loading';
import AreaChart from './AreaChart';
import CustomTooltip from '../../../components/Tooltip';
import { InfoOutlined } from '@mui/icons-material';
import { useToggle } from '../../../hooks';

const ERAS_IN_A_MONTH = 30;
const ERAS_IN_A_WEEK = 7;

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y?.toString() ?? 0, { withUnit: ' XX' });
  return `Era: ${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const filterEra = (fromEra: number) => (b: BalanceHistory) => b.era >= fromEra;
const fixBalanceOverlaps = (b: BalanceHistory): BalanceHistory => ({
  ...b
  // vesting: b.locked - b.unbonding - b.bonded - b.democracy - b.council,
  // bonded: b.locked - b.vesting - b.unbonding - b.democracy - b.council,
  // unbonding: b.locked - b.vesting - b.bonded - b.democracy - b.council,
  // democracy: b.locked - b.vesting - b.unbonding - b.bonded - b.council,
  // council: b.locked - b.vesting - b.unbonding - b.bonded - b.democracy

});

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
    .filter(filterEra(fromEra))
    .map(fixBalanceOverlaps);

  const mapByEra = (key: keyof BalanceHistory) => history.map((h) => [h.era, h[key]]);

  return [{
    type: 'area',
    name: 'Transferrable',
    color: '#59BD1C',
    data: mapByEra('transferrable')
  }, {
    type: 'area',
    name: 'Locked',
    color: '#6F74FF',
    data: mapByEra('locked')
  }, {
    type: 'area',
    name: 'Reserved',
    color: '#004d66',
    data: mapByEra('reserved')
  }];
};

const constructLockedBalanceSeries = (
  era: number,
  timeframe: number,
  data?: BalanceHistory[]
): SeriesOptionsType[] => {
  if (!data) {
    return [];
  }
  const fromEra = Math.max(era - timeframe, 0);
  const history = Object.values(data)
    .filter(filterEra(fromEra))
    .map(fixBalanceOverlaps);

  const mapByEra = (key: keyof BalanceHistory) => history.map((h) => [h.era, h[key]]);

  return [{
    type: 'area',
    name: 'Vesting',
    color: '#FF5000',
    data: mapByEra('vesting')
  }, {
    type: 'area',
    name: 'Unbonding',
    color: '#13EEF9',
    data: mapByEra('unbonding')
  }, {
    type: 'area',
    name: 'Bonded',
    color: '#00A2D6',
    data: mapByEra('bonded')
  }, {
    type: 'area',
    name: 'Democracy',
    color: '#FFC908',
    data: mapByEra('democracy')
  }, {
    type: 'area',
    name: 'Council',
    color: '#C0C0C0',
    data: mapByEra('council')
  }];
};

type Props = {
  accountId: string;
  era: number;
};

const BalanceHistoryChart: FC<Props> = ({ accountId, era }) => {
  const [expandLockedChart, lockedChart] = useToggle();
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
  const lockedSeries = useMemo(
    () => constructLockedBalanceSeries(era, timeframe, balanceHistoryQuery?.data?.history),
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
        <Stack direction='row'>
          <Typography sx={{ mt: 0.4 }}>Total Balance</Typography>
          <CustomTooltip title='This is a stacked chart, displaying the different balance categories, adding up to the total balance of the account.'>
            <InfoOutlined
              style={{ position: 'relative', top: '0.4em', paddingLeft: '0.25em', zIndex: 2, fontSize: '1em' }}
            />
          </CustomTooltip>
        </Stack>
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
      <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '2em', marginBottom: '0.5em'}}>
        <Typography sx={{ mt: 0.4 }}> Locked Balance </Typography>
        <Button sx={{ minWidth: 0 }} size='small' onClick={lockedChart.toggle}>
          {lockedChart.icon}
        </Button>
      </Box>
      {expandLockedChart && 
      <AreaChart
        xName='Era'
        series={lockedSeries}
        tooltipFormatter={amountByEraTooltip}
        labelFormatters={{
          yAxis: (ctx) =>
            formatBalance(ctx.value?.toString() ?? 0, { withUnit: ' XX', precision: 0 })
        }}/>}
    </>
  );
};

export default BalanceHistoryChart;
