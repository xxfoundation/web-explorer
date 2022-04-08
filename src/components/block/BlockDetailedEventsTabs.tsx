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
        {
          label: <TabText message='events' count={events.length} />,
          content: (
            <EventsTable
              data={[
                {
                  extrinsicId: '312313',
                  action: 'balance (Withraw)',
                  hash: '0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a869',
                  id: '312313'
                }
              ]}
            />
          )
        }
      ]}
      tabsLabel='block event tabs'
    />
  );
};

export default BlockDetailedEventsTabs;
