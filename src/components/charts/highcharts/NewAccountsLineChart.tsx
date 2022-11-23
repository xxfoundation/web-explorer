import type { DataPoint } from '.';
import type { Timeframe } from '../types';
import { FC } from 'react';

import { SeriesClickEventObject } from 'highcharts';

import { useQuery } from '@apollo/client';
import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {CreatedEras, GET_WHEN_CREATED_ERAS, LIST_ACCOUNTS_TIMESTAMPS, ListAccountsTimeStamps} from '../../../schemas/accounts.schema';
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
  const { data, loading } = useQuery<CreatedEras>(GET_WHEN_CREATED_ERAS);
  const { data: listOfAllAccounts } = useQuery<ListAccountsTimeStamps>(LIST_ACCOUNTS_TIMESTAMPS);
  const newAccounts = data?.account;
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

  const chartData = useMemo(() => {
    const counter: { [era: number]: number } = {};

    newAccounts?.forEach(({ era }) => {
      counter[era] = (counter[era] || 0) + 1;
    });

    // Initialize to 0 eras with no new accounts
    for (let i = latestEra; i >= 0; i--) {
      if (!(i in counter)) {
        counter[i] = 0;
      }
    }
    return Object.entries(counter).map(([k, v]) => [parseInt(k), v] as DataPoint);
  }, [latestEra, newAccounts]);


  useEffect(() => {
    const t = Object.entries(timeframes).find(([,eras]) => eras === timeframeEras)?.[0] as Timeframe | undefined;
    if (t) {
      onEraTimeframeChange(t);
      
    }
  }, [onEraTimeframeChange, timeframeEras, timeframes]);
  
  const onClick = useCallback((evt: SeriesClickEventObject) => {
    navigate(`/accounts?era=${evt.point.options.x}`);
  }, [navigate]);

  function sameDay(t1: number, t2: number) {
    const d1 = new Date(t1)
    const d2 = new Date(t2)
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
  
  const formattedData = useMemo(() => {
    const acc: DataPoint[] = [];
    let count = 0;
    const accounts = listOfAllAccounts?.accounts || [];
    for (let i = 0; i < accounts.length; i++) {
      const current = accounts[i];
      const currentDate = current?.timestamp
      if(acc.length === 0) {
        acc.push([current.timestamp, 1])
      }
      else {
        const old = acc[count][0]
        if(sameDay(currentDate, old)) {
          acc[count][1] = ++acc[count][1]
        }
        else {
          acc.push([current.timestamp, acc[count][1]+1])
          count++;
        }
      }
    }
    return acc;
  }, [listOfAllAccounts])

  return (
    <DefaultTile header='new accounts' height='435px'>
      {loading || !chartData || !latestEra ? (
        <Loading />
      ) : (
        <DropdownTimelineLineChart
          timeframe={timeframeEras}
          timeframes={timeframes}
          data={formattedData || []}
          onChange={onChange}
          yAxisTitle={'Accounts'}
          xAxisTitle={'Timeline'}
          xAxisType={'datetime'}
          toolTipType={'datetime'}
          seriesName={'Accounts'}
          onClick={onClick} />
      )}
    </DefaultTile>
  );
};

export default NewAccountsChart;
