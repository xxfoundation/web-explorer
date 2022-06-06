/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import CmixAddress from '../../components/CmixAddress';
import Error from '../../components/Error';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import Loading from '../../components/Loading';
import { TableContainer } from '../../components/Tables/TableContainer';
import TablePagination from '../../components/Tables/TablePagination';
import {
  GET_RANKED_ACCOUNTS,
  RankedAccountsQuery,
  RankedAccount
} from '../../schemas/ranking.schema';
import ValidatorTableControls, {
  ValidatorFilter,
  ValidatorFilterLabels
} from './ValidatorTableControls';

const ROWS_PER_PAGE = 20;

const ValidatorRow: FC<RankedAccount> = ({
  addressId,
  cmixId,
  location,
  name,
  nominators,
  ownStake,
  rank,
  totalStake
}) => {
  const validatorLink = `/validators/${addressId}`;
  let parsed;

  try {
    const { city, country } = location ? JSON.parse(location) : {} as Record<string, string>;
    parsed = location ? (`${city ? `${city}, ` : ' '}${country ?? ''}`) : 'N/A'
  } catch (err) {
    console.error('Error parsing location');
  }

  return (
    <TableRow key={addressId}>
      <TableCell>
        <Typography variant='h4'>{rank}</Typography>
      </TableCell>
      <TableCell>
        <Link to={validatorLink}>{name}</Link>
      </TableCell>
      <TableCell>{parsed}</TableCell>
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
      <TableCell>{nominators}</TableCell>
    </TableRow>
  );
};

const ValidatorsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<ValidatorFilter>('current');
  const variables = useMemo(
    () => ({
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where: { active: { _eq: filter === 'current' } }
    }),
    [filter, page, rowsPerPage]
  );
  const query = useQuery<RankedAccountsQuery>(GET_RANKED_ACCOUNTS, { variables });
  const validators = query.data?.validators;
  const activeCount = query.data?.active.aggregate.count;
  const waitingCount = query.data?.waiting.aggregate.count;
  const count = filter === 'current' ? activeCount : waitingCount;

  const labels: ValidatorFilterLabels = useMemo(
    () => ({
      current: (
        <>
          <strong>Current</strong> {activeCount !== undefined && `| ${activeCount}`}
        </>
      ),
      waiting: (
        <>
          <strong>Waiting</strong> {waitingCount !== undefined && `| ${waitingCount}`}
        </>
      )
    }),
    [activeCount, waitingCount]
  );

  console.log(JSON.stringify(query.data));

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
              <TableCell>Own Stake</TableCell>
              <TableCell>Total Stake</TableCell>
              <TableCell>Cmix ID</TableCell>
              <TableCell>Nominators</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7}>
                {(!query.loading && (query.error || !validators)) && <Error type='data-unavailable' />}
                {query.loading && <Loading />}
              </TableCell>
            </TableRow>
            {validators ? (
              validators.map((validator) => (
                <ValidatorRow key={validator.addressId} {...validator} />
              ))
            ) : (
              <TableRow></TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          count={count ?? 0}
          rowsPerPage={rowsPerPage}
          onPageChange={(_: unknown, number: number) => {
            setPage(number);
          }}
          rowsPerPageOptions={[ROWS_PER_PAGE, 30, 40, 50]}
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
