import { AxisLabelsFormatterContextObject, TooltipFormatterContextObject } from 'highcharts';
import { applyFormat } from '../../FormatBalance/formatter';


export function amountByEraTooltip(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${this.y?.toString() ?? '0'} ${this.series.yAxis.options.title?.text}`;
}
export function decimalTooltipFormatter(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br/>${this.y?.toFixed(2)}`;
}

/* -------------------------------------------------------------------------- */
/*                               Balances Format                              */
/* -------------------------------------------------------------------------- */
export function balanceByEraTooltip(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${applyFormat(this.y?.toString() ?? '0')} ${this.series.yAxis.options.title?.text}`;
}
export function balanceLabelFormatter(this: AxisLabelsFormatterContextObject) {
  return `${applyFormat(this.value.toString())}`;
}

/* -------------------------------------------------------------------------- */
/*                              Percentage Format                             */
/* -------------------------------------------------------------------------- */
export function percentTooltipFormatter(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${Math.floor((this.y ?? 0) * 100)}%`;
}
export function percentLabelFormatter(this: AxisLabelsFormatterContextObject) {
  return `${Math.floor((this.value as number ?? 0) * 100)}%`;
}
export function formatPercent(this: { value: string | number }) {
  const parsed = typeof this.value === 'string' ? parseFloat(this.value) : this.value;
  return `${parsed * 100} % `;
}