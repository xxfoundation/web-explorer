import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import type { DataPoint } from '.';
import { amountByEraTooltip, LineChart } from '.';
import { ListenForEraTransfers, LISTEN_FOR_ERA_TRANSFERS } from '../../../schemas/transfers.schema';
import DefaultTile from '../../DefaultTile';
import Loader from './Loader';

const NUM_LAST_ERAS = 60;

const TransfersLineChart = () => {
  const { data, loading } = useQuery<ListenForEraTransfers>(LISTEN_FOR_ERA_TRANSFERS);
  const chartData: DataPoint[] = useMemo(
    () =>
      (data?.eraTransfers || [])
        .slice()
        .sort((a, b) => a.era - b.era)
        .map((item) => [item.era, item.transfers], [data?.eraTransfers])
        .slice(-NUM_LAST_ERAS) as DataPoint[],
    [data?.eraTransfers]
  );
  return (
    <DefaultTile header='Transfers' height='400px'>
      {loading ? <Loader /> : <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} />}
    </DefaultTile>
  );
};

export default TransfersLineChart;
