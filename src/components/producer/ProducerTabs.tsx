import { Box, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import Eras from './ErasTable';
import NominatorsTable from './NominatorsTable';

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
        <Eras />
      </TabPanel>
    </Box>
  );
};
export default ProducerTabs;
