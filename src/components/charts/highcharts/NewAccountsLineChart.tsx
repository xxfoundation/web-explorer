import type { DataPoint } from '.';
import type { Timeframe } from '../types';
import { FC } from 'react';

import { SeriesClickEventObject } from 'highcharts';

import { useQuery } from '@apollo/client';
import { SelectChangeEvent } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {LIST_ACCOUNTS_TIMESTAMPS, ListAccountsTimeStamps} from '../../../schemas/accounts.schema';
import DefaultTile from '../../DefaultTile';
import Loading from '../../Loading';
import DropdownTimelineLineChart from './DropdownTimelineLineChart';
import { GET_LATEST_ERA, LatestEraQuery } from '../../../schemas/staking.schema';

const ERAS_IN_A_QUARTER = 90;
const ERAS_IN_A_MONTH = 30;

type Props = {
  onEraTimeframeChange?: (timeframe: Timeframe) => void;
}

const NOOP = () => {};

const NewAccountsChart: FC<Props> = ({ onEraTimeframeChange = NOOP }) => {
  const navigate = useNavigate();
  const { data: listOfAllAccounts, loading } = useQuery<ListAccountsTimeStamps>(LIST_ACCOUNTS_TIMESTAMPS);
  const latestEraQuery = useQuery<LatestEraQuery>(GET_LATEST_ERA);
  const latestEra = latestEraQuery.data?.validatorStats[0].era || 999;
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

  useEffect(() => {
    const t = Object.entries(timeframes).find(([,eras]) => eras === timeframeEras)?.[0] as Timeframe | undefined;
    if (t) {
      onEraTimeframeChange(t);
      
    }
  }, [onEraTimeframeChange, timeframeEras, timeframes]);
  
  const onClick = useCallback((evt: SeriesClickEventObject) => {
    navigate(`/accounts?whenCreated=${evt.point.options.x}`);
  }, [navigate]);

  function sameDay(t1: number, t2: number) {
    const d1 = new Date(t1)
    const d2 = new Date(t2)

    return  d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() && 
            d2.getDay() === d1.getDay();
  }

  function getStartEraDay(t: number) {
    const d = new Date(t)
    return d.setHours(0,0,0,0);
  }
  
  const formattedData = useMemo(() => {
    const acc: DataPoint[] = [];
    let count = 0;
    const accounts = listOfAllAccounts?.accounts || [];
    
    const d = new Date();
    // -1 to start on era #0 (genesis)
    d.setDate(d.getDate() - timeframeEras - 1);
    const initChartDate = new Date(d).getTime()

    // flag to calculate offset
    let offset = false;

    for (let i = 0; i < accounts.length; i++) {
      const current = accounts[i];
      const currentDate = current?.whenCreated;
      if(currentDate >= initChartDate) {
        if (!offset) {
          acc.push([getStartEraDay(current.whenCreated), i+1])
          offset = true;
        }
        if(acc.length === 0) {
          acc.push([getStartEraDay(current.whenCreated), 1])
        }
        else {
          const old = acc[count][0]
          if(sameDay(currentDate, old)) {
            ++acc[count][1]
          }
          else {
            acc.push([getStartEraDay(currentDate), acc[count][1]+1])
            count++;
          }
        } 
      }
    }
    return acc;
  }, [listOfAllAccounts, timeframeEras])
  
  return (
    <DefaultTile header='new accounts (Cumulative)' height='435px'>
      {loading || !latestEra ? (
        <Loading />
      ) : (
        <DropdownTimelineLineChart
          timeframe={timeframeEras}
          timeframes={timeframes}
          data={formattedData || []}
          onChange={onChange}
          yAxisTitle={'New Accounts (Cumulative)'}
          xAxisTitle={'Date'}
          xAxisType={'datetime'}
          toolTipType={'datetime'}
          seriesName={'Accounts'}
          onClick={onClick} />
      )}
    </DefaultTile>
  );
};

export default NewAccountsChart;
