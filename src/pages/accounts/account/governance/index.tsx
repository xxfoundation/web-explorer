import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../../../schemas/accounts.schema';
import CouncilActivityTable from './CouncilActivityTable';
import ElectionActivityTable from './ElectionActivityTable';
import IdentityActivityTable from './IdentityActivityTable';
import ProposalActivityTable from './ProposalActivityTable';
import ReferendaActivityTable from './ReferendaActivityTable';
import TechCommitteeActivityTable from './TechCommitteeActivityTable';

const identityActivityTab = {
  label: <Typography>identity activity</Typography>,
  content: <IdentityActivityTable />
};

const referendaActivityTab = {
  label: <Typography>Referenda Activity</Typography>,
  content: <ReferendaActivityTable />
};

const proposalActivityTab = {
  label: <Typography>proposal activity</Typography>,
  content: <ProposalActivityTable />
};

const councilActivityTab = {
  label: <Typography>Council Activity</Typography>,
  content: <CouncilActivityTable />
};

const electionActivityTab = {
  label: <Typography>Election Activity</Typography>,
  content: <ElectionActivityTable />
};

const techCommitteActivityTab = {
  label: <Typography>tech committee activity</Typography>,
  content: <TechCommitteeActivityTable />
};

const GovernanceCard: FC<{ roles: (keyof Roles)[] }> = ({ roles }) => {
  const memoistPanels = useMemo(() => {
    const panels = [identityActivityTab, proposalActivityTab, referendaActivityTab];
    if (roles.includes('nominator')) {
      panels.push(electionActivityTab);
      panels.push(councilActivityTab);
    }
    if (roles.includes('techcommit')) {
      panels.push(techCommitteActivityTab);
    }
    return panels;
  }, [roles]);
  return (
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Governance
      </Typography>
      <TabsWithPanels panels={memoistPanels} tabsLabel='account governance card' />
    </PaperStyled>
  );
};

export default GovernanceCard;
