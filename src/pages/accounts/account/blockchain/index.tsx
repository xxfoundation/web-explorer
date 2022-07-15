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
  GetExtrinsicCounts,
  GetValidatorStats,
  GET_VALIDATOR_STATS
} from '../../../../schemas/accounts.schema';
import { CommonFieldsRankingFragment } from '../../../../schemas/ranking.schema';
import TransferTable from '../../../transfers/TransfersTable';
import ValidatorStats from '../staking/ValidatorStatsList';
import NominatorsTable from '../../../producer/NominatorsTable';
import { GetBlocksByBP, GET_BLOCKS_BY_BP } from '../../../../schemas/blocks.schema';

type Props = {
  account: Account;
  ranking: CommonFieldsRankingFragment | undefined;
};

const BlockchainCard: FC<Props> = ({ account, ranking }) => {
  const { data, loading } = useQuery<GetExtrinsicCounts>(GET_EXTRINSIC_COUNTS, {
    variables: { accountId: account.id }
  });

  const validatorStatsQuery = useQuery<GetValidatorStats>(GET_VALIDATOR_STATS, { variables: { address: account.id } })
  const blocksProducedQuery = useQuery<GetBlocksByBP, { producerId: string }>(
    GET_BLOCKS_BY_BP,
    { variables: { producerId: account.id } }
  )
  const extrinsicCount = data?.extrinsicCount.aggregate.count;
  const transferCount = data?.transferCount.aggregate.count;
  const statsCount = validatorStatsQuery.data?.aggregates.aggregate.count;
  const nominators = validatorStatsQuery.data?.stats[0]?.nominators;

  const panels = useMemo(() => {
    const transferWhereClause = {
      _or: [{ destination: { _eq: account.id } }, { source: { _eq: account.id } }]
    };
    const where = {
      signer: {
        _eq: account.id
      }
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
            content: <ExtrinsicsTable where={where} />
          },
          {
            label: (
              <TabText
                message={'Transfers'}
                count={transferCount === undefined ? '' : transferCount}
              />
            ),
            content: <TransferTable where={transferWhereClause} />
          }
        ];
        
    if (!loading && account.roles.validator && ranking !== undefined) {
      tabs.push({
        label: <TabText message='nominators' count={nominators?.length} />,
        content: <NominatorsTable nominations={nominators} />
      });
      tabs.push({
        label: <TabText message='Validator Stats' count={statsCount} />,
        content: (
          <ValidatorStats
            blocks={blocksProducedQuery.data?.blocks}
            error={!!validatorStatsQuery.error || !!blocksProducedQuery.error}
            stats={validatorStatsQuery.data?.stats} />
        )
      });
    }

    return tabs;
  }, [account.id, account.roles.validator, loading, extrinsicCount, transferCount, ranking, nominators, statsCount, blocksProducedQuery.data?.blocks, blocksProducedQuery.error, validatorStatsQuery.error, validatorStatsQuery.data?.stats]);

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
