import type { Nominator, ValidatorStats } from '../../../../schemas/staking.schema';
import { GET_BLOCKS_BY_BP, ProducedBlocks } from '../../../../schemas/blocks.schema';

import React, { FC, useMemo, useEffect } from 'react';
import {
  Button,
  Stack,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';

import { Table, TableContainer } from '../../../../components/Tables/Table.styled';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import Link from '../../../../components/Link';
import Dropdown from '../../../../components/Dropdown';
import { usePagination, useToggle } from '../../../../hooks';
import Error from '../../../../components/Error';
import FormatBalance from '../../../../components/FormatBalance';
import { useQuery } from '@apollo/client';
import { CustomTooltip } from '../../../../components/Tooltip';
import { InfoOutlined } from '@mui/icons-material';
import XXNetworkAddress from '../../../../components/Hash/XXNetworkAddress';

const NominatorsList = ({ nominator }: { nominator?: Nominator }) =>
  nominator ? 
  <TableRow>
    <TableCell align='left'>
      <XXNetworkAddress truncated='mdDown' value={nominator.account_id} roles={{ nominator: true }} />
    </TableCell>
    <TableCell align='left'>
      <FormatBalance value={nominator.stake} />
    </TableCell>
    <TableCell align='left'>
      {`${nominator.share}%`}
    </TableCell>
  </TableRow>
  : <Typography>-</Typography>

const NominatorsTable: FC<{ nominators : Nominator[]}> = ({ nominators }) =>  {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Table sx={{margin: '1em'}} size='small' className='no-card'>
        <TableRow>
          <TableCell colSpan={9} sx={{ pt: 0, display: 'table-cell !important' }}>
            <TableHead>
              <TableRow>
                <TableCell align='left'>{t('Account Id')}</TableCell>
                <TableCell align='left'>{t('Stake')}</TableCell>
                <TableCell align='left'>{t('Share')}</TableCell>
              </TableRow>
            </TableHead>
            {nominators?.map<React.ReactNode>(
              (nominator) => (
                <NominatorsList
                  key={nominator.account_id}
                  nominator={nominator}
                  />
                )
              )
            }
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
}
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

const BlockLink = ({ block }: { block?: number }) =>
  block ? <Link to={`/blocks/${block}`}>{block}</Link> : <Typography>-</Typography>;

const ValidatorStatsRow: FC<{ stats: ValidatorStats; producedBlocks?: ProducedBlocks }> = ({
  producedBlocks,
  stats
}) => {
  const { t } = useTranslation();
  
  const [expandedBlocks, toggleBlocks] = useToggle();
  const blocksProduced = useMemo(
    () =>
      producedBlocks?.blocks
        .filter((b) => b.currentEra === stats.era)
        .sort((a, b) => b.number - a.number)
        .map((b) => b.number),
    [producedBlocks, stats.era]
  );
  const endIconBlocks = useMemo(
    () =>
      blocksProduced && blocksProduced?.length > 0 ? (
        expandedBlocks ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )
      ) : undefined,
    [blocksProduced, expandedBlocks]
  );

  return (
    <>
      <TableRow>
        <TableCell data-label={t('Era')}>{stats.era}</TableCell>
        <TableCell data-label={t('Commission')}>{stats.commission.toFixed(2)} %</TableCell>
        <TableCell data-label={t('Self Stake')}>
          <FormatBalance value={stats.selfStake.toString()} />
        </TableCell>
        <TableCell data-label={t('Other Stake')}>
          <Dropdown
            buttonProps={{ color: 'primary' }}
            buttonLabel={<FormatBalance value={stats.otherStake.toString()} />}
            disabled={!stats.nominators || stats.nominators.length === 0}
          >
            <NominatorsTable nominators={stats.nominators} />
          </Dropdown>
        </TableCell>
        <TableCell data-label={t('Total Stake')}>
          <FormatBalance value={stats.totalStake.toString()} />
        </TableCell>
        <TableCell data-label={t('Points')}>{stats.points ?? '-'}</TableCell>
        <TableCell data-label={t('Performance')}>
          {stats.relativePerformance !== null ? (stats.relativePerformance * 100)?.toFixed(2) : '-'}
        </TableCell>
        <TableCell data-label={t('Reward')}>
          {stats.reward !== null ? <FormatBalance value={stats.reward.toString()} /> : '-'}
        </TableCell>
        <TableCell data-label={t('Blocks Produced')}>
          <Button
            disabled={!blocksProduced || blocksProduced.length === 0}
            variant='text'
            endIcon={endIconBlocks}
            onClick={toggleBlocks.toggle}
          >
            {blocksProduced?.length}
          </Button>
        </TableCell>
      </TableRow>
      {expandedBlocks && (
        <TableRow>
          <TableCell colSpan={9} sx={{ pt: 0, display: 'table-cell !important' }}>
            {blocksProduced
              ?.map<React.ReactNode>((block) => <BlockLink key={block} block={block} />)
              .reduce((prev, curr) => [prev, ', ', curr])}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

type Props = { accountId?: string; stats?: ValidatorStats[] };

const ValidatorStatsTable: FC<Props> = ({ accountId, stats }) => {
  const { t } = useTranslation();
  
  const commissionTooltip = t('Portion of rewards the validator takes to cover operating costs.');

  const pointsTooltip = useMemo(() => (
    <>
      {t('For authoring a block: 130 points')}
      <br />
      {t('Per completed cmix round: 10 points')}
      <br />
      {t('Per failed cmix realtime round: -20 points')}
    </>
  ), [t]);

  const rewardsTooltip =
    t('Total amount of xx earned by the validator in that era. Validator will take his commission (%) out of the total and the remainder is split among the nominators and himself according to their stake.');

  const relativePerformanceTooltip =
    t('Comparison with best performing validator of the era. [own_points / max_points]');

  const headers = useMemo(() => [
    tableHeader(t('Era')),
    tableHeader(t('Commission'), commissionTooltip),
    tableHeader(t('Own Stake')),
    tableHeader(t('Other Stake')),
    tableHeader(t('Total Stake')),
    tableHeader(t('Points'), pointsTooltip),
    tableHeader(t('Relative Performance'), relativePerformanceTooltip),
    tableHeader(t('Rewards'), rewardsTooltip),
    tableHeader(t('Blocks Produced'))
  ], [commissionTooltip, pointsTooltip, relativePerformanceTooltip, rewardsTooltip, t]);
  const variables = useMemo(() => {
    return {
      orderBy: [{ block_number: 'desc' }],
      where: {
        block_author: { _eq: accountId },
        finalized: { _eq: true }
      }
    };
  }, [accountId]);
  const blocksProducedQuery = useQuery<ProducedBlocks>(GET_BLOCKS_BY_BP, { variables });
  const producedBlocks = blocksProducedQuery.data;

  const pagination = usePagination({ rowsPerPage: 10 });
  const { paginate, setCount } = pagination;

  useEffect(() => {
    setCount(stats?.length ?? 0);
  }, [setCount, stats]);

  const paginated = useMemo(() => stats && paginate(stats), [paginate, stats]);

  if (paginated === undefined || blocksProducedQuery.loading) {
    return <TableSkeleton rows={pagination.rowsPerPage} cells={headers.length} footer />;
  }

  if (blocksProducedQuery.error) {
    return <Error type='data-unavailable' />;
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
            <ValidatorStatsRow key={s.era} stats={s} producedBlocks={producedBlocks} />
          ))}
        </TableBody>
      </Table>
      {pagination.controls}
    </TableContainer>
  );
};

export default ValidatorStatsTable;
