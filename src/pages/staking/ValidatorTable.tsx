import { useQuery } from '@apollo/client';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import Address from '../../components/Hash/XXNetworkAddress';
import CmixAddress from '../../components/Hash/CmixAddress';
import Error from '../../components/Error';
import FormatBalance from '../../components/FormatBalance';
import Loading from '../../components/Loading';
import { TableContainer } from '../../components/Tables/TableContainer';
import TablePagination from '../../components/Tables/TablePagination';
import {
  GET_CURRENT_VALIDATORS,
  GET_LATEST_ERA,
  ActiveCountsQuery,
  LatestEraQuery,
  ValidatorAccountsQuery,
  ValidatorAccount,
  GET_ACTIVE_COUNTS,
  GET_WAITING_LIST
} from '../../schemas/staking.schema';
import ValidatorTableControls, {
  ValidatorFilter,
  ValidatorFilterLabels
} from './ValidatorTableControls';

const ROWS_PER_PAGE = 20;

const ValidatorRow: FC<ValidatorAccount> = ({
  addressId,
  cmixId,
  commission,
  location,
  nominators,
  ownStake,
  totalStake
}) => {
  const validatorLink = `/accounts/${addressId}`;
  let parsed;

  try {
    const { city, country } = location ? JSON.parse(location) : ({} as Record<string, string>);
    parsed = location ? `${city ? `${city}, ` : ' '}${country ?? ''}` : 'N/A';
  } catch (err) {
    console.error('Error parsing location for ', name);
  }

  return (
    <TableRow key={addressId}>
      {/* <TableCell>
        <Typography variant='h4'>{}</Typography>
      </TableCell> */}
      <TableCell>
        <Address value={addressId} url={validatorLink} truncated />
      </TableCell>
      <TableCell>{parsed}</TableCell>
      <TableCell>
        <FormatBalance value={ownStake} />
      </TableCell>
      {totalStake && (
        <TableCell>
          <FormatBalance value={totalStake} />
        </TableCell>
      )}
      <TableCell>
        <Typography>{commission.toFixed(2)} %</Typography>
      </TableCell>
      <TableCell>
        <Typography variant='code'>
          <CmixAddress truncated value={cmixId} />
        </Typography>
      </TableCell>
      <TableCell>{nominators.length}</TableCell>
    </TableRow>
  );
};

const ValidatorsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState<ValidatorFilter>('current');
  const latestEraQuery = useQuery<LatestEraQuery>(GET_LATEST_ERA);
  const latestEra = latestEraQuery.data?.validatorStats?.[0].era;
  const countsQuery = useQuery<ActiveCountsQuery>(GET_ACTIVE_COUNTS, {
    variables: { era: latestEra },
    skip: !latestEra
  });
  const variables = useMemo(
    () => ({
      limit: rowsPerPage,
      offset: page * rowsPerPage,
      where: { era: { _eq: latestEra } }
    }),
    [latestEra, page, rowsPerPage]
  );
  const validatorsQuery = useQuery<ValidatorAccountsQuery>(GET_CURRENT_VALIDATORS, {
    variables,
    skip: !latestEra
  });
  const waitingQuery = useQuery<ValidatorAccountsQuery>(GET_WAITING_LIST);
  const validators = validatorsQuery.data?.validators;
  const waitingList = waitingQuery.data?.validators;
  const activeCount = countsQuery.data?.active.aggregate.count;
  const waitingCount = countsQuery.data?.waiting.aggregate.count;
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

  const error = latestEraQuery.error || validatorsQuery.error;

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
              {/* <TableCell>Rank</TableCell> */}
              <TableCell>Validator</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Own Stake</TableCell>
              {filter !== 'waiting' && <TableCell>Total Stake</TableCell>}
              <TableCell>Commission</TableCell>
              <TableCell>Cmix ID</TableCell>
              <TableCell>Nominators</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7}>
                {!validatorsQuery.loading && error && <Error type='data-unavailable' />}
                {validatorsQuery.loading && <Loading />}
              </TableCell>
            </TableRow>
            {filter !== 'waiting' ? (
              validators ? (
                validators.map((validator) => (
                  <ValidatorRow key={validator.addressId} {...validator} />
                ))
              ) : (
                <TableRow></TableRow>
              )
            ) : waitingList ? (
              waitingList.map((validator) => (
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
