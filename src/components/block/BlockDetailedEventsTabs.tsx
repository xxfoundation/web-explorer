import { Box, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

const TabText: React.FC<{ count: string | number; message: string }> = ({ count, message }) => {
  return (
    <Stack direction='row' divider={<Divider orientation='vertical' />}>
      <Typography>{message}</Typography>
      <Typography>{count}</Typography>
    </Stack>
  );
};

const TabPanel: React.FC<{ children: JSX.Element; name: string; value: string }> = ({
  children,
  name,
  value
}) => {
  return (
    <div role='tabpanel' id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`}>
      {value === name && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// const hash = '123123';
// const number = '1231313';

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
