import { useQuery } from '@apollo/client';
import { Typography, Skeleton } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import ExtrinsicsTable from '../../../../components/block/ExtrinsicsTable';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../../components/Tabs';
import {
  Account,
  GET_EXTRINSIC_COUNTS,
  GetExtrinsicCounts
} from '../../../../schemas/accounts.schema';
import TransferTable from '../../../transfers/TransfersTable';

const BlockchainCard: FC<{ account: Account }> = ({ account }) => {
  const { data, loading } = useQuery<GetExtrinsicCounts>(GET_EXTRINSIC_COUNTS, {
    variables: { accountId: account.id }
  });

  const extrinsicCount = data?.extrinsicCount.aggregate.count;
  const transferCount = data?.transferCount.aggregate.count;

  const panels = useMemo(() => {
    const transferWhereClause = {
      _or: [{ destination: { _eq: account.id } }, { source: { _eq: account.id } }]
    };
    const where = {
      signer: {
        _eq: account.id
      }
    };
    return loading
      ? [
          {
            label: <Skeleton width={'90%'} />,
            content: <TableSkeleton rows={2} cells={1} />
          },
          {
            label: <Skeleton width={'90%'} />,
            content: <TableSkeleton rows={2} cells={1} />
          }
        ]
      : [
          {
            label: (
              <TabText
                message={'Extrinsic'}
                count={extrinsicCount === undefined ? '' : extrinsicCount}
              />
            ),
            content: <ExtrinsicsTable where={where} />
          },
          {
            label: (
              <TabText
                message='Transfers'
                count={transferCount === undefined ? '' : transferCount}
              />
            ),
            content: <TransferTable where={transferWhereClause} />
          }
        ];
  }, [account.id, loading, extrinsicCount, transferCount]);

  return (
    <PaperStyled>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Blockchain
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account blockchain card' />
    </PaperStyled>
  );
};

export default BlockchainCard;
