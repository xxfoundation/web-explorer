import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SeriesData, SeriesMetadata, TimeInterval } from './types';
import { extractInfo } from './utils';

type Value = [string, number] | undefined;

type SelectedIntervalContextType = {
  selected: {
    value: Value;
    makeSetter: (value: Value) => () => void;
  };
  interval: TimeInterval;
  infoA?: SeriesMetadata;
  infoB?: SeriesMetadata;
  data: SeriesData['data'];
};

const SelectedIntervalContext = createContext<SelectedIntervalContextType>({
  selected: { value: ['', 0], makeSetter: () => () => {} },
  interval: '1h',
  data: []
});

export const useBarchartContext = () => useContext(SelectedIntervalContext);

export const Provider: React.FC<{
  data?: [string, number][];
  interval: TimeInterval;
  seriesA: SeriesData;
  seriesB?: SeriesData;
}> = ({
  children,
  data = [],
  interval,
  seriesA,
  seriesB,
}) => {
  const [selected, setSelected] = useState<[string, number]>();
  const makeTimestampSetter = useCallback((v: Value) => () => setSelected(v), []);

  
  const infoA = useMemo(() => extractInfo(seriesA, interval), [interval, seriesA]);
  const infoB = useMemo(() => seriesB && extractInfo(seriesB, interval), [interval, seriesB]);
  
  const context = useMemo<SelectedIntervalContextType>(
    () => ({
      selected: { value: selected, makeSetter: makeTimestampSetter },
      data,
      infoA,
      infoB,
      interval
    }),
    [selected, makeTimestampSetter, data, infoA, infoB, interval]
  );

  useEffect(() => {
    if (selected === undefined && data.length > 0) {
      setSelected(data[0]);
    }
  }, [data, interval, selected]);

  return (
    <SelectedIntervalContext.Provider value={context}>{children}</SelectedIntervalContext.Provider>
  );
};
