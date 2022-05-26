import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import BlockExtrinsics from '../../../../components/block/ExtrinsicsTable';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { Roles } from '../../../../schemas/accounts.schema';
import TransferTable from '../../../transfers/TransfersTable';
import AuthoredBlocksTable from './AuthoredBlocksTable';
import BalanceHistoryChart from './BalanceHistoryChart';
import RolesTable from './RolesTable';

const extrinsicTab = {
  label: <TabText message={'Extrinsic'} count={0} />,
  content: (
    <BlockExtrinsics
      where={{
        block_number: {
          _eq: 2597151
        }
      }}
    />
  )
};

const transfersTab = {
  label: <TabText message='Transfers' count={0} />,
  content: <TransferTable />
};

const rolesTab = {
  label: <Typography>Roles</Typography>,
  content: <RolesTable />
};

const balanceHistoryTab = {
  label: <Typography>Balance History</Typography>,
  content: <BalanceHistoryChart />
};

const authoredBlocksTab = {
  label: <Typography>Authored Blocks</Typography>,
  content: <AuthoredBlocksTable />
};

const BlockchainCard: FC<{ roles: Roles[] }> = ({ roles }) => {
  const memoistPanels = useMemo(() => {
    const panels = [extrinsicTab, transfersTab, rolesTab, balanceHistoryTab];
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
