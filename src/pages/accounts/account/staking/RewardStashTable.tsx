import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { FC, useEffect, useMemo } from 'react';
import FormatBalance from '../../../../components/FormatBalance';
import XXNetworkAddress from '../../../../components/Hash/XXNetworkAddress';
import Link from '../../../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../../../components/Tables';
import TimeAgoComponent from '../../../../components/TimeAgo';
import usePagination from '../../../../hooks/usePagination';
import {
  GetStakingRewards,
  GET_STAKING_REWARDS,
  StakingReward
} from '../../../../schemas/staking.schema';

const DEFAULT_ROWS_PER_PAGE = 10;
const headers = BaseLineCellsWrapper([
  'Validator Account',
  'Block Number',
  'Era',
  'Amount',
  'Timestamp'
]);

const RewardsRow = (reward: StakingReward) => {
  return BaseLineCellsWrapper([
    <XXNetworkAddress truncated='mdDown' value={reward.validatorAddress} />,
    <Link to={`/blocks/${reward.blockNumber}`}>{reward.blockNumber}</Link>,
    reward.era,
    <FormatBalance value={reward.amount.toString()} />,
    <TimeAgoComponent date={reward.timestamp} />
  ]);
};

const RewardStashTable: FC<{
  accountId: string;
  sum?: number;
}> = ({ accountId, sum }) => {
  const stakingRewards = useQuery<GetStakingRewards>(GET_STAKING_REWARDS, {
    variables: { accountId }
  });
  const rewards = stakingRewards.data?.rewards;
  const pagination = usePagination({ rowsPerPage: DEFAULT_ROWS_PER_PAGE });
  const { paginate, setCount } = pagination;

  useEffect(() => {
    if (stakingRewards.data?.aggregates?.aggregate) {
      setCount(stakingRewards.data?.aggregates?.aggregate.count);
    }
  }, [setCount, stakingRewards.data?.aggregates?.aggregate]);

  const paginated = useMemo(
    () => rewards && paginate(rewards).map(RewardsRow),
    [paginate, rewards]
  );

  return (
    <>
      {sum && (
        <Typography
          variant='body3'
          sx={{ mb: '1em', px: '1px', display: 'block', textAlign: 'right' }}
        >
          <b>Total Rewards:</b> <FormatBalance value={sum.toString()} />
        </Typography>
      )}
      <BaselineTable
        loading={paginated === undefined}
        headers={headers}
        rows={paginated ?? []}
        rowsPerPage={pagination.rowsPerPage}
        footer={pagination.controls}
      />
    </>
  );
};

export default RewardStashTable;
