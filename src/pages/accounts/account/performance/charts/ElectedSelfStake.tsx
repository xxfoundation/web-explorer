import { SelectChangeEvent } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { Grid } from '@mui/material';

import { DataPoint } from '../../../../../components/charts/highcharts';
import DropdownTimelineLineChart from '../../../../../components/charts/highcharts/DropdownTimelineLineChart';
import { balanceLabelFormatter, balanceByEraTooltip } from '../../../../../components/charts/highcharts/formatters';
import DefaultTile from '../../../../../components/DefaultTile';
import { ValidatorStats } from '../../../../../schemas/staking.schema';

const parser = (item: ValidatorStats): DataPoint => [item.era, item.selfStake];

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

const ElectedSelfStake: FC<{ stats: ValidatorStats[] }> = ({ stats }) => {
  const chartData = useMemo(() => stats.map(parser), [stats]);

  const latestEra = stats[0].era || 99999;
  const timeframes: Record<string, number> = {
    All: latestEra,
    Quarter: ERAS_IN_A_QUARTER,
    Month: ERAS_IN_A_MONTH
  };
  const [timeframe, setTimeframe] = useState(latestEra);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );
  
  const dataRange: DataPoint[] = useMemo(() => {
    const data: DataPoint[] = Object.assign(chartData);
    return data.filter((elem) => elem[0] > Math.max(latestEra - timeframe, 0)).reverse()
  }, [chartData, latestEra, timeframe])

  return (
    <Grid item xs={12} md={12}>
    <DefaultTile header='elected self stake' height='435px'>
      <DropdownTimelineLineChart 
        labelFormatters={{ yAxis: balanceLabelFormatter }} tooltipFormatter={balanceByEraTooltip} timeframe={timeframe} timeframes={timeframes} data={dataRange} onChange={onChange} />
    </DefaultTile>
    </Grid>
  );
};

export default ElectedSelfStake;
