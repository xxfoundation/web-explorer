import React, { FC, useMemo, useCallback, useState } from 'react';
import { useQuery } from '@apollo/client';
import Link from '../../components/Link';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import { BaseLineCellsWrapper, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { GET_BLOCKS_BY_BP, GetBlocksByBP } from '../../schemas/blocks.schema';
import { Typography } from '@mui/material';

const DEFAULT_ROWS_PER_PAGE = 5;
const headers = BaseLineCellsWrapper([
  'Era',
  'Start Block',
  'End Block',
  'Reward Points',
  'Blocks Produced'
]);

type EraPointsHistory = {
  era: number;
  points: number;
}[];

type EraPoints = {
  era: number;
  rewarded: number;
  startBlock: number;
  endBlock: number;
  blocksProduced: number[];
};

const EraRow = (points: EraPoints) => {
  return BaseLineCellsWrapper([
    points.era,
    <Link to={`/block/${points.startBlock}`}>{points.startBlock}</Link>,
    <Link to={`/block/${points.endBlock}`}>{points.endBlock}</Link>,
    points.rewarded,
    <Typography sx={{ width: '20vw', overflowWrap: 'break-word' }}>
      {points.blocksProduced.length}
      {points.blocksProduced.length
        ? ' = '.concat(JSON.stringify(points.blocksProduced, null, 2))
        : ''}
    </Typography>
  ]);
};

const paginate = (eraPoints: EraPoints[], rowsPerPage: number, page: number): EraPoints[] => {
  // page starts at 0
  return eraPoints.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
};

const ErasTable: FC<{ producerId: string; eraPointsHistory: string }> = ({
  eraPointsHistory,
  producerId
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback(({ target: { value } }) => {
    setRowsPerPage(parseInt(value));
    setPage(0);
  }, []);
  const onPageChange = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);

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
  const { data, loading } = useQuery<GetBlocksByBP>(GET_BLOCKS_BY_BP, { variables });

  // Process Data
  const eraPointsHistorySorted = (eraPointsHistory as unknown as EraPointsHistory)
    .slice()
    .sort((a, b) => {
      return b.era - a.era;
    });

  const eraPoints = useMemo(() => {
    return eraPointsHistorySorted.map((elem): EraPoints => {
      const blocks: number[] = [];
      data?.blocks.map(({ currentEra, number }) => {
        if (currentEra === elem.era) {
          blocks.push(number);
        }
      });
      return {
        era: elem.era,
        rewarded: elem.points,
        startBlock: blocks[0],
        endBlock: blocks[blocks.length - 1],
        blocksProduced: blocks
      };
    });
  }, [data, eraPointsHistorySorted]);

  // Display Data in Paginated Table
  const rows = useMemo(() => {
    return paginate(eraPoints, rowsPerPage, page).map(EraRow);
  }, [eraPoints, page, rowsPerPage]);
  const footer = useMemo(() => {
    if (eraPoints && eraPoints.length) {
      return (
        <TablePagination
          page={page}
          count={eraPoints.length}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          rowsPerPageOptions={[DEFAULT_ROWS_PER_PAGE, 20, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [eraPoints, onPageChange, onRowsPerPageChange, page, rowsPerPage]);
  if (loading) return <TableSkeleton rows={rowsPerPage} cells={3} footer />;
  return <BaselineTable headers={headers} rows={rows} footer={footer} />;
};

export default ErasTable;
