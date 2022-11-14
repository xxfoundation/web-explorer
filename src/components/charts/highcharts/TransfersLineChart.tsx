import type { SeriesClickEventObject } from 'highcharts';
import type { Timeframe } from '../types';
import type { FC } from 'react';

import { useQuery } from '@apollo/client';
import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect,  useMemo, useState } from 'react';

import { amountByEraTooltip, DataPoint } from '.';
import { QueryEraTransfers, LISTEN_FOR_ERA_TRANSFERS } from '../../../schemas/transfers.schema';
import DefaultTile from '../../DefaultTile';
import Loading from '../../Loading';
import { useNavigate } from 'react-router-dom';
import DropdownTimelineLineChart from './DropdownTimelineLineChart';

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

const timeframes: Record<Timeframe, number> = {
  All: 0,
  Quarter: ERAS_IN_A_QUARTER,
  Month: ERAS_IN_A_MONTH
};

type Props = {
  onEraTimeframeChange?: (timeframe: Timeframe) => void;
}

const NOOP = () => {};

const TransfersLineChart: FC<Props> = ({ onEraTimeframeChange = NOOP }) => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<QueryEraTransfers>(LISTEN_FOR_ERA_TRANSFERS);

  const [timeframeEras, setTimeframeEras] = useState(ERAS_IN_A_MONTH);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => {
      const eras = Number(target.value)
      setTimeframeEras(eras);
    },
    [setTimeframeEras]
  );

  const chartData: DataPoint[] = useMemo(
    () =>
      (data?.eraTransfers || [])
        .slice()
        .sort((a, b) => a.era - b.era)
        .map((item) => [item.era, item.transfers], [data?.eraTransfers])
        .slice(-timeframeEras) as DataPoint[],
    [data?.eraTransfers, timeframeEras]
  );

  useEffect(() => {
    const t = Object.entries(timeframes).find(([,eras]) => eras === timeframeEras)?.[0] as Timeframe | undefined;
    if (t) {
      onEraTimeframeChange(t);
    }
  }, [onEraTimeframeChange, timeframeEras]);

  const onClick = useCallback((evt: SeriesClickEventObject) => {
    navigate(`/transfers?era=${evt.point.options.x}`);
  }, [navigate]);

  return (
    <DefaultTile header='Transfers' height='435px'>
      {loading ? (
        <Loading />
      ) : (
        <DropdownTimelineLineChart tooltipFormatter={amountByEraTooltip} timeframe={timeframeEras} timeframes={timeframes} data={chartData} onChange={onChange} onClick={onClick} />
      )}
    </DefaultTile>
  );
};

export default TransfersLineChart;
