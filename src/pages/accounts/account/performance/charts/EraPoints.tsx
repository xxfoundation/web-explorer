import React, { FC, useMemo } from 'react';

import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import { amountByEraTooltip } from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import { ValidatorStats } from '../../../../../schemas/staking.schema';

const parser = (stats: ValidatorStats): DataPoint => [stats.era, stats.points ?? 0];

const EraPoints: FC<{ stats: ValidatorStats[] }> = ({ stats }) => {
  const chartData = useMemo(
    (): DataPoint[] => stats.map(parser),
    [stats]
  );

  return (
    <DefaultTile header='era points' height='400px'>
      <LineChart tooltipFormatter={amountByEraTooltip} data={chartData} />
    </DefaultTile>
  );
};

export default EraPoints;
