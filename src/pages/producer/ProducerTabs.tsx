import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { TabPanel, TabText } from '../../components/Tabs';
import ErasTable from './ErasTable';
import NominatorsTable from './NominatorsTable';

const ProducerTabs: React.FC<{ eras: string[]; nominators: string[] }> = ({ eras, nominators }) => {
  const [value, setValue] = React.useState('nominators');

  const handleChange = (_: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label='producers tables tabs'>
          <Tab
            label={<TabText message='nominators' count={nominators.length} />}
            value='nominators'
            id='simple-tab-1'
            aria-controls='tabpanel-nominators'
          />
          <Tab
            label={<TabText message='eras' count={eras.length} />}
            value='eras'
            id='simple-tab-2'
            aria-controls='tabpanel-eras'
          />
        </Tabs>
      </Box>
      <TabPanel value={value} name='nominators'>
        <NominatorsTable />
      </TabPanel>
      <TabPanel value={value} name='eras'>
        <ErasTable />
      </TabPanel>
    </Box>
  );
};
export default ProducerTabs;
