import { useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import Loader from '../../../../../components/charts/highcharts/Loader';
import DefaultTile from '../../../../../components/DefaultTile';
import { LISTEN_FOR_RELATIVE_PERFORMANCE } from '../../../../../schemas/points.schema';

type ResultType = {
  eraRelativePerformances: { era: number; relativePerformance: number }[];
};

const parser = (item: ResultType['eraRelativePerformances'][0]): DataPoint => [
  item.era,
  item.relativePerformance
];

const RelativePerformance: FC<{ stashAddress: string }> = ({ stashAddress }) => {
  const { data, loading } = useSubscription<ResultType>(LISTEN_FOR_RELATIVE_PERFORMANCE, {
    variables: { stashAddress }
  });
  const chartData = useMemo(
    () => (data?.eraRelativePerformances || []).map(parser),
    [data?.eraRelativePerformances]
  );
  return (
    <DefaultTile header='relative performance' height='400px'>
      {loading ? <Loader /> : <LineChart data={chartData} />}
    </DefaultTile>
  );
};

export default RelativePerformance;
