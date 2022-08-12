import { useQuery } from '@apollo/client';
import { Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import Address from '../../components/Hash/XXNetworkAddress';
import CmixAddress from '../../components/Hash/CmixAddress';
import Error from '../../components/Error';
import FormatBalance from '../../components/FormatBalance';
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
import { TabText } from '../../components/Tabs';
import SkeletonRows from '../../components/Tables/SkeletonRows';

const ROWS_PER_PAGE = 20;

const ValidatorRow: FC<ValidatorAccount & { index: number }> = ({
  addressId,
  cmixId,
  commission,
  index,
  location,
  name,
  nominators,
  ownStake,
  totalStake
}) => {
  const validatorLink = `/accounts/${addressId}`;
  const identityDisplay = name && name[0] && name[0].display;
  let parsed;

  try {
    const { city, country } = location ? JSON.parse(location) : ({} as Record<string, string>);
    parsed = location ? `${city ? `${city}, ` : ' '}${country ?? ''}` : 'N/A';
  } catch (err) {
    console.error('Error parsing location for ', name);
  }

  return (
    <TableRow key={addressId}>
      <TableCell>
        <Typography variant='h4'>{index}</Typography>
      </TableCell>
      <TableCell>
        <Address value={addressId} name={identityDisplay} url={validatorLink} truncated />
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
      current: <TabText message={'Current'} count={activeCount === undefined ? '' : activeCount} />,
      waiting: (
        <TabText message={'Waiting'} count={waitingCount === undefined ? '' : waitingCount} />
      )
    }),
    [activeCount, waitingCount]
  );

  const error = latestEraQuery.error || validatorsQuery.error;

  return (
    <Stack spacing={3}>
      <Stack sx={{ mb: 2, ml: -1.5 }} spacing={2}>
        <Typography variant='h2' sx={{ ml: 1.5, fontWeight: 500 }}>
          Validator
        </Typography>
        <ValidatorTableControls labels={labels} selected={filter} onSelect={setFilter} />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
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
            {validatorsQuery.loading && <SkeletonRows columns={8} rows={rowsPerPage} />}
            {!validatorsQuery.loading && error && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Error type='data-unavailable' />
                  </TableCell>
                </TableRow>
            )}
            {filter !== 'waiting' ? (
              validators ? (
                validators.map((validator, index) => (
                  <ValidatorRow
                    key={validator.addressId}
                    index={index + 1 + page * rowsPerPage}
                    {...validator}
                  />
                ))
              ) : (
                <TableRow></TableRow>
              )
            ) : waitingList ? (
              waitingList.map((validator, index) => (
                <ValidatorRow
                  key={validator.addressId}
                  index={index + 1 + page * rowsPerPage}
                  {...validator}
                />
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
