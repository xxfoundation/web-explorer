import type { ValidatorStats } from '../../../../schemas/accounts.schema';
import type { Block } from '../../../../schemas/blocks.schema';

import React, { FC, useMemo, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { TableStyled } from '../../../../components/Tables/TableContainer.styled';
import { TableSkeleton } from '../../../../components/Tables/TableSkeleton';
import Link from '../../../../components/Link';
import { usePagination, useToggle } from '../../../../hooks';
import Error from '../../../../components/Error';
import FormatBalance from '../../../../components/FormatBalance';

const headers = [
  'Era',
  'Points',
  'Commission',
  'Own Stake',
  'Other Stake',
  'Total Stake',
  'Relative Performance',
  'Rewards',
  'Blocks Produced'
];

const BlockLink = ({ block }: { block?: number }) => block
  ? <Link to={`/blocks/${block}`}>{block}</Link>
  : <Typography>N/A</Typography>;
  
const ValidatorStatsRow: FC<{ stats: ValidatorStats, blocks?: Block[] }> = ({ blocks, stats }) => {
  const [expanded, { toggle }] = useToggle();
  const blocksProduced = useMemo(
    () => blocks?.filter((b) => b.currentEra === stats.era)
      .map((b) => b.number),
    [blocks, stats.era]
  );

  const endIcon = useMemo(
    () => blocksProduced && blocksProduced?.length > 0
      ? (expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)
      : undefined,
    [blocksProduced, expanded]
  );

  return (
    <>
      <TableRow>
        <TableCell>
          {stats.era}
        </TableCell>
        <TableCell>
          {stats.points ?? 'N/A'}
        </TableCell>
        <TableCell>
          {stats.commission} %
        </TableCell>
        <TableCell>
          <FormatBalance value={stats.selfStake.toString()} />
        </TableCell>
        <TableCell>
          <FormatBalance value={stats.otherStake.toString()} />
        </TableCell>
        <TableCell>
          <FormatBalance value={stats.totalStake.toString()} />
        </TableCell>
        <TableCell>
          {stats.relativePerformance !== null
            ? (stats.relativePerformance * 100)?.toFixed(2)
            : 'N/A'
          }
        </TableCell>
        <TableCell>
          {stats.reward !== null 
            ? <FormatBalance value={stats.reward.toString()} />
            : 'N/A'
          }
        </TableCell>
        <TableCell>
          <Button disabled={!blocksProduced || blocksProduced.length === 0} variant='text' endIcon={endIcon} onClick={toggle}>
            {blocksProduced?.length}
          </Button>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={9} sx={{ pt: 0}}>
            {blocksProduced?.map<React.ReactNode>
              ((block) => <BlockLink key={block} block={block} />)
              .reduce((prev, curr) => [prev, ', ', curr])}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

type Props = { error: boolean, stats?: ValidatorStats[], blocks?: Block[] };

const ValidatorStatsList: FC<Props> = ({ blocks, error, stats }) => {
  const pagination = usePagination({ rowsPerPage: 10 });
  const { paginate, setCount } = pagination;

  useEffect(() => {
    setCount(stats?.length ?? 0);
  }, [setCount, stats]);

  const paginated = useMemo(() => stats && paginate(stats), [paginate, stats]);

  if (paginated === undefined) {
    return (
      <TableSkeleton
        rows={pagination.rowsPerPage}
        cells={headers.length}
        footer />
    );
  }

  return (
    <TableStyled>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => <TableCell key={header}>{header}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {error && <TableRow><TableCell colSpan={headers.length}><Error type='data-unavailable' /></TableCell></TableRow>}
          {paginated.map((s) => <ValidatorStatsRow key={s.era} stats={s} blocks={blocks} />)}
        </TableBody>
      </Table>
      {pagination.controls}
    </TableStyled>
  )
};

export default ValidatorStatsList;
