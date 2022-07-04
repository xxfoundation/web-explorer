import type { EraPointsHistory } from './types';

import React, { FC, useMemo, useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import Link from '../../components/Link';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { GET_BLOCKS_BY_BP, GetBlocksByBP } from '../../schemas/blocks.schema';
import { usePagination, useToggle } from '../../hooks';

const headers = BaseLineCellsWrapper([
  'Era',
  'Start Block',
  'End Block',
  'Reward Points',
  'Blocks Produced'
]);

type EraPoints = {
  era: number;
  rewarded: number;
  startBlock?: number;
  endBlock?: number ;
  blocksProduced: number[];
};

const BlockLink = ({ block }: { block?: number }) => block
  ? <Link to={`/blocks/${block}`}>{block}</Link>
  : <Typography>N/A</Typography>;
  
const EraRow: FC<{ points: EraPoints }> = ({ points }) => {
  const [expanded, { toggle }] = useToggle();

  const endIcon = useMemo(
    () => points.blocksProduced?.length > 0
      ? (expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />)
      : undefined,
    [expanded, points.blocksProduced?.length]
  );

  
  return (
    <>
      <TableRow>
        <TableCell>
          {points.era}
        </TableCell>
        <TableCell>
          <BlockLink block={points.startBlock} />
        </TableCell>
        <TableCell>
          <BlockLink block={points.endBlock} />
        </TableCell>
        <TableCell>
          {points.rewarded}
        </TableCell>
        <TableCell>
          <Button variant='text' endIcon={endIcon} onClick={toggle}>
            {points.blocksProduced.length}
          </Button>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={5}>
            {points.blocksProduced.map((block) => <BlockLink block={block} />).join(',')}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const byEra = <T extends { era: number }>(a: T, b: T) => b.era - a.era;

type Props = { producerId: string; eraPointsHistory: EraPointsHistory };

const ErasTable: FC<Props> = ({ eraPointsHistory, producerId }) => {
  const pagination = usePagination({ rowsPerPage: 10 });
  const { paginate } = pagination;

  // Query Data
  const variables = useMemo(() => {
    return {
      orderBy: [{ block_number: 'desc' }],
      where: {
        block_author: { _eq: producerId },
        finalized: { _eq: true }
      }
    };
  }, [producerId]);

  const { data, error, loading } = useQuery<GetBlocksByBP>(GET_BLOCKS_BY_BP, { variables });

  const eraPointsHistorySorted = useMemo(
    () => eraPointsHistory
      .slice()
      .sort(byEra),
    [eraPointsHistory]
  );

  const eraPoints = useMemo(() => {
    return eraPointsHistorySorted.map((elem): EraPoints => {
      const blocks = data?.blocks
        .filter((b) => b.currentEra === elem.era)
        .map((b) => b.number);

      return {
        era: elem.era,
        rewarded: elem.points,
        startBlock: blocks?.[0],
        endBlock: blocks?.[blocks?.length - 1],
        blocksProduced: blocks ?? []
      };
    });
  }, [data, eraPointsHistorySorted]);

  const paginated = useMemo(() => {
    return paginate(eraPoints);
  }, [eraPoints, paginate]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow></TableRow>
        </TableHead>
        <TableBody>{paginated.map((points) => <EraRow points={points} />)}</TableBody>
      </Table>
      {pagination.controls}
    </TableContainer>
  )
};

export default ErasTable;
