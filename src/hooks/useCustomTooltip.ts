import type { ChartTypeRegistry, PluginChartOptions } from 'chart.js';
import type { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { CSSProperties, RefObject, useMemo } from 'react';

import { useCallback, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type DeepPartial<T> = T extends Function ? T : (T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T);

type Plugin<T extends keyof ChartTypeRegistry> = PluginChartOptions<T>['plugins']['tooltip'];
type CustomTooltip<T extends keyof ChartTypeRegistry> = Plugin<T>['external'];
type PluginOptions<T extends keyof ChartTypeRegistry> = DeepPartial<Plugin<T>>;
type DataState<D> = { data?: D, label?: string };

const useCustomTooltip = <T extends keyof ChartTypeRegistry, D>(chart?: RefObject<ChartJSOrUndefined<T, D[], unknown>>) => {
  const [tooltipStyles, setTooltipStyles] = useState<CSSProperties>({
    opacity: 0,
    left: 0,
    right: 0,
  });

  const [{ data, label }, setData] = useState<DataState<D>>({})

  const tooltip = useCallback<CustomTooltip<T>>((context) => {
    if (context.tooltip.opacity == 0) {
      setTooltipStyles((styles) => ({ ...styles, opacity: 0 }));
      return;
    }

    const canvas = chart?.current?.canvas;

    if (canvas) {
      setTooltipStyles((styles) => ({ ...styles, opacity: 1 }));

      // set position of tooltip
      const left = context.tooltip.x;
      const top = context.tooltip.y;

      // handle tooltip multiple rerender
      if (tooltipStyles?.top != top) {
        setTooltipStyles((styles) => ({ ...styles, top, left }));
      }
    }
  }, [chart, tooltipStyles?.top]);

  const plugin = useMemo<PluginOptions<T>>(() => ({
    callbacks: {
      beforeBody: (items) => {
        const { label: itemLabel, raw } = items[0] ?? {};
        setData({ label: itemLabel, data: raw as D })
        return '';
      },
    },
    enabled: false,
    position: 'nearest',
    external: tooltip
  }), [tooltip]);
  
  return {
    data,
    label,
    tooltip,
    plugin,
    setData,
    styles: tooltipStyles
  }
}

export default useCustomTooltip;
