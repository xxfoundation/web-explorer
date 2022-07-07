import { useSubscription } from '@apollo/client';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { LISTEN_FOR_NEW_ACCOUNTS, NewAccounts } from '../../../schemas/accounts.schema';
import DefaultTile from '../../DefaultTile';
import Loader from './Loader';

const NUM_LAST_ERAS = 60;

const NewAccountsChart = () => {
  const { data, loading } = useSubscription<NewAccounts>(LISTEN_FOR_NEW_ACCOUNTS);
  const chartData = useMemo(() => {
    let points: DataPoint[] = [];
    (data?.newAccount || []).forEach((elem) => {
      const idx = points.findIndex((era) => era[0] === elem.block.era);
      if (idx !== -1) {
        points[idx][1] += 1;
      } else {
        points.push([elem.block.era, 1]);
      }
    });
    points = points.slice(0, NUM_LAST_ERAS) as DataPoint[];
    const range = points[0]
      ? {
          minX: points[points.length - 1][0] - 2,
          maxX: points[0][0] + 2
        }
      : undefined;
    return { points, range };
  }, [data?.newAccount]);
  return (
    <DefaultTile header='new accounts' height='400px'>
      {loading || chartData.range === undefined ? (
        <Loader />
      ) : (
        <LineChart
          tooltipFormatter={amountByEraTooltip}
          data={chartData.points}
          x={chartData.range}
        />
      )}
    </DefaultTile>
  );
};

export default NewAccountsChart;
