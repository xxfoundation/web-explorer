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

const byBlockNumber = (a: Transfer, b: Transfer) => a.blockNumber - b.blockNumber;
const bySuccess = (t: Transfer) => t.success;
const filterByEra = (history: DataPoint[], fromEra: number) => {
  const index = history.findIndex((point) => point[0] >= fromEra);
  const sliced = history.slice(index);

  if (sliced[0][0] !== fromEra) {
    sliced.unshift([fromEra, history[index - 1]?.[1]]);
  }
  
  return sliced;
};

export const computeBalanceHistory = (
  { account, currentEra, transfers = [] }: Props,
  timeframeInEras: number,
): DataPoint[] => {
  const fromEra = Math.max(currentEra - timeframeInEras, 0);
  // uncomment when I have better ways to reconstruct initial balance
  // const initialBalance = transfers.reduce(
  //   (acc, transfer) => transfer.source === account.id
  //     ? acc + transfer.amount
  //     : acc - transfer.amount,
  //   account.totalBalance
  // );
  const initialBalance = 0;

  const history = transfers
    .filter(bySuccess)
    .sort(byBlockNumber)
    .reduce(
      (dataPoints, transfer) => {
        const last = dataPoints[dataPoints.length - 1];
        const newPoint: DataPoint =
          transfer.source === account.id
            ? [transfer.block.activeEra, last[1] - transfer.amount]
            : [transfer.block.activeEra, last[1] + transfer.amount];

        return last[0] === newPoint[0]
          ? dataPoints.slice(0, dataPoints.length - 1).concat([newPoint])
          : dataPoints.concat([newPoint]);
      },
      [[0, initialBalance]] as DataPoint[]
    );

  const filtered = filterByEra(history, fromEra);

  return [...filtered, [currentEra, account.totalBalance]];
};

type Props = {
  currentEra: number;
  account: Account;
  transfers?: TransferWithEra[];
};

const BalanceHistory: FC<Props> = (props) => {
  const [timeframe, setTimeframe] = useState(ERAS_IN_A_MONTH);
  const balanceHistory = useMemo(
    () => computeBalanceHistory(props, timeframe),
    [props, timeframe]
  );
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pr: 2, mb: 1 }}>
        <Typography sx={{ mt: 0.4 }}>Tranfer History (XX)</Typography>
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
