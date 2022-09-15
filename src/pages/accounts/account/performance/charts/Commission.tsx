import { SelectChangeEvent } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { DataPoint } from '../../../../../components/charts/highcharts';
import DropdownTimelineLineChart from '../../../../../components/charts/highcharts/DropdownTimelineLineChart';

import { percentLabelFormatter, percentTooltipFormatter } from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import { ValidatorStats } from '../../../../../schemas/staking.schema';

const parser = (stats: ValidatorStats): DataPoint => [stats.era, stats.commission / 100];

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

const Commission: FC<{ stats: ValidatorStats[] }> = ({ stats }) => {
  const chartData = useMemo(() => stats.map(parser), [stats]);

  const latestEra = stats[0].era || 999;
  const timeframes: Record<string, number> = {
    All: latestEra,
    Quarter: ERAS_IN_A_QUARTER,
    Month: ERAS_IN_A_MONTH
  };
  const [timeframe, setTimeframe] = useState(ERAS_IN_A_MONTH);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );
  const eraRange: { start: number; end: number } = useMemo(() => {
    return { start: Math.max(latestEra - timeframe, 0), end: latestEra };
  }, [latestEra, timeframe]);

  const dataRange = useMemo(() => chartData.reverse().slice(eraRange.start, eraRange.end), [chartData, eraRange.end, eraRange.start])

  return (
    <DefaultTile header='commission' height='435px'>
      <DropdownTimelineLineChart 
        labelFormatters={{ yAxis: percentLabelFormatter }} tooltipFormatter={percentTooltipFormatter} timeframe={timeframe} timeframes={timeframes} data={dataRange} onChange={onChange} />
    </DefaultTile>
  );
};

export default Commission;
