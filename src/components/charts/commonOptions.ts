import { Options } from 'highcharts';

const defaultOptions: Options = {
  credits: { enabled: false },
  legend: { enabled: false },
  tooltip: { enabled: false },
  chart: {
    plotBackgroundColor: undefined,
    plotBorderWidth: undefined,
    plotShadow: false,
    type: 'pie'
  }
};

export default defaultOptions;