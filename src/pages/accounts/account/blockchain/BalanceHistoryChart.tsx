import type { Account } from '../../../../schemas/accounts.schema';
import type { TooltipFormatterContextObject } from 'highcharts';
import type { DataPoint } from '../../../../components/charts/highcharts';

import React, { FC, useMemo } from 'react';
import StepChart from '../../../../components/charts/highcharts/StepChart';
import { Transfer } from '../../../../schemas/transfers.schema';
import { formatBalance } from '../../../../components/FormatBalance/formatter';

const DEFAULT_AMOUNT_OF_BLOCKS = 432000; 

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y?.toString() ?? 0, { withUnit: ' XX' });
  return `Era ${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const byBlockNumber = (a: Transfer, b: Transfer) => b.blockNumber - a.blockNumber;
const bySuccess = (t: Transfer) => t.success;
const filterBlockHeight = (fromBlock: number) => (t: Transfer) => t.blockNumber > fromBlock; 

const computeBalanceHistory = ({ account, transfers = [] }: Props): DataPoint[] => {
  const fromBlock = Math.max(account.blockHeight - DEFAULT_AMOUNT_OF_BLOCKS, 0);

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
  const balanceHistory = useMemo(() => computeBalanceHistory(props), [props]);

  return (
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
  );
}

export default BalanceHistory;
