import { useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import Loader from '../../../../../components/charts/highcharts/Loader';
import DefaultTile from '../../../../../components/DefaultTile';
import { LISTEN_FOR_ELECTED_SELF_STAKE } from '../../../../../schemas/points.schema';

type ResultType = {
  eraSelfStake: { era: number; selfStake: number }[];
};

const parser = (item: ResultType['eraSelfStake'][0]): DataPoint => [item.era, item.selfStake];

const ElectedSelfStake: FC<{ stashAddress: string }> = ({ stashAddress }) => {
  const { data, loading } = useSubscription<ResultType>(LISTEN_FOR_ELECTED_SELF_STAKE, {
    variables: { stashAddress }
  });
  const chartData = useMemo(() => (data?.eraSelfStake || []).map(parser), [data?.eraSelfStake]);
  return (
    <DefaultTile header='elected self stake' height='400px'>
      {loading ? <Loader /> : <LineChart data={chartData} />}
    </DefaultTile>
  );
};

export default ElectedSelfStake;
