import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { TabPanel, TabText } from '../../components/Tabs';

// const hash = '123123';
// const number = '1231313';

const BlockDetailedEventsTabs: React.FC<{ events: number[] }> = ({ events }) => {
  const [value, setValue] = React.useState('events');

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label='block event tabs'>
          <Tab
            label={<TabText message='events' count={events.length} />}
            value='events'
            id='simple-tab-1'
            aria-controls='tabpanel-events'
          />
        </Tabs>
      </Box>
      <TabPanel value={value} name='events'>
        <h1>lalala</h1>
      </TabPanel>
    </Box>
  );
};

export default BlockDetailedEventsTabs;
