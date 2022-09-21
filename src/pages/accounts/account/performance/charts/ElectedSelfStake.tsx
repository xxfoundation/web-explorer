import React, { FC, useMemo, useState } from 'react';
import { Box } from '@mui/material';

import { DataPoint, LineChart } from '../../../../../components/charts/highcharts';
import { balanceLabelFormatter, balanceByEraTooltip } from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import { ValidatorStats } from '../../../../../schemas/staking.schema';
import TimeframesDropdown from '../../../../../components/TimeframesDropdown';

const parser = (item: ValidatorStats): DataPoint => [item.era, item.selfStake];

const ElectedSelfStake: FC<{ stats: ValidatorStats[] }> = ({ stats }) => {
  const [timeframe, setTimeframe] = useState<number>(0);
  const chartData = useMemo(() => stats.map(parser)
    .sort((a, b) => a[0] - b[0])
    .slice(-timeframe),
    [stats, timeframe]
  );

  return (
    <DefaultTile header='elected self stake' height='450px'>
      <Box sx={{ display: 'flex', justifyContent: 'right', pr: 2 }}>
        <TimeframesDropdown value={timeframe} onChange={setTimeframe} />
      </Box>
      <LineChart
        labelFormatters={{ yAxis: balanceLabelFormatter }}
        tooltipFormatter={balanceByEraTooltip}
        data={chartData} />
    </DefaultTile>
  );
};

export default ElectedSelfStake;
