import { useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { DataPoint, formatPercent, LineChart } from '../../../../../components/charts/highcharts';
import Loader from '../../../../../components/charts/highcharts/Loader';
import DefaultTile from '../../../../../components/DefaultTile';
import { LISTEN_FOR_ERA_COMMISSION } from '../../../../../schemas/validator.schema';

type ResultType = {
  eraCommissions: { era: number; commission: number }[];
};

const parser = (item: ResultType['eraCommissions'][0]): DataPoint => [item.era, item.commission];

const Commission: FC<{ stashAddress: string }> = ({ stashAddress }) => {
  const { data, loading } = useSubscription<ResultType>(LISTEN_FOR_ERA_COMMISSION, {
    variables: { stashAddress }
  });
  const chartData = useMemo(() => (data?.eraCommissions || []).map(parser), [data?.eraCommissions]);
  return (
    <DefaultTile header='commission' height='400px'>
      {loading ? (
        <Loader />
      ) : (
        <LineChart
          data={chartData}
          labelFormatters={{
            yAxis: formatPercent
          }}
        />
      )}
    </DefaultTile>
  );
};

export default Commission;
