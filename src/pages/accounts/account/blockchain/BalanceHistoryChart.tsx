import type { Account } from '../../../../schemas/accounts.schema';
import type { TooltipFormatterContextObject } from 'highcharts';
import type { DataPoint } from '../../../../components/charts/highcharts';

import React, { FC, useMemo } from 'react';
import StepChart from '../../../../components/charts/highcharts/StepChart';
import { Transfer } from '../../../../schemas/transfers.schema';
import { formatBalance } from '../../../../components/FormatBalance/formatter';

type Props = {
  account: Account;
  transfers: Transfer[];
}

function amountByEraTooltip(this: TooltipFormatterContextObject) {
  const result = formatBalance(this.y ?? 0, { decimals: 0, withUnit: ' XX' });
  return `${this.x}<br /><b>${this.series.name} ${result}</b>`;
}

const byBlockNumber = (a: Transfer, b: Transfer) => b.blockNumber - a.blockNumber;
const bySuccess = (t: Transfer) => t.success;

const computeBalanceHistory = ({ account, transfers }: Props): DataPoint[] => {
  return transfers
    .filter(bySuccess)
    .sort(byBlockNumber)
    .reduce((dataPoints, transfer) => {
    const first = dataPoints[0];
    const newPoint: DataPoint = transfer.source === account.id
      ? [transfer.blockNumber, first[1] - transfer.amount]
      : [transfer.blockNumber, first[1] + transfer.amount]

    return [newPoint].concat(dataPoints);
  }, [[account.blockHeight, account.totalBalance]] as DataPoint[]);
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
    />
  );
}

export default BalanceHistory;
