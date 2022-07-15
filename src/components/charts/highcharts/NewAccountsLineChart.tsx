import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { LISTEN_FOR_NEW_ACCOUNTS, NewAccounts } from '../../../schemas/accounts.schema';
import DefaultTile from '../../DefaultTile';
import Loader from './Loader';

const NUM_LAST_ERAS = 60;

const NewAccountsChart = () => {
  const { data, loading } = useQuery<NewAccounts>(LISTEN_FOR_NEW_ACCOUNTS);
  const chartData = useMemo(() => {
    let points: DataPoint[] = [];
    let auxEra = 0;

    (data?.newAccount || []).forEach((elem) => {
      // Initialize to 0 eras not in the data list
      // data list ordered by era desc
      for (let i = auxEra; i >= elem.block.era; i--) {
        points.push([i, 0]);
      }

      // Count number of accounts on that era
      const idx = points.findIndex((tuple) => tuple[0] === elem.block.era);
      if (idx !== -1) {
        points[idx][1] += 1;
      }

      // Save last counted era
      auxEra = elem.block.era - 1;
    });

    // Restrict displayed points to NUM_LAST_ERAS
    points = points.slice(0, NUM_LAST_ERAS) as DataPoint[];
    return { points };
  }, [data?.newAccount]);

  return (
    <DefaultTile header='new accounts' height='400px'>
      {loading || !chartData.points ? (
        <Loader />
      ) : (
        <LineChart tooltipFormatter={amountByEraTooltip} data={chartData.points} />
      )}
    </DefaultTile>
  );
};

export default NewAccountsChart;
