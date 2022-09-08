import React, { FC, useMemo } from 'react';

import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import { balanceLabelFormatter, balanceByEraTooltip } from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import { ValidatorStats } from '../../../../../schemas/staking.schema';


const parser = (item: ValidatorStats): DataPoint => [item.era, item.selfStake];

const ElectedSelfStake: FC<{ stats: ValidatorStats[] }> = ({ stats }) => {
  const chartData = useMemo(() => stats.map(parser), [stats]);

  return (
    <DefaultTile header='elected self stake' height='400px'>
      <LineChart
        labelFormatters={{ yAxis: balanceLabelFormatter }}
        tooltipFormatter={balanceByEraTooltip}
        data={chartData} />
    </DefaultTile>
  );
};

export default ElectedSelfStake;
