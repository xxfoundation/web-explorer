import { AxisLabelsFormatterContextObject, TooltipFormatterContextObject } from 'highcharts';
import { formatBalance } from '../../FormatBalance/formatter';

export function percentTooltipFormatter(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${Math.floor((this.y ?? 0) * 100)}%`;
}
export function amountByEraTooltip(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${this.y} ${this.series.yAxis.options.title?.text}`;
}
export function decimalTooltipFormatter(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${this.y}`;
}

export function amountLabelFormatter(this: AxisLabelsFormatterContextObject) {
  return `${formatBalance(this.value, { withUnit: false, precision: 0 })}`;
}

export function percentLabelFormatter(this: AxisLabelsFormatterContextObject) {
  return `${this.value}%`;
}


export function formatPercent(this: { value: string | number }) {
  const parsed = typeof this.value === 'string' ? parseFloat(this.value) : this.value;
  return `${parsed * 100} %`;
}