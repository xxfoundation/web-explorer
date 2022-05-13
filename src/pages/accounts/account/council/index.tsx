import { Typography } from '@mui/material';
import React, { FC } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import { TypographyBody } from '../utils';

const panels = [
  {
    label: <Typography>council activity</Typography>,
    content: <Typography>COUNCIL ACTIVITY placeholder</Typography>
  },
  {
    label: <Typography>council terms</Typography>,
    content: <TypographyBody>council terms placeholder</TypographyBody>
  },
  {
    label: <Typography>election activity</Typography>,
    content: <TypographyBody>election activity placeholder</TypographyBody>
  }
];

const CouncilCard: FC<{ roles: Roles[] }> = ({ roles }) => {
  if (!roles.includes('council')) {
    return <></>;
  }
  return <TabsWithPanels panels={panels} tabsLabel='account council card' />;
};

export default CouncilCard;
