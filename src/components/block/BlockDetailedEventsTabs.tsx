import React, { useMemo } from 'react';
import TabsWithPanels, { TabText } from '../Tabs';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

const BlockDetailedEventsTabs: React.FC<{
  events?: number;
  extrinsics?: number;
  blockNumber?: number;
  loading: boolean;
}> = ({ blockNumber, events, loading }) => {
  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='extrinsics' count={1} />,
        content: <ExtrinsicsTable blockNumber={blockNumber} />
      },
      {
        label: <TabText message='events' count={events} />,
        content: (
          <EventsTable
            where={{
              block_number: {
                _eq: blockNumber
              }
            }}
          />
        )
      }
    ];
  }, [events, blockNumber]);
  return <TabsWithPanels panels={panels} tabsLabel='block event tabs' loading={loading} />;
};

export default BlockDetailedEventsTabs;
