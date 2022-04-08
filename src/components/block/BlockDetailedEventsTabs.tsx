import React from 'react';
import TabsWithPanels, { TabText } from '../Tabs';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

const BlockDetailedEventsTabs: React.FC<{ events: number[]; extrinsics: number[] }> = ({
  events,
  extrinsics
}) => {
  return (
    <TabsWithPanels
      panels={[
        {
          label: <TabText message='extrinsics' count={extrinsics.length} />,
          content: <ExtrinsicsTable />
        },
        { label: <TabText message='events' count={events.length} />, content: <EventsTable /> }
      ]}
      tabsLabel='block event tabs'
    />
  );
};

export default BlockDetailedEventsTabs;
