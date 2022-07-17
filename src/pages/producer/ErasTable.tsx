import type { EraPointsHistory } from './types';

import React, { FC, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { TableStyled } from '../../components/Tables/TableContainer.styled';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import Link from '../../components/Link';
import { GET_BLOCKS_BY_BP, GetBlocksByBP } from '../../schemas/blocks.schema';
import { usePagination, useToggle } from '../../hooks';
import Error from '../../components/Error';

const headers = ['Era', 'Reward Points', 'Blocks Produced'];

type EraPoints = {
  era: number;
  rewarded: number;
  blocksProduced: number[];
};

const BlockLink = ({ block }: { block?: number }) =>
  block ? <Link to={`/blocks/${block}`}>{block}</Link> : <Typography>N/A</Typography>;

const EraRow: FC<{ points: EraPoints }> = ({ points }) => {
  const [expanded, { toggle }] = useToggle();

  const endIcon = useMemo(
    () =>
      points.blocksProduced?.length > 0 ? (
        expanded ? (
          <KeyboardArrowUpIcon />
        ) : (
          <KeyboardArrowDownIcon />
        )
      ) : undefined,
    [expanded, points.blocksProduced?.length]
  );

  return (
    <>
      <TableRow>
        <TableCell>{points.era}</TableCell>
        <TableCell>{points.rewarded}</TableCell>
        <TableCell>
          <Button
            disabled={points.blocksProduced.length === 0}
            variant='text'
            endIcon={endIcon}
            onClick={toggle}
          >
            {points.blocksProduced.length}
          </Button>
        </TableCell>
      </TableRow>
      {expanded && (
        <TableRow>
          <TableCell colSpan={5}>
            {points.blocksProduced
              .map<React.ReactNode>((block) => <BlockLink key={block} block={block} />)
              .reduce((prev, curr) => [prev, ', ', curr])}
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
  const { paginate, setCount } = pagination;

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
    () => eraPointsHistory.slice().sort(byEra),
    [eraPointsHistory]
  );

  const eraPoints = useMemo(() => {
    return eraPointsHistorySorted.map((elem): EraPoints => {
      const blocks = data?.blocks.filter((b) => b.currentEra === elem.era).map((b) => b.number);

      return {
        era: elem.era,
        rewarded: elem.points,
        blocksProduced: blocks ?? []
      };
    });
  }, [data, eraPointsHistorySorted]);

  const paginated = useMemo(() => {
    return paginate(eraPoints);
  }, [eraPoints, paginate]);

  const count = eraPointsHistory.length ?? 0;

  useEffect(() => {
    setCount(count);
  }, [count, setCount]);

  if (loading) return <TableSkeleton rows={pagination.rowsPerPage} cells={headers.length} footer />;

  return (
    <TableStyled>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {error && (
            <TableRow>
              <TableCell colSpan={headers.length}>
                <Error type='data-unavailable' />
              </TableCell>
            </TableRow>
          )}
          {paginated.map((points) => (
            <EraRow key={points.era} points={points} />
          ))}
        </TableBody>
      </Table>
      {pagination.controls}
    </TableStyled>
  );
};

export default ErasTable;
