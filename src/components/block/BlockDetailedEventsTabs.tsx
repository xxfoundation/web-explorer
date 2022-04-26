import React from 'react';
import TabsWithPanels, { TabText } from '../Tabs';
import Skeleton from './BlockDetailedEventsTabs.skeleton';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

const BlockDetailedEventsTabs: React.FC<{
  events?: number;
  extrinsics?: number;
  blockNumber?: number;
  loading: boolean;
}> = ({ blockNumber, events, loading }) => {
  if (loading) return <Skeleton />;
  return (
    <TabsWithPanels
      panels={[
        {
          label: <TabText message='extrinsics' count={1} />,
          content: <ExtrinsicsTable />
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
      ]}
      tabsLabel='block event tabs'
    />
  );
};

export default BlockDetailedEventsTabs;
