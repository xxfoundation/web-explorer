import React, { FC, useCallback, useRef } from 'react';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import {
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  PopoverProps,
  Typography
} from '@mui/material';
import Highcharts, { Options, PointOptionsObject, SeriesClickCallbackFunction, SeriesClickEventObject, SeriesPieOptions } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PercentageValues, StakingSupplyData } from '../../blockchain/types';

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
  crustData?: SeriesPieOptions['data'];
  data: SeriesPieOptions['data'];
  onClick?: SeriesClickCallbackFunction
}

const PieChart: FC<PieChartProps> = ({ crustData, data, id, name, onClick, options }) => {
  const pieOptions: SeriesPieOptions =  {
    type: 'pie',
    innerSize: crustData ? '70%' : '54%',
    name,
    data,
    states
  };

  const chartOptions: Options = {
    ...defaultOptions,
    ...options,
    series: [pieOptions],
  };

  if (crustData) {
    const innerCircleBoundaries = {
      size: '67%',
      innerSize: '63%'
    };

    chartOptions.series?.push({
      type: 'pie',
      ...innerCircleBoundaries,
      states: {
        inactive: { enabled: false }
      },
      data: crustData
    });
  }

  if (onClick && chartOptions.plotOptions?.pie?.events) {
    chartOptions.plotOptions.pie.events.click = onClick;
  }

  return (
    <HighchartsReact id={id} highcharts={Highcharts} options={chartOptions} />
  );
};

const ChartLegends = ({ data }: { data: { color: string, name: string, y: number }[] }) => {
  return (
    <List dense={true}>
      {data.map(({ color, name, y }) => {
        return (
          <ListItem key={name}>
            <ListItemIcon>
              <SquareRoundedIcon sx={{ color }} />
            </ListItemIcon>
            <ListItemText primary={`${y}% ${name}`} />
          </ListItem>
        );
      })}
    </List>
  );
};

type StakeableInfoProps = {
  name: string;
  values: PercentageValues;
}

const StakeableInfoRow: FC<StakeableInfoProps> = ({ name, values }) => {
  return (
    <>
      <Grid item xs={4} className='stakeable-title'>
        <Typography variant='subtitle2'>{name}</Typography>
      </Grid>
      <Grid item xs={4} className='stakeable-title'>
        <Typography variant='subtitle2'>{values.team.value + values.foundation.value}</Typography>
      </Grid>
      <Grid item xs={4} className='stakeable-title'>
        <Typography variant='subtitle2'>
          {values.team.percentage + values.foundation.percentage}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2'>team</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2'>{values.team.value}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2'>{values.team.percentage}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2'>foundation</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2'>{values.foundation.value}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant='body2'>{values.foundation.percentage}</Typography>
      </Grid>
    </>
  );
};

type ChartClickModalProps = {
  data: StakingSupplyData;
} & PopoverProps;

const ChartClickModal: FC<ChartClickModalProps> = ({ data, ...props }) => {
  return (
    <Popover
      {...props}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center'
      }}
    >
      <Typography variant='subtitle1'>{data.name}</Typography>
      <Grid container>
        <StakeableInfoRow name='stakeable' values={data.stakeable} />
        <StakeableInfoRow name='unstakeable' values={data.unstakeable} />
      </Grid>
    </Popover>
  );
};

type PieChartWithLegendProps = {
  crustData?: SeriesPieOptions['data'];
  data?: SeriesPieOptions['data'];
  name?: string;
  value?: string | React.ReactElement | number | null;
}

const PieChartWithLegend: FC<PieChartWithLegendProps> = ({ crustData, data, name, value }) => {
  // const [legends] = useMemo(
  //   () => crustData
  //     ? [
  //       ...data,
  //       ...crustData.filter(({ hiddenLegend }: PointOptionsObject) => !hiddenLegend)
  //   ] : [...data],
  //   [data, crustData]
  // );

  const chart = useRef(null);
  const [pointOptions, setPointOptions] = React.useState<PointOptionsObject>();

  const handleClick = useCallback(
    (event: SeriesClickEventObject) => {
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
        {/* <ChartClickModal
          id={'total-issuance-chart-slice-popover'}
          onClose={onClose}
          open={open}
          anchorEl={anchorEl}
          // data={pointOptions} doesnt make sense
        /> */}
        <PieChart
          ref={}
          data={data}
          crustData={crustData}
          name='total issuance'
          onClick={handleClick}
        />
      </Grid>
      <Grid item xs={5}>
        <Typography variant='subtitle2'>{name}</Typography>
        <Typography variant='subtitle1'>{value}</Typography>
        {/* <ChartLegends data={legends} /> */}
      </Grid>
    </Grid>
  );
};

export default PieChart;

export { PieChart, PieChartWithLegend };
