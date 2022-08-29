import { useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';

import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import DefaultTile from '../../../../../components/DefaultTile';
import Loading from '../../../../../components/Loading';
import { LISTEN_FOR_ERA_POINTS } from '../../../../../schemas/validator.schema';

type ResultType = { eraPoints: { era: number; points: number }[] };

const parser = (item: ResultType['eraPoints'][0]): DataPoint => [item.era, item.points];

const EraPoints: FC<{ stashAddress: string }> = ({ stashAddress }) => {
  const { data, loading } = useSubscription<ResultType>(LISTEN_FOR_ERA_POINTS, {
    variables: { stashAddress }
  });
  const chartData = useMemo(
    (): DataPoint[] => (data?.eraPoints || []).map(parser),
    [data?.eraPoints]
  );
  return (
    <DefaultTile header='era points' height='400px'>
      {loading ? <Loading /> : <LineChart data={chartData} />}
    </DefaultTile>
  );
};

export default EraPoints;
