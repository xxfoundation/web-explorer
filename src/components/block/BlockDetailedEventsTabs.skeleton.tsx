import { Skeleton } from '@mui/material';
import React from 'react';
import TabsWithPanels from '../Tabs';
import EventsTable from './EventsTable.skeleton';
import ExtrinsicsTable from './ExtrinsicsTable.skeleton';

const BlockDetailedEventsTabs: React.FC = () => {
  return (
    <TabsWithPanels
      panels={[
        {
          label: <Skeleton width={'90%'} />,
          content: <ExtrinsicsTable />
        },
        {
          label: <Skeleton width={'90%'} />,
          content: <EventsTable />
        }
      ]}
      tabsLabel='block event tabs skeleton'
    />
  );
};

export default BlockDetailedEventsTabs;
