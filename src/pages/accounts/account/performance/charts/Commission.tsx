import React, { FC, useMemo } from 'react';
import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';

import { percentLabelFormatter, percentTooltipFormatter } from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import { ValidatorStats } from '../../../../../schemas/staking.schema';

const parser = (stats: ValidatorStats): DataPoint => [stats.era, stats.commission / 100];

const Commission: FC<{ stats: ValidatorStats[] }> = ({ stats }) => {
  const chartData = useMemo(() => stats.map(parser), [stats]);

  return (
    <DefaultTile header='commission' height='400px'>
      <LineChart
        data={chartData}
        labelFormatters={{ yAxis: percentLabelFormatter }}
        tooltipFormatter={percentTooltipFormatter}
      />
    </DefaultTile>
  );
};

export default Commission;
