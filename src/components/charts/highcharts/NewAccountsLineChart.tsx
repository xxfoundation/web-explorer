import type { DataPoint } from '.';
import type { Timeframe } from '../types';
import { FC } from 'react';

import { amountByEraTooltip } from '.';
import { SeriesClickEventObject } from 'highcharts';

import { useQuery } from '@apollo/client';
import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CreatedAccounts, GET_WHEN_CREATED_ACCOUNTS } from '../../../schemas/accounts.schema';
import DefaultTile from '../../DefaultTile';
import Loading from '../../Loading';
import DropdownTimelineLineChart from './DropdownTimelineLineChart';

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

type Props = {
  onEraTimeframeChange?: (timeframe: Timeframe) => void;
}

const NOOP = () => {};

const NewAccountsChart: FC<Props> = ({ onEraTimeframeChange = NOOP }) => {
  const navigate = useNavigate();
  const { data, loading } = useQuery<CreatedAccounts>(GET_WHEN_CREATED_ACCOUNTS);
  // const newAccounts = data?.account;
  const latestEra = data?.history[0].latestEra || 999;
  const timeframes: Record<string, number> = useMemo(() => ({
    All: latestEra,
    Quarter: ERAS_IN_A_QUARTER,
    Month: ERAS_IN_A_MONTH
  }), [latestEra]);
  const [timeframeEras, setTimeframeEras] = useState(ERAS_IN_A_MONTH);
  const onChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => setTimeframeEras(Number(target.value)),
    []
  );

  const eraRange: { start: number; end: number } = useMemo(() => {
    return { start: Math.max(latestEra - timeframeEras, 0), end: latestEra };
  }, [latestEra, timeframeEras]);

  const chartData = useMemo(() => {
    const counter: { [era: number]: number } = {};
    return Object.entries(counter).map(([k, v]) => [parseInt(k), v] as DataPoint);
  }, []);

  useEffect(() => {
    const t = Object.entries(timeframes).find(([,eras]) => eras === timeframeEras)?.[0] as Timeframe | undefined;
    if (t) {
      onEraTimeframeChange(t);
    }
  }, [onEraTimeframeChange, timeframeEras, timeframes]);
  
  const onClick = useCallback((evt: SeriesClickEventObject) => {
    navigate(`/accounts?era=${evt.point.options.x}`);
  }, [navigate]);

  const dataRange = useMemo(() => chartData.slice(eraRange.start, eraRange.end), [chartData, eraRange.end, eraRange.start])

  return (
    <DefaultTile header='new accounts' height='435px'>
      {loading || !chartData || !latestEra ? (
        <Loading />
      ) : (
        <DropdownTimelineLineChart
          tooltipFormatter={amountByEraTooltip}
          timeframe={timeframeEras}
          timeframes={timeframes}
          data={dataRange}
          onChange={onChange}
          onClick={onClick} />
      )}
    </DefaultTile>
  );
};

export default NewAccountsChart;
