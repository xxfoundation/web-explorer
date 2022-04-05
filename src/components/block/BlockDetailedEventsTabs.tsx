import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { TabPanel, TabText } from '../Tabs';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

const BlockDetailedEventsTabs: React.FC<{ events: number[]; extrinsics: number[] }> = ({
  events,
  extrinsics
}) => {
  const [value, setValue] = React.useState('extrinsics');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label='block event tabs'>
          <Tab
            label={<TabText message='extrinsics' count={extrinsics.length} />}
            value='extrinsics'
            id='simple-tab-1'
            aria-controls='tabpanel-extrinsics'
          />
          <Tab
            label={<TabText message='events' count={events.length} />}
            value='events'
            id='simple-tab-2'
            aria-controls='tabpanel-events'
          />
        </Tabs>
      </Box>
      <TabPanel value={value} name='extrinsics'>
        <ExtrinsicsTable />
      </TabPanel>
      <TabPanel value={value} name='events'>
        <EventsTable />
      </TabPanel>
    </Box>
  );
};

export default BlockDetailedEventsTabs;
