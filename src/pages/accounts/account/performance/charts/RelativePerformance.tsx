import {SelectChangeEvent} from '@mui/material';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {Grid} from '@mui/material';

import {DataPoint} from '../../../../../components/charts/highcharts';
import DropdownTimelineLineChart from '../../../../../components/charts/highcharts/DropdownTimelineLineChart';
import {decimalTooltipFormatter} from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import {ValidatorStats} from '../../../../../schemas/staking.schema';

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

const RelativePerformance: FC<{ stats: ValidatorStats[] }> = ({stats}) => {
  const chartData = useMemo(() => stats.map((s) => [s.era, s.relativePerformance] as DataPoint), [stats]);

  const latestEra = stats[0].era || 999;
  const timeframes: Record<string, number> = {
    All: latestEra,
    Quarter: ERAS_IN_A_QUARTER,
    Month: ERAS_IN_A_MONTH
  };
  const [timeframe, setTimeframe] = useState(latestEra);
  const onChange = useCallback(
    ({target}: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );
  const eraRange: { start: number; end: number } = useMemo(() => {
    return {start: Math.max(latestEra - timeframe, 0), end: latestEra};
  }, [latestEra, timeframe]);

  const dataRange = useMemo(() => chartData.reverse().slice(eraRange.start, eraRange.end), [chartData, eraRange.end, eraRange.start])

  const isFullRange = timeframe === timeframes.All;
  
  return (
    <Grid item xs={12} md={isFullRange ? 12 : 6}>

      <DefaultTile header='Relative Performance' height='435px'>
        <DropdownTimelineLineChart tooltipFormatter={decimalTooltipFormatter} timeframe={timeframe}
                                   timeframes={timeframes} data={dataRange} onChange={onChange}/>
      </DefaultTile>
    </Grid>
  );
};

export default RelativePerformance;
