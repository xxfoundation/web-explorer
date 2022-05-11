import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { PaperStyled } from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import { TypographyBody } from '../utils';
import MetricsTiles from './Metrics';

const panels = [
  {
    label: <Typography>metrics</Typography>,
    content: <MetricsTiles />
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
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} letterSpacing={'3%'} marginBottom={'10px'}>
        Validator
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account performance card' />
    </PaperStyled>
  );
};

export default PerformanceCard;
