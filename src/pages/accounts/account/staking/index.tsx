import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels from '../../../../components/Tabs';
import { Account } from '../../../../schemas/accounts.schema';
import NominatorActivityTable from './NominatorActivityTable';
import RewardStashTable from './RewardStashTable';
import StakingActivityTable from './StakingActivityTable';

const StakingCard: FC<{ account: Account }> = ({ account }) => {
  const roles = useMemo(() => account.roles || [], [account.roles]);
  // const roles = ['validator'];
  const panels = useMemo(() => {
    const cachedPanels = [
      {
        label: <Typography>rewards & slashes</Typography>,
        content: <RewardStashTable />
      },
      {
        label: <Typography>staking activity</Typography>,
        content: <StakingActivityTable />
      }
    ];
    if (roles.includes('nominator')) {
      cachedPanels.push({
        label: <Typography>nominator activity</Typography>,
        content: <NominatorActivityTable />
      });
    }
    return cachedPanels;
  }, [roles]);

  if (roles.includes('validator') || roles.includes('nominator')) {
    return (
      <PaperStyled>
        <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
          Staking
        </Typography>
        <TabsWithPanels panels={panels} tabsLabel='account staking card' />
      </PaperStyled>
    );
  }
  return <></>;
};

export default StakingCard;
