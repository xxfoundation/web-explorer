import { Typography } from '@mui/material';
import React, { FC } from 'react';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import { TypographyBody } from '../utils';
import CouncilActivityTable from './ActivityTable';

const panels = [
  {
    label: <Typography>council activity</Typography>,
    content: <CouncilActivityTable />
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
  return (
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Council
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account council card' />
    </PaperStyled>
  );
};

export default CouncilCard;
