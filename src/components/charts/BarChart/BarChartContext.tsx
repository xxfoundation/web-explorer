import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SeriesData, SeriesMetadata, TimeInterval } from './types';
import { convertToNearestTimestamp, extractInfo } from './utils';

type SelectedIntervalContextType = {
  timestamp: {
    value: string;
    makeSetter: (value: string) => () => void;
  };
  interval: TimeInterval;
  infoA?: SeriesMetadata;
  infoB?: SeriesMetadata;
  timestamps: number[];
};

const SelectedIntervalContext = createContext<SelectedIntervalContextType>({
  timestamp: { value: '', makeSetter: () => () => {} },
  interval: '1h',
  timestamps: []
});

export const useBarchartContext = () => useContext(SelectedIntervalContext);

export const Provider: React.FC<{
  timestamps: number[];
  interval: TimeInterval;
  seriesA: SeriesData;
  seriesB?: SeriesData;
}> = ({
  children,
  interval,
  seriesA,
  seriesB,
  timestamps,
}) => {
  const [timestamp, setTimestamp] = useState<string>('');
  const makeTimestampSetter = useCallback((t: string) => () => setTimestamp(t), []);

  const value = useMemo<SelectedIntervalContextType>(
    () => ({
      timestamp: { value: timestamp.toString(), makeSetter: makeTimestampSetter },
      infoA: extractInfo(seriesA, interval),
      infoB: seriesB && extractInfo(seriesB, interval),
      timestamps,
      interval
    }),
    [interval, makeTimestampSetter, seriesA, seriesB, timestamp, timestamps]
  );

  useEffect(() => {
    if (timestamp === '' && timestamps.length > 0) {
      setTimestamp(convertToNearestTimestamp(timestamps[0], interval).toString());
    }
  }, [interval, timestamp, timestamps]);

  return (
    <SelectedIntervalContext.Provider value={value}>{children}</SelectedIntervalContext.Provider>
  );
};
