import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import { TypographyBody } from '../utils';
import MetricCard from './MetricsCard';

const panels = [
  {
    label: <Typography>metrics</Typography>,
    content: <MetricCard />
  },
  {
    label: <Typography>charts</Typography>,
    content: <TypographyBody>charts placeholder</TypographyBody>
  }
];

const PerformanceCard: FC<{ roles: Roles[] }> = ({ roles }) => {
  if (!roles.includes('validator')) {
    return <></>;
  }
  return (
    <Box padding={'40px'}>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Performance
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account performance card' tabMarginBottom={'1'} />
    </Box>
  );
};

export default PerformanceCard;
