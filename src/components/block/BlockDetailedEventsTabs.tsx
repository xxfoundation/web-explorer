import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { PaperWrap } from '../Paper/PaperWrap';
import { TabPanel, TabText } from '../Tabs';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

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
    <PaperWrap>
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
      <TabPanel value={value} index='extrinsics'>
        <ExtrinsicsTable />
      </TabPanel>
      <TabPanel value={value} index='events'>
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
      </TabPanel>
    </PaperWrap>
  );
};

export default BlockDetailedEventsTabs;
