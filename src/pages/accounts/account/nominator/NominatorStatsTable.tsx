import type { Validator, NominatorStats, RewardSplit } from '../../../../schemas/staking.schema';

import React, { FC, useMemo, useEffect } from 'react';
import {
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import { Table, TableContainer } from '../../../../components/Tables/Table.styled';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import Dropdown from '../../../../components/Dropdown';
import { usePagination } from '../../../../hooks';
import FormatBalance from '../../../../components/FormatBalance';
import { CustomTooltip } from '../../../../components/Tooltip';
import { InfoOutlined } from '@mui/icons-material';
import XXNetworkAddress from '../../../../components/Hash/XXNetworkAddress';

const ValidatorsList = ({ validator }: { validator?: Validator }) =>
  validator ? 
  <TableRow>
    <TableCell align='left'>
      <XXNetworkAddress truncated='mdDown' value={validator.account_id} roles={{ validator: true }} />
    </TableCell>
    <TableCell align='left'>
      <FormatBalance value={validator.stake} />
    </TableCell>
    <TableCell align='left'>
      {`${validator.share}%`}
    </TableCell>
  </TableRow>
  : <Typography>-</Typography>

const ValidatorsTable = ({ validators }: { validators : Validator[]}) =>  (
  <TableContainer>
    <Table sx={{margin: '1em'}} size='small' className='no-card'>
      <TableRow>
        <TableCell colSpan={9} sx={{ pt: 0, display: 'table-cell !important' }}>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Validator Address</TableCell>
              <TableCell align='left'>Stake</TableCell>
              <TableCell align='left'>Share</TableCell>
            </TableRow>
          </TableHead>
          {validators?.map<React.ReactNode>(
            (validator) => (
              <ValidatorsList
                key={validator.account_id}
                validator={validator}
                />
              )
            )
          }
        </TableCell>
      </TableRow>
    </Table>
  </TableContainer>
);

const RewardsList = ({ reward }: { reward?: RewardSplit }) =>
  reward ? 
  <TableRow>
    <TableCell align='left'>
      <XXNetworkAddress truncated='mdDown' value={reward.account_id} roles={{ validator: true }} />
    </TableCell>
    <TableCell align='left'>
      <FormatBalance value={reward.reward} />
    </TableCell>
  </TableRow>
  : <Typography>-</Typography>

const RewardsTable = ({ rewards }: {rewards : RewardSplit[]}) => (
  <TableContainer>
    <Table sx={{margin: '1em'}} size='small' className='no-card'>
      <TableRow>
        <TableCell colSpan={9} sx={{ pt: 0, display: 'table-cell !important' }}>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Validator Address</TableCell>
              <TableCell align='left'>Reward</TableCell>
            </TableRow>
          </TableHead>
          {rewards?.map<React.ReactNode>(
            (reward) => (
              <RewardsList
                key={reward.account_id}
                reward={reward}
                />
              )
            )
          }
        </TableCell>
      </TableRow>
    </Table>
  </TableContainer>
);

const tableHeader = (header: string, tooltip?: string | JSX.Element) => {
  return tooltip ? (
    <Stack direction='row' sx={{justifyContent: 'space-between'}}>
      <CustomTooltip title={tooltip} arrow>
        <InfoOutlined 
          style={{fontSize: '1em', margin: 'auto', paddingRight: '0.2em'}}
        />
      </CustomTooltip>
      <Typography variant='h4'>{header}</Typography>
    </Stack>
  ) : (
    <Typography variant='h4'>{header}</Typography>
  );
};

const headers = [
  tableHeader('Era'),
  tableHeader('Stake'),
  tableHeader('Rewards')
];

const NominatorStatsRow: FC<{ stats: NominatorStats }> = ({
  stats
}) => {
  return (
    <>
      <TableRow>
        <TableCell data-label='Era'>{stats.era}</TableCell>
        <TableCell data-label='Stake'>
          <Dropdown
            buttonProps={{ color: 'primary' }}
            buttonLabel={<FormatBalance value={stats.stake.toString()} />}
            disabled={!stats.validators || stats.validators.length === 0}
          >
            <ValidatorsTable validators={stats.validators} />
          </Dropdown>
        </TableCell>
        <TableCell data-label='Rewards Split'>
          {stats.reward ?
          <Dropdown
            buttonProps={{ color: 'primary' }}
            buttonLabel={<FormatBalance value={stats.reward.toString()} />}
            disabled={!stats.rewardSplit || stats.rewardSplit.length === 0}
          >
            <RewardsTable rewards={stats.rewardSplit} />
          </Dropdown> : '-'}
        </TableCell>
      </TableRow>
    </>
  );
};

type Props = { stats?: NominatorStats[] };

const NominatorStatsTable: FC<Props> = ({ stats }) => {

  const pagination = usePagination({ rowsPerPage: 10 });
  const { paginate, setCount } = pagination;

  useEffect(() => {
    setCount(stats?.length ?? 0);
  }, [setCount, stats]);

  const paginated = useMemo(() => stats && paginate(stats), [paginate, stats]);

  if (paginated === undefined) {
    return <TableSkeleton rows={pagination.rowsPerPage} cells={headers.length} footer />;
  }
  return (
    <TableContainer>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell key={index}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {paginated.map((s) => (
            <NominatorStatsRow key={s.era} stats={s} />
          ))}
        </TableBody>
      </Table>
      {pagination.controls}
    </TableContainer>
  );
};

export default NominatorStatsTable;
