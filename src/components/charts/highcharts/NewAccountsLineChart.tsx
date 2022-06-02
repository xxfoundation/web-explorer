import { useSubscription } from '@apollo/client';
import { Box, CircularProgress } from '@mui/material';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { LISTEN_FOR_NEW_ACCOUNTS } from '../../../schemas/accounts.schema';
import ChartWrap from '../ChartWrap';

//TODO get a month 30eras
const NewAccountsChart = () => {
  const { data, loading } = useSubscription<{ new_accounts: { accounts: number; era: number }[] }>(
    LISTEN_FOR_NEW_ACCOUNTS
  );

  const chartData: DataPoint[] = useMemo(() => {
    return (data?.new_accounts || []).map(
      (item) => [item.era, item.accounts],
      [data?.new_accounts]
    );
  }, [data?.new_accounts]);
  const xRange = useMemo(
    () =>
      data?.new_accounts && data.new_accounts.length
        ? {
            minX: data.new_accounts[0].era - 2,
            maxX:
              (data.new_accounts[data.new_accounts.length - 1].era
                ? data.new_accounts[data.new_accounts.length - 1].era
                : data.new_accounts[0].era) + 2
          }
        : undefined,
    [data?.new_accounts]
  );
  return (
    <ChartWrap title='New Accounts'>
      {loading ? (
        <Box
          sx={{ height: '400px', justifyContent: 'center', alignItems: 'center', display: 'flex' }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} x={xRange} />
      )}
    </ChartWrap>
  );
};

export default NewAccountsChart;
