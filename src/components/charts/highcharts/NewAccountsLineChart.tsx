import { useSubscription } from '@apollo/client';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { LISTEN_FOR_NEW_ACCOUNTS, NewAccounts } from '../../../schemas/accounts.schema';
import DefaultTile from '../../DefaultTile';
import Loader from './Loader';

const NewAccountsChart = () => {
  const { data, loading } = useSubscription<NewAccounts>(LISTEN_FOR_NEW_ACCOUNTS);
  const chartData = useMemo(() => {
    const auxData: DataPoint[] = [];
    (data?.newAccount || []).forEach((elem) => {
      const idx = auxData.findIndex((era) => era[0] === elem.block.era);
      if (idx !== -1) {
        auxData[idx][1] += 1;
      } else {
        auxData.push([elem.block.era, 1]);
      }
    });
    return auxData;
  }, [data?.newAccount]);
  const xRange = useMemo(
    () =>
      data?.newAccount && data.newAccount.length
        ? {
            minX: data.newAccount[0].block.era - 2,
            maxX:
              (data.newAccount[data.newAccount.length - 1].block.era
                ? data.newAccount[data.newAccount.length - 1].block.era
                : data.newAccount[0].block.era) + 2
          }
        : undefined,
    [data?.newAccount]
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
