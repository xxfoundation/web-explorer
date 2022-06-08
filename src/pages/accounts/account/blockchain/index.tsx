import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import AccountExtrinsics from './AccountExtrinsics';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import { Account, GET_EXTRINSIC_COUNTS, GetExtrinsicCounts } from '../../../../schemas/accounts.schema';
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
  const query = useQuery<GetExtrinsicCounts>(
    GET_EXTRINSIC_COUNTS,
    { variables: { accountId: account.id } }
  );

  const extrinsicCount = query.data?.extrinsicCount.aggregate.count;
  const transferCount = query.data?.transferCount.aggregate.count;

  const transferWhereClause = useMemo(() => ({
    _or: [
      { destination:  { _eq: account.id } },
      { source: { _eq: account.id } }
    ]
  }), [account]);

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
          <AccountExtrinsics accountId={account.id} />
        )
      },
      {
        label: (
          <TabText message='Transfers' count={transferCount === undefined ? '' : transferCount} />
        ),
        content: (
          <TransferTable
            where={transferWhereClause}
          />
        )
      }
    ];
  }, [account.id, extrinsicCount, transferCount, transferWhereClause]);

  // eslint-disable-next-line no-console
  console.log(query);
  
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
