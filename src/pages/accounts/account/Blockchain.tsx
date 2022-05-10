import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import BlockExtrinsics from '../../../components/block/ExtrinsicsTable';
import TabsWithPanels, { TabText } from '../../../components/Tabs';
import TransferTable from '../../transfers/TransfersTable';
import { Roles } from '../types';
import AuthoredBlocksTable from './blockchain/AuthoredBlocksTable';
import RewardStashTable from './blockchain/RewardStashTable';
import RolesTable from './blockchain/RolesTable';

const extrinsicTab = {
  label: <TabText message={'Extrinsic'} count={0} />,
  content: <BlockExtrinsics />
};

const transfersTab = {
  label: <TabText message='Tranfers' count={0} />,
  content: <TransferTable />
};

const rolesTab = {
  label: <Typography>Roles</Typography>,
  content: <RolesTable />
};

const balanceTab = {
  label: <Typography>Balance history</Typography>,
  content: <Typography>Balance history (chart)</Typography>
};

const rewardsAndStashTab = {
  label: <TabText message='rewards & stash' count={0} />,
  content: <RewardStashTable />
};

const authoredBlocksTab = {
  label: <Typography>authored blocks</Typography>,
  content: <AuthoredBlocksTable />
};

const Blockchain: FC<{ role: Roles; id?: string; address?: string }> = ({ role }) => {
  const panels = useMemo(() => {
    if (role === 'nominator') {
      return [extrinsicTab, transfersTab, rewardsAndStashTab, rolesTab, balanceTab];
    }
    if (role === 'validator') {
      return [extrinsicTab, transfersTab, rolesTab, balanceTab, authoredBlocksTab];
    }
    if (role === 'council') {
      return [extrinsicTab, transfersTab, rolesTab, balanceTab];
    }
    return [];
  }, [role]);
  return (
    <TabsWithPanels
      header={
        <Typography fontSize={26} fontWeight={500} letterSpacing={'3%'} marginBottom={'10px'}>
          Blockchain
        </Typography>
      }
      panels={panels}
      tabsLabel='account blockchain card'
    />
  );
};

export default Blockchain;
