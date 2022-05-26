import { TooltipFormatterContextObject } from 'highcharts';

export function percentTooltipFormatter(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${Math.floor((this.y ?? 0) * 100)}%`;
}

export function formatPercent(this: { value: string | number }) {
  const parsed = typeof this.value === 'string' ? parseFloat(this.value) : this.value;
  return `${parsed * 100} %`;
}

export function amountByEraTooltip(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${this.y} ${this.series.yAxis.options.title?.text}`;
}