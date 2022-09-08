import React, { FC, useMemo } from 'react';

import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import { decimalTooltipFormatter } from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import { ValidatorStats } from '../../../../../schemas/staking.schema';


const RelativePerformance: FC<{ stats: ValidatorStats[] }> = ({ stats }) => {
  const chartData = useMemo(() => stats.map((s) => [s.era, s.relativePerformance] as DataPoint), [stats]);

  return (
    <DefaultTile header='relative performance' height='400px'>
      <LineChart tooltipFormatter={decimalTooltipFormatter} data={chartData} />
    </DefaultTile>
  );
};

export default RelativePerformance;
