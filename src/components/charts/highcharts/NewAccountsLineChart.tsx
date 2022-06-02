import { useSubscription } from '@apollo/client';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { LISTEN_FOR_NEW_ACCOUNTS } from '../../../schemas/accounts.schema';
import DefaultTile from '../../DefaultTile';
import Loader from './Loader';

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
    <DefaultTile header='new accounts' height='400px'>
      {loading ? (
        <Loader />
      ) : (
        <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} x={xRange} />
      )}
    </DefaultTile>
  );
};

export default NewAccountsChart;
