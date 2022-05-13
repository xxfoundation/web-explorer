import { Typography } from '@mui/material';
import React, { FC } from 'react';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import UnbondingTable from './UnbondingTable';

/**REWARDS & SLASHES
STAKING ACTIVITY
UNBONDING */
const panels = [
  {
    label: <Typography>rewards & slashes</Typography>,
    content: <Typography>rewards & slashes placeholder</Typography>
  },
  {
    label: <Typography>staking activity</Typography>,
    content: <Typography>staking activity placeholder</Typography>
  },
  { label: <Typography>unbonding</Typography>, content: <UnbondingTable /> }
];

const StakingCard: FC<{ roles: Roles[] }> = ({ roles }) => {
  if (!roles.includes('validator')) {
    return <></>;
  }
  return (
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Staking
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account staking card' />
    </PaperStyled>
  );
};

export default StakingCard;
