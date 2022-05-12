import { Typography } from '@mui/material';
import React, { FC } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import UnbondingTable from './UnbondingTable';

const panels = [{ label: <Typography>unbonding</Typography>, content: <UnbondingTable /> }];

const StakingCard: FC<{ roles: Roles[] }> = ({ roles }) => {
  if (!roles.includes('validator')) {
    return <></>;
  }
  return (
    <TabsWithPanels
      header={
        <Typography fontSize={26} fontWeight={500} letterSpacing={'3%'} marginBottom={'10px'}>
          Staking
        </Typography>
      }
      panels={panels}
      tabsLabel='account staking card'
    />
  );
};

export default StakingCard;
