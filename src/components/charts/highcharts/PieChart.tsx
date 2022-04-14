import { Grid } from '@mui/material';
import BN from 'bn.js';
import Highcharts, { Options, PointOptionsObject, SeriesClickCallbackFunction } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { FC, useCallback, useMemo } from 'react';
import { CustomPointOptions, VestingStatePopup } from '../../blockchain/types';
import ChartsLegends from '../ChartsLegends';
import SeriesPopover from '../ChartsPopover';

const defaultOptions: Options = {
  credits: { enabled: false },
  legend: { enabled: false },
  plotOptions: {
    pie: {
      allowPointSelect: false,
      cursor: 'pointer',
      dataLabels: { enabled: false },
      events: {},
      animation: false
    }
  },
  tooltip: { enabled: false },
  chart: {
    plotBackgroundColor: undefined,
    plotBorderWidth: undefined,
    plotShadow: false,
    type: 'pie'
  }
};

const states = {
  hover: {
    brightness: -0.2,
    halo: { size: 0 }
  },
  inactive: { enabled: false }
};

type PieChartProps = {
  id?: string;
  name?: string;
  options?: Options;
  crustData?: PointOptionsObject[];
  data: PointOptionsObject[];
  onClick?: SeriesClickCallbackFunction;
};

const PieChart: FC<PieChartProps> = ({ crustData, data, id, name, onClick, options }) => {
  const chartOptions: Options = {
    ...options,
    ...defaultOptions,
    series: [
      {
        type: 'pie',
        innerSize: crustData ? '70%' : '54%',
        name,
        data,
        states
      }
    ],
    title: undefined
  };

  if (crustData) {
    chartOptions.series?.push({
      type: 'pie',
      size: '67%',
      innerSize: '63%',
      states,
      data: crustData
    });
  }

  if (onClick && chartOptions.plotOptions?.pie?.events) {
    chartOptions.plotOptions.pie.events.click = onClick;
  }

  return <HighchartsReact id={id} highcharts={Highcharts} options={chartOptions} />;
};

type PieChartWithLegendProps = {
  crustData?: CustomPointOptions<VestingStatePopup>[];
  data: CustomPointOptions<VestingStatePopup>[];
  name: string;
  value: string | BN;
};

const PieChartWithLegend: FC<PieChartWithLegendProps> = ({ crustData, data, name, value }) => {
  const legends = useMemo(
    () =>
      crustData ? [...data, ...crustData.filter((item) => !item.custom.hiddenLegend)] : [...data],
    [data, crustData]
  );
  const [anchorEl, setAnchorEl] = React.useState<Element>();
  const [pointOptions, setPointOptions] = React.useState<CustomPointOptions<VestingStatePopup>>();

  const handleClick = useCallback(
    (event) => {
      setPointOptions(event.point.options);
      if (event.currentTarget instanceof Element) {
        setAnchorEl(event.currentTarget);
      }
    },
    [setPointOptions]
  );

  const onClose = useCallback(() => setAnchorEl(undefined), []);

  const open = !!anchorEl;

  return (
    <Grid container>
      <Grid item xs={7}>
        <PieChart data={data} crustData={crustData} name={name} onClick={handleClick} />
        {pointOptions && (
          <SeriesPopover
            id={`${name}-chart-slice-popover`}
            onClose={onClose}
            open={open}
            anchorEl={anchorEl}
            data={pointOptions}
          />
        )}
      </Grid>
      <Grid item xs={5}>
        <ChartsLegends legends={legends} name={name} value={value} />
      </Grid>
    </Grid>
  );
};

export default PieChart;

export { PieChart, PieChartWithLegend };
