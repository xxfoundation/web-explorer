import type { AddressFilters } from '../../../../components/Tables/filters/AddressFilter';

import { useQuery } from '@apollo/client';
import { Box, Typography, Skeleton } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';

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
import NominatorsTable from '../staking/NominatorsTable';
import AddressFilter from '../../../../components/Tables/filters/AddressFilter';
import { GET_BLOCKS_BY_BP, ProducedBlocks } from '../../../../schemas/blocks.schema';
import ValidatorStatsTable from '../staking/ValidatorStatsTable';
import { GetValidatorStats } from '../../../../schemas/staking.schema';

type Props = {
  account: Account;
  validator?: GetValidatorStats;
};

const BlockchainCard: FC<Props> = ({ account, validator }) => {
  const [filters, setFilters] = useState<AddressFilters>({});
  const { data, loading } = useQuery<GetExtrinsicCounts>(GET_EXTRINSIC_COUNTS, {
    variables: { accountId: account.id }
  });

  const variables = useMemo(() => {
    return {
      orderBy: [{ block_number: 'desc' }],
      where: {
        block_author: { _eq: account.id },
        finalized: { _eq: true }
      }
    };
  }, [account.id]);
  const blocksProducedQuery = useQuery<ProducedBlocks>(GET_BLOCKS_BY_BP, { variables });

  const extrinsicCount = data?.extrinsicCount.aggregate.count;
  const transferCount = data?.transferCount.aggregate.count;
  const statsCount = validator?.aggregates.aggregate.count;
  const nominators = validator?.stats[0]?.nominators
    ?.slice()
    .sort((a, b) => parseFloat(b.share) - parseFloat(a.share));

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

    if (!loading && account.roles.validator && validator !== undefined) {
      tabs.push({
        label: <TabText message='nominators' count={nominators?.length} />,
        content: <NominatorsTable nominators={nominators} />
      });
      tabs.push({
        label: <TabText message='Validator Stats' count={statsCount} />,
        content: (
          <ValidatorStatsTable
            producedBlocks={blocksProducedQuery.data}
            error={!!blocksProducedQuery.error}
            stats={validator?.stats}
          />
        )
      });
    }

    return tabs;
  }, [
    account.id,
    account.roles.validator,
    loading,
    extrinsicCount,
    transferCount,
    filters,
    nominators,
    statsCount,
    blocksProducedQuery.data,
    blocksProducedQuery.error,
    validator
  ]);

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
