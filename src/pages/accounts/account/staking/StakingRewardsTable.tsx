import { useQuery } from '@apollo/client';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
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
import DownloadDataButton from '../../../../components/buttons/DownloadDataButton';
import { ExportToCsv } from 'export-to-csv';

const DEFAULT_ROWS_PER_PAGE = 10;
const headers = BaseLineCellsWrapper(['Validator', 'Block Number', 'Era', 'Amount', 'Timestamp']);

const RewardsRow = (reward: StakingReward) => {
  return BaseLineCellsWrapper([
    <XXNetworkAddress
      truncated='mdDown'
      value={reward.validatorAddress}
      name={reward?.identity?.display}
      roles={{ validator: true }}
    />,
    <Link to={`/blocks/${reward.blockNumber}`}>{reward.blockNumber}</Link>,
    reward.era,
    <FormatBalance value={reward.amount.toString()} />,
    <TimeAgoComponent date={reward.timestamp} />
  ]);
};

interface CSVRow {
  'Payout Date': string;
  'Block Number': number;
  'Reward Date': string;
  'Era': number;
  'Validator Address': string;
  'Validator ID': string;
  'Amount': number;
}

const eraTime = 86400000;
const genesisTime = 1637132496000;

const StakingRewardsTable: FC<{
  accountId: string;
  sum?: number;
}> = ({ accountId, sum }) => {
  const stakingRewards = useQuery<GetStakingRewards>(GET_STAKING_REWARDS, {
    variables: { accountId }
  });
  const rewards = stakingRewards.data?.rewards;
  const pagination = usePagination({ rowsPerPage: DEFAULT_ROWS_PER_PAGE });
  const { paginate, setCount } = pagination;

  const options = {
    filename: 'rewards_' + accountId,
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const [csvData, setCsvData] = useState<CSVRow[]>();
  const csvExporter = new ExportToCsv(options);

  useEffect(() => {
    if (stakingRewards.data?.aggregates?.aggregate) {
      setCount(stakingRewards.data?.aggregates?.aggregate.count);
      setCsvData(stakingRewards.data?.rewards.map((el) => {
        return {
          'Payout Date': dayjs.utc(el.timestamp).format('ll LTS Z'),
          'Block Number': el.blockNumber,
          'Reward Date': dayjs.utc((el.era+1)*eraTime+genesisTime).format('ll LTS Z'),
          'Era': el.era,
          'Validator Address': el.validatorAddress,
          'Validator ID': el.identity?.display || '',
          'Amount': el.amount / 1e9,
        }
      }))
    }
  }, [setCount, setCsvData, stakingRewards.data]);

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
        footer={(
          <>
            <Divider />
            <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
              <DownloadDataButton onClick={() => {
                csvExporter.generateCsv(csvData);
              }}>
                CSV
              </DownloadDataButton>
              {pagination.controls}
            </Stack>
          </>
        )}
      />
    </>
  );
};

export default StakingRewardsTable;
