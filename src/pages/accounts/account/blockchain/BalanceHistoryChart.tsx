import type { Account } from '../../../../schemas/accounts.schema';
import type { TooltipFormatterContextObject } from 'highcharts';
import type { DataPoint } from '../../../../components/charts/highcharts';

import React, { FC, useMemo, useState } from 'react';
import { Box, FormControl, MenuItem,  Select } from '@mui/material';
import StepChart from '../../../../components/charts/highcharts/StepChart';
import { Transfer } from '../../../../schemas/transfers.schema';
import { formatBalance } from '../../../../components/FormatBalance/formatter';

const BLOCKS_IN_A_MONTH = 432000;
const BLOCKS_IN_A_WEEK = BLOCKS_IN_A_MONTH / 4;
const BLOCKS_IN_A_DAY = BLOCKS_IN_A_MONTH / 30;

const timeframes: Record<string, number> = {
  Month: BLOCKS_IN_A_MONTH,
  Week: BLOCKS_IN_A_WEEK,
  Day: BLOCKS_IN_A_DAY
}

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y?.toString() ?? 0, { withUnit: ' XX' });
  return `Block: ${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const byBlockNumber = (a: Transfer, b: Transfer) => b.blockNumber - a.blockNumber;
const bySuccess = (t: Transfer) => t.success;
const filterBlockHeight = (fromBlock: number) => (t: Transfer) => t.blockNumber > fromBlock; 

const computeBalanceHistory = ({ account, transfers = [] }: Props, timeframe: number): DataPoint[] => {
  const fromBlock = Math.max(account.blockHeight - timeframe, 0);

  const history = transfers
    .filter(bySuccess)
    .filter(filterBlockHeight(fromBlock))
    .sort(byBlockNumber)
    .reduce((dataPoints, transfer) => {
    const first = dataPoints[0];
    const newPoint: DataPoint = transfer.source === account.id
      ? [transfer.blockNumber, first[1] - transfer.amount]
      : [transfer.blockNumber, first[1] + transfer.amount]

    return [newPoint].concat(dataPoints);
  }, [[account.blockHeight, account.totalBalance]] as DataPoint[]);

  return [[fromBlock, history[0][1]], ...history];
}

type Props = {
  account: Account;
  transfers?: Transfer[];
}

const BalanceHistory: FC<Props>  = (props) => {
  const [timeframe, setTimeframe] = useState(BLOCKS_IN_A_MONTH);
  const balanceHistory = useMemo(() => computeBalanceHistory(props, timeframe), [props, timeframe]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 2, mb: -2 }}>
        <FormControl variant='standard' sx={{ mb: 2, float: 'right' }}>
          <Select
            labelId='timeframe-label'
            id='timeframe-select'
            value={timeframe}
            label='Timeframe'
            onChange={({ target }) => setTimeframe(Number(target.value))}
          >
            {Object.entries(timeframes).map(([label, time]) => (
              <MenuItem value={time}>{label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <StepChart
        seriesName='TOTAL BALANCE'
        xName='Block'
        yName='Balance (XX)'
        data={balanceHistory}
        tooltipFormatter={amountByEraTooltip}
        labelFormatters={{
          yAxis: (ctx) => formatBalance(ctx.value?.toString() ?? 0, { withUnit: ' XX' })
        }}
      />
    </>
  );
}

export default BalanceHistory;
