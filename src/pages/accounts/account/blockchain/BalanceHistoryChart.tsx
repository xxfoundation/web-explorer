import type { Account } from '../../../../schemas/accounts.schema';
import type { Transfer, TransferWithEra } from '../../../../schemas/transfers.schema';
import type { TooltipFormatterContextObject } from 'highcharts';
import type { DataPoint } from '../../../../components/charts/highcharts';

import React, { FC, useCallback, useMemo, useState } from 'react';
import { Box, FormControl, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import StepChart from '../../../../components/charts/highcharts/StepChart';
import { formatBalance } from '../../../../components/FormatBalance/formatter';

const ERAS_IN_A_MONTH = 30;
const ERAS_IN_A_WEEK = ERAS_IN_A_MONTH / 4;
const ERAS_ALL_TIME = Number.MAX_VALUE;

const timeframes: Record<string, number> = {
  Month: ERAS_IN_A_MONTH,
  Week: ERAS_IN_A_WEEK,
  All: ERAS_ALL_TIME
};

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y?.toString() ?? 0, { withUnit: ' XX' });
  return `Era: ${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const byBlockNumber = (a: Transfer, b: Transfer) => b.blockNumber - a.blockNumber;
const bySuccess = (t: Transfer) => t.success;
const filterByEra = (era: number) => (t: TransferWithEra) => t.block.activeEra > era;

export const computeBalanceHistory = (
  { account, currentEra, transfers = [] }: Props,
  timeframe: number,
): DataPoint[] => {
  const fromEra = Math.max(currentEra - timeframe, 0);

  const history = transfers
    .filter(bySuccess)
    .filter(filterByEra(fromEra))
    .sort(byBlockNumber)
    .reduce(
      (dataPoints, transfer) => {
        const first = dataPoints[0] || [currentEra, account.totalBalance];
        const newPoint: DataPoint =
          transfer.source === account.id
            ? [transfer.block.activeEra, first[1] - transfer.amount]
            : [transfer.block.activeEra, first[1] + transfer.amount];

        return [newPoint].concat(dataPoints);
      },
      [] as DataPoint[]
    );

  return [[fromEra, history[0][1]], ...history];
};

type Props = {
  currentEra: number;
  account: Account;
  transfers?: TransferWithEra[];
};

const BalanceHistory: FC<Props> = (props) => {
  const [timeframe, setTimeframe] = useState(ERAS_IN_A_MONTH);
  const balanceHistory = useMemo(() => computeBalanceHistory(props, timeframe), [props, timeframe]);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );

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
        seriesName='TOTAL BALANCE'
        xName='Era'
        data={balanceHistory}
        tooltipFormatter={amountByEraTooltip}
        labelFormatters={{
          yAxis: (ctx) =>
            formatBalance(ctx.value?.toString() ?? 0, { withUnit: ' XX', precision: 0 })
        }}
      />
    </>
  );
};

export default BalanceHistory;
