import type { TFunction } from 'i18next';
import type { SeriesOptionsType, TooltipFormatterContextObject } from 'highcharts';

import {
  BalanceHistory,
  GetBalanceHistory,
  GET_BALANCE_HISTORY_BY_ID
} from '../../../schemas/accounts.schema';

import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { formatBalance } from '../../../components/FormatBalance/formatter';
import { useQuery } from '@apollo/client';
import Loading from '../../../components/Loading';
import AreaChart from './AreaChart';
import CustomTooltip from '../../../components/Tooltip';
import { InfoOutlined } from '@mui/icons-material';
import { useToggle } from '../../../hooks';
import { useTranslation } from 'react-i18next';

const ERAS_IN_A_MONTH = 30;
const ERAS_IN_A_WEEK = 7;

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y?.toString() ?? 0, { withUnit: ' XX' });
  return `Era: ${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const filterEra = (fromEra: number) => (b: BalanceHistory) => b.era >= fromEra;

const constructBalanceSeries = (
  t: TFunction,
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
    name: t('Transferrable') ?? '',
    color: '#59BD1C',
    data: mapByEra('transferrable')
  }, {
    type: 'area',
    name: t('Locked') ?? '',
    color: '#6F74FF',
    data: mapByEra('locked')
  }, {
    type: 'area',
    name: t('Reserved') ?? '',
    color: '#004d66',
    data: mapByEra('reserved')
  }];
};

const constructLockedBalanceSeries = (
  t: TFunction,
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
    name: t('Vesting') ?? '',
    color: '#FF5000',
    stack: 0,
    data: mapByEra('vesting')
  }, {
    type: 'area',
    name: t('Unbonding') ?? '',
    color: '#13EEF9',
    stack: 1,
    data: mapByEra('unbonding')
  }, {
    type: 'area',
    name: t('Bonded') ?? '',
    color: '#00A2D6',
    stack: 2,
    data: mapByEra('bonded')
  }, {
    type: 'area',
    name: t('Democracy') ?? '',
    color: '#FFC908',
    stack: 3,
    data: mapByEra('democracy')
  }, {
    type: 'area',
    name: t('Council') ?? '',
    color: '#C0C0C0',
    stack: 4,
    data: mapByEra('council')
  }];
};

type Props = {
  accountId: string;
  era: number;
};

const BalanceHistoryChart: FC<Props> = ({ accountId, era }) => {
  const { t } = useTranslation();
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
    () => constructBalanceSeries(t, era, timeframe, balanceHistoryQuery?.data?.history),
    [t, era, timeframe, balanceHistoryQuery]
  );
  const lockedSeries = useMemo(
    () => constructLockedBalanceSeries(t, era, timeframe, balanceHistoryQuery?.data?.history),
    [t, era, timeframe, balanceHistoryQuery]
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
          <Typography sx={{ mt: 0.4 }}>{t('Total Balance')}</Typography>
          <CustomTooltip title={t('This is a stacked chart, displaying the different balance categories, adding up to the total balance of the account.')}>
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
            label={t('Timeframe')}
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
        <Typography sx={{ mt: 0.4 }}>{t(' Locked Balance ')}</Typography>
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
