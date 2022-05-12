
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SeriesData, SeriesMetadata, TimeInterval } from './types';
import { convertToNearestTimestamp, extractInfo } from './utils';

type SelectedIntervalContextType = {
  timestamp: {
    value: string,
    makeSetter: (value: string) => () => void;
  },
  interval: {
    value: TimeInterval;
    makeSetter: (interval: TimeInterval) => () => void;
  },
  infoA?: SeriesMetadata;
  infoB?: SeriesMetadata;
  timestamps: number[];
}

const SelectedIntervalContext = createContext<SelectedIntervalContextType>({
  timestamp: {
    value: '',
    makeSetter: () => () => {}
  },
  interval: {
    value: '1h',
    makeSetter: () => () => {}
  },
  timestamps: [],
});

export const useBarchartContext = () => useContext(SelectedIntervalContext);

export const Provider: React.FC<{ timestamps: number[], seriesA: SeriesData, seriesB?: SeriesData }> = ({ children, seriesA, seriesB, timestamps }) => {
  const [timestamp, setTimestamp] = useState<string>('');
  const [interval, setInterval] = useState<TimeInterval>('1h');

  const makeTimestampSetter = useCallback(
    (t: string) => () => setTimestamp(t),
    []
  );
  
  const makeIntervalSetter = useCallback(
    (t: TimeInterval) => () => setInterval(t),
    []
  );

  const value = useMemo<SelectedIntervalContextType>(() => ({
    timestamp: { value: timestamp.toString(), makeSetter: makeTimestampSetter },
    interval: { value: interval, makeSetter: makeIntervalSetter },
    infoA: extractInfo(seriesA, interval),
    infoB: seriesB && extractInfo(seriesB, interval),
    timestamps,
  }), [interval, makeIntervalSetter, makeTimestampSetter, seriesA, seriesB, timestamp, timestamps]);


  useEffect(() => {
    if (timestamp === '' && timestamps.length > 0) {
      setTimestamp(convertToNearestTimestamp(timestamps[0], interval).toString())
    }
  }, [interval, timestamp, timestamps]);

  return <SelectedIntervalContext.Provider value={value}>
    {children}
  </SelectedIntervalContext.Provider>
}