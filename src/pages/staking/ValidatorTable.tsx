import React, { FC, useMemo, useState } from 'react';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import ValidatorTableControls, { ValidatorFilter, ValidatorFilterLabels } from './ValidatorTableControls';
import { TableContainer } from '../../components/Tables/TableContainer';
import TablePagination from '../../components/Tables/TablePagination';
import CmixAddress from '../../components/CmixAddress';
import { makeid } from '../../utils';

type Validator = {
  addressId: string;
  name: string;
  cmixId: string;
  location: string;
  nominatorCount: number;
  commissionPercent: number;
  ownStake: string;
  totalStake: string;
};

type WithRank<T> = T & { rank: number };

const ValidatorRow: FC<WithRank<Validator>> = ({ addressId, cmixId, location, name, nominatorCount, ownStake, rank, totalStake }: WithRank<Validator> ) => {
  const validatorLink = `/validators/${addressId}`;

  return (
    <TableRow key={addressId}>
      <TableCell>
        <Typography variant='h4'>
          {rank}
        </Typography>
      </TableCell>
      <TableCell>
        <Link to={validatorLink}>{name}</Link>
      </TableCell>
      <TableCell>
        {location}
      </TableCell>
      <TableCell>
        <FormatBalance denomination={2} value={ownStake} />
      </TableCell>
      <TableCell>
        <FormatBalance denomination={2} value={totalStake} />
      </TableCell>
      <TableCell>
        <Typography variant='code'>
          <CmixAddress shorten nodeId={cmixId} />
        </Typography>
      </TableCell>
      <TableCell>
        {nominatorCount}
      </TableCell>
    </TableRow>
  );
};

const current: WithRank<Validator>[] = Array.from(Array(360).keys()).map((i) => ({
  key: makeid(32),
  rank: i + 1,
  addressId: makeid(32),
  cmixId: '6tf8WVFH2JBJ1JAY0BRRavMiccCJBk/vbo09U50modAC',
  location: 'Berlin, DE',
  name: 'daniel',
  ownStake: '100000',
  totalStake: '1590433',
  nominatorCount: Math.ceil(Math.random() * 30),
  commissionPercent: Math.ceil(Math.random() * 10),
}));

const waiting: WithRank<Validator>[] = Array.from(Array(737).keys()).map((i) => ({
  key: makeid(32),
  rank: i + 1,
  addressId: makeid(32),
  cmixId: '6tf8WVFH2JBJ1JAY0BRRavMiccCJBk/vbo09U50modAC',
  location: 'Somewhere else',
  name: 'not daniel',
  ownStake: '100313',
  totalStake: '1590433',
  nominatorCount: Math.ceil(Math.random() * 30),
  commissionPercent: Math.ceil(Math.random() * 10),
}));

const labels: ValidatorFilterLabels = {
  current: <><strong>Current</strong> | 352/360</>,
  waiting: <><strong>Waiting</strong> | 737</>
};

const ValidatorsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<ValidatorFilter>('current');
  const validators = filter === 'current' ? current : waiting;
  const paginated = useMemo(
    () => validators.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, validators]
  );

  return (
    <Stack spacing={3}>
      <Stack sx={{ mb: 3 }} spacing={2}>
        <Typography variant='h2' sx={{ fontWeight: 500 }}>
          Validator
        </Typography>
        <ValidatorTableControls labels={labels} selected={filter} onSelect={setFilter} />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Validator</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>OwnStake</TableCell>
              <TableCell>Total Stake</TableCell>
              <TableCell>CmixID</TableCell>
              <TableCell>Nominators</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((validator) => (
              <ValidatorRow key={validator.addressId} {...validator} />
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          count={validators.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(_: unknown, number: number) => {
            setPage(number);
          }}
          rowsPerPageOptions={[20, 30, 40, 50]}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value));
            setPage(0);
          }}
        />
      </TableContainer>
    </Stack>
  );
};

export default ValidatorsTable;
