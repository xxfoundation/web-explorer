import { Typography } from '@mui/material';
import React, { FC } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import { TypographyBody } from '../utils';

const panels = [
  {
    label: <Typography>metrics</Typography>,
    content: <Typography>metrics placeholder</Typography>
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
    <TabsWithPanels
      header={
        <Typography fontSize={26} fontWeight={500} letterSpacing={'3%'} marginBottom={'10px'}>
          Validator
        </Typography>
      }
      panels={panels}
      tabsLabel='account performance card'
    />
  );
};

export default PerformanceCard;
