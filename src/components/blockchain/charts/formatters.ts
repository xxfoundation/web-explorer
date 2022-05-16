import { TooltipFormatterContextObject } from 'highcharts';

export function percentTooltipFormatter(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${Math.floor(this.y * 100)}%`;
}

export function formatPercent(this: { value: string | number }) {
  const parsed = typeof this.value === 'string' ? parseFloat(this.value) : this.value;
  return `${parsed * 100} %`;
}

export function thousandsFormatter(this: { value: string | number }) {
  const parsed = typeof this.value === 'string' ? parseFloat(this.value) : this.value;
  return parsed > 999 ? `${parsed * 0.001}K` : `${parsed}`;
}


export function amountByEraTooltip(this: TooltipFormatterContextObject) {
  return `<b>${this.series.name} ${this.x}</b><br />${this.y} ${this.series.yAxis.options.title?.text}`;
}