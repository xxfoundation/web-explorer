import { Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import BlockExtrinsics from '../../../../components/block/ExtrinsicsTable';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { Account } from '../../../../schemas/accounts.schema';
import TransferTable from '../../../transfers/TransfersTable';
// import AuthoredBlocksTable from './AuthoredBlocksTable';
// import BalanceHistoryChart from './BalanceHistoryChart';

// const extrinsicTab = (author: string) => ({
//   label: <TabText message={'Extrinsic'} count={0} />,
//   content: <BlockExtrinsics where={{ block: { block_author: { _eq: author } } }} />
// });

// const transfersTab = (author: string) => ({
//   label: <TabText message='Transfers' count={0} />,
//   content: <TransferTable where={{ block: { block_author: { _eq: author } } }} />
// });

// const rolesTab = {
//   label: <Typography>Roles</Typography>,
//   content: <RolesTable />
// };

// const balanceHistoryTab = {
//   label: <Typography>Balance History</Typography>,
//   content: <BalanceHistoryChart />
// };

// const authoredBlocksTab = {
//   label: <Typography>Authored Blocks</Typography>,
//   content: <AuthoredBlocksTable />
// };

const BlockchainCard: FC<{ account: Account }> = ({ account }) => {
  const [extrinsicCount, setExtrinsicCount] = useState<number>();
  const [transferCount, setTransferCount] = useState<number>();
  const memoistPanels = useMemo(() => {
    return [
      {
        label: (
          <TabText
            message={'Extrinsic'}
            count={extrinsicCount === undefined ? '' : extrinsicCount}
          />
        ),
        content: (
          <BlockExtrinsics
            where={{ block: { block_author: { _eq: account.id } } }}
            setCount={setExtrinsicCount}
          />
        )
      },
      {
        label: (
          <TabText message='Transfers' count={transferCount === undefined ? '' : transferCount} />
        ),
        content: (
          <TransferTable
            where={{ block: { block_author: { _eq: account.id } } }}
            setCount={setTransferCount}
          />
        )
      }
    ];
  }, [account.id, extrinsicCount, transferCount]);
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
