import type { AddressFilters } from '../../../../components/Tables/filters/AddressFilter';

import { useQuery } from '@apollo/client';
import { Box, Skeleton } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';

import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import ExtrinsicsTable from '../../../../components/block/ExtrinsicsTable';
import {
  Account,
  GET_EXTRINSIC_COUNTS,
  GetExtrinsicCounts
} from '../../../../schemas/accounts.schema';
import TransferTable from '../../../transfers/TransfersTable';
import AddressFilter from '../../../../components/Tables/filters/AddressFilter';
import AccountTile from '../../../../components/AccountTile';
import { TabText } from '../../../../components/Tabs';

type Props = {
  account: Account;
};

const BlockchainCard: FC<Props> = ({ account }) => {
  const [filters, setFilters] = useState<AddressFilters>({});
  const { data, loading } = useQuery<GetExtrinsicCounts>(GET_EXTRINSIC_COUNTS, {
    variables: { accountId: account.id }
  });

  const extrinsicCount = data?.extrinsicCount.aggregate.count;
  const transferCount = data?.transferCount.aggregate.count;

  const panels = useMemo(() => {
    const transferWhereClause = {
      _or: [{ destination: { _eq: account.id } }, { source: { _eq: account.id } }]
    };

    const tabs = loading
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
            content: <ExtrinsicsTable accountId={account.id} />
          },
          {
            label: (
              <TabText
                message={'Transfers'}
                count={transferCount === undefined ? '' : transferCount}
              />
            ),
            content: (
              <>
                <Box sx={{ textAlign: 'right', mt: -4.5 }}>
                  <AddressFilter
                    label={'Filters '}
                    address={account.id}
                    value={filters}
                    onChange={setFilters}
                  />
                </Box>
                <TransferTable filters={filters} where={transferWhereClause} />
              </>
            )
          }
        ];

    return tabs;
  }, [account.id, loading, extrinsicCount, transferCount, filters]);

  return (
    <AccountTile panels={panels} tabsLabel='account blockchain card' title='Blockchain' />
  );
};

export default BlockchainCard;
