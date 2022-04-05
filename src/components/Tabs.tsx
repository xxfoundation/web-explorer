import { FC } from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';

const TabPanel: FC<{ name: string, value: string }> = ({ children, name, value }) => {
  return (
    <div role='tabpanel' id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`}>
      {value === name && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const TabText: FC<{ count: string | number, message: string }> = ({ count, message }) => {
  return (
    <Stack direction='row' divider={<Divider orientation='vertical' flex-item />}>
      <Typography>{message}</Typography>
      <Typography>{count}</Typography>
    </Stack>
  );
};

export { TabPanel, TabText };
