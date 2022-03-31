import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

const TabPanel = ({ children, name, value }) => {
  return (
    <div role='tabpanel' id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`}>
      {value === name && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TabText = ({ count, message }) => {
  return (
    <Stack direction='row' divider={<Divider orientation='vertical' flexItem spacing={2} />}>
      <Typography>{message}</Typography>
      <Typography>{count}</Typography>
    </Stack>
  );
};

export { TabPanel, TabText };
