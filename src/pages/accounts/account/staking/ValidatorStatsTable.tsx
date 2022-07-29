import type { ValidatorStats } from '../../../../schemas/staking.schema';
import { GET_BLOCKS_BY_BP, ProducedBlocks } from '../../../../schemas/blocks.schema';

import React, { FC, useMemo, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { TableStyled } from '../../../../components/Tables/TableContainer.styled';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import Link from '../../../../components/Link';
import { usePagination, useToggle } from '../../../../hooks';
import Error from '../../../../components/Error';
import FormatBalance from '../../../../components/FormatBalance';
import { useQuery } from '@apollo/client';

const tableHeader = (header: string, tooltip?: string | JSX.Element) => {
  return tooltip ? (
    <Tooltip title={tooltip} arrow>
      <Typography variant='h4'>{header}</Typography>
    </Tooltip>
  ) : (
    <Typography variant='h4'>{header}</Typography>
  );
};

const commissionTooltip = 'Portion of rewards the validator takes to cover operating costs.';

const pointsTooltip = (
  <>
    For authoring a block: 130 points
    <br />
    Per completed cmix round: 10 points
    <br />
    Per failed cmix realtime round: -20 points
  </>
);

const rewardsTooltip =
  'Total amount of xx earned by the validator in that era. Validator will take his commission (%) out of the total and the remainder is split among the nominators and himself according to their stake.';

const relativePerformanceTooltip =
  'Comparison with best performing validator of the era. [own_points / max_points]';

const headers = [
  tableHeader('Era'),
  tableHeader('Commission', commissionTooltip),
  tableHeader('Own Stake'),
  tableHeader('Other Stake'),
  tableHeader('Total Stake'),
  tableHeader('Points', pointsTooltip),
  tableHeader('Relative Performance', relativePerformanceTooltip),
  tableHeader('Rewards', rewardsTooltip),
  tableHeader('Blocks Produced')
];

const BlockLink = ({ block }: { block?: number }) =>
  block ? <Link to={`/blocks/${block}`}>{block}</Link> : <Typography>-</Typography>;

const ValidatorStatsRow: FC<{ stats: ValidatorStats; producedBlocks?: ProducedBlocks }> = ({
  producedBlocks,
  stats
}) => {
  const [expanded, { toggle }] = useToggle();
  const blocksProduced = useMemo(
    () =>
      producedBlocks?.blocks
        .filter((b) => b.currentEra === stats.era)
        .sort((a, b) => b.number - a.number)
        .map((b) => b.number),
    [producedBlocks, stats.era]
  );

  const endIcon = useMemo(
    () =>
      blocksProduced && blocksProduced?.length > 0 ? (
        expanded ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )
      ) : undefined,
    [blocksProduced, expanded]
  );

  return (
    <>
      <TableRow>
        <TableCell>{stats.era}</TableCell>
        <TableCell>{stats.commission.toFixed(2)} %</TableCell>
        <TableCell>
          <FormatBalance value={stats.selfStake.toString()} />
        </TableCell>
        <TableCell>
          <FormatBalance value={stats.otherStake.toString()} />
        </TableCell>
        <TableCell>
          <FormatBalance value={stats.totalStake.toString()} />
        </TableCell>
        <TableCell>{stats.points ?? '-'}</TableCell>
        <TableCell>
          {stats.relativePerformance !== null ? (stats.relativePerformance * 100)?.toFixed(2) : '-'}
        </TableCell>
        <TableCell>
          {stats.reward !== null ? <FormatBalance value={stats.reward.toString()} /> : '-'}
        </TableCell>
        <TableCell>
          <Button
            disabled={!blocksProduced || blocksProduced.length === 0}
            variant='text'
            endIcon={endIcon}
            onClick={toggle}
          >
            {blocksProduced?.length}
          </Button>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={9} sx={{ pt: 0 }}>
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
    <TableStyled>
      <Table>
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
    </TableStyled>
  );
};

export default ValidatorStatsTable;
