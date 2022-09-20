import type { SeriesClickEventObject } from 'highcharts';

import { useQuery } from '@apollo/client';
import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

import { amountByEraTooltip, DataPoint } from '.';
import { ListenForEraTransfers, LISTEN_FOR_ERA_TRANSFERS } from '../../../schemas/transfers.schema';
import DefaultTile from '../../DefaultTile';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import DropdownTimelineLineChart from './DropdownTimelineLineChart';

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

const TransfersLineChart = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<ListenForEraTransfers>(LISTEN_FOR_ERA_TRANSFERS);
  const timeframes: Record<string, number> = {
    All: 0,
    Quarter: ERAS_IN_A_QUARTER,
    Month: ERAS_IN_A_MONTH
  };
  const [timeframe, setTimeframe] = useState(ERAS_IN_A_MONTH);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframe(Number(target.value)),
    []
  );
  const chartData: DataPoint[] = useMemo(
    () =>
      (data?.eraTransfers || [])
        .slice()
        .sort((a, b) => a.era - b.era)
        .map((item) => [item.era, item.transfers], [data?.eraTransfers])
        .slice(-timeframe) as DataPoint[],
    [data?.eraTransfers, timeframe]
  );

  const onClick = useCallback((evt: SeriesClickEventObject) => {
    navigate(`/transfers?era=${evt.point.options.x}`);
  }, [navigate]);

  return (
    <DefaultTile header='Transfers' height='435px'>
      {loading ? (
        <Loading />
      ) : (
        <DropdownTimelineLineChart tooltipFormatter={amountByEraTooltip} timeframe={timeframe} timeframes={timeframes} data={chartData} onChange={onChange} onClick={onClick} />
      )}
    </DefaultTile>
  );
};

export default TransfersLineChart;
