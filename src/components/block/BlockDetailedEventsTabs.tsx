import React, { useMemo } from 'react';
import TabsWithPanels, { TabSkeleton, TabText } from '../Tabs';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

const BlockDetailedEventsTabs: React.FC<{
  events?: number;
  extrinsics?: number;
  blockNumber?: number;
  loading: boolean;
}> = ({ blockNumber, events, extrinsics, loading }) => {
  const panels = useMemo(() => {
    return [
      {
        label: loading ? <TabSkeleton /> : <TabText message='extrinsics' count={extrinsics} />,
        content: <ExtrinsicsTable blockNumber={blockNumber} />
      },
      {
        label: loading ? <TabSkeleton /> : <TabText message='events' count={events} />,
        content: <EventsTable blockNumber={blockNumber} />
      }
    ];
  }, [events, extrinsics, loading, blockNumber]);
  return <TabsWithPanels panels={panels} tabsLabel='block event tabs' />;
};

export default BlockDetailedEventsTabs;
