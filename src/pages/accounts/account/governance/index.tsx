import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { PaperStyled } from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';
import IdentityActivityTable from './IdentityActivityTable';
import StakingActivityTable from './StakingActivityTable';

const stakingActivityTab = {
  label: <Typography>staking activity</Typography>,
  content: <StakingActivityTable />
};

const identityActivityTab = {
  label: <Typography>identity activity</Typography>,
  content: <IdentityActivityTable />
};

const referendaActivityTab = {
  label: <Typography>Referenda Activity</Typography>,
  content: <Typography>content</Typography>
};

const proposalActivityTab = {
  label: <Typography>proposal activity</Typography>,
  content: <Typography>content</Typography>
};

const unbondingTab = {
  label: <Typography>unbonding</Typography>,
  content: <Typography>unbonding</Typography>
};

const councilMotionsTab = {
  label: <Typography>council motions</Typography>,
  content: <Typography>council motions placeholder</Typography>
};

const electionActivityTab = {
  label: <Typography>electrion activity</Typography>,
  content: <Typography>election activity placeholder</Typography>
};

const techCommitteActivityTab = {
  label: <Typography>tech committee activity tab</Typography>,
  content: <Typography>tech committee activity placeholder</Typography>
};

const GovernanceCard: FC<{ roles: Roles[] }> = ({ roles }) => {
  const memoistPanels = useMemo(() => {
    const panels = [identityActivityTab, referendaActivityTab, proposalActivityTab];
    if (roles.includes('nominator') || roles.includes('council')) {
      // panels += [stakingActivityTab, unbondingTab];
      panels.push(stakingActivityTab);
      panels.push(unbondingTab);
    }
    if (roles.includes('validator')) {
      panels.push(councilMotionsTab);
      panels.push(electionActivityTab);
    }
    if (roles.includes('tech committee')) {
      panels.push(techCommitteActivityTab);
    }
    return panels;
  }, [roles]);
  return (
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} letterSpacing={'3%'} marginBottom={'10px'}>
        Governance
      </Typography>
      <TabsWithPanels panels={memoistPanels} tabsLabel='account governance card' />
    </PaperStyled>
  );
};

export default GovernanceCard;
