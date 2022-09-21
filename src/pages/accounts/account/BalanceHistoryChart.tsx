import {
  BalanceHistory,
  GetBalanceHistory,
  GET_BALANCE_HISTORY_BY_ID
} from '../../../schemas/accounts.schema';
import { amountByEraTooltip, DataPoint } from '../../../components/charts/highcharts';

import React, { FC, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import StepChart from '../../../components/charts/highcharts/StepChart';
import { formatBalance } from '../../../components/FormatBalance/formatter';
import { useQuery } from '@apollo/client';
import Loading from '../../../components/Loading';
import TimeframesDropdown from '../../../components/TimeframesDropdown';

const filterEra = (fromEra: number) => (b: BalanceHistory) => b.era >= fromEra;

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
  const [timeframe, setTimeframe] = useState<number>();
  const balanceHistoryQuery = useQuery<GetBalanceHistory>(GET_BALANCE_HISTORY_BY_ID, {
    variables: { accountId }
  });
  const totalBalanceHistory = useMemo(
    () => computeBalanceHistory(era, timeframe ?? 0, balanceHistoryQuery?.data?.history),
    [era, timeframe, balanceHistoryQuery]
  );

  if (balanceHistoryQuery.loading) {
    return <Loading />;
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pr: 2, mb: 1 }}>
        <Typography sx={{ mt: 0.4 }}>Balance (XX)</Typography>
        <TimeframesDropdown onChange={setTimeframe} value={timeframe} />
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
