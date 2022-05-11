import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import BlockExtrinsics from '../../../../components/block/ExtrinsicsTable';
import { PaperStyled } from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import TransferTable from '../../../transfers/TransfersTable';
import { Roles } from '../../types';
import AuthoredBlocksTable from './AuthoredBlocksTable';
import RewardStashTable from './RewardStashTable';
import RolesTable from './RolesTable';

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

const BlockchainCard: FC<{ roles: Roles[] }> = ({ roles }) => {
  const memoistPanels = useMemo(() => {
    const panels = [extrinsicTab, transfersTab, rolesTab, balanceTab];
    if (roles.includes('nominator')) {
      panels.push(rewardsAndStashTab);
    }
    if (roles.includes('validator')) {
      panels.push(authoredBlocksTab);
    }
    return panels;
  }, [roles]);
  return (
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Blockchain
      </Typography>
      <TabsWithPanels panels={memoistPanels} tabsLabel='account blockchain card' />
    </PaperStyled>
  );
};

export default BlockchainCard;
