/* eslint-disable no-console */
import { useQuery } from '@apollo/client';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';

import { theme } from '../../themes/default';
import { Address } from '../../components/ChainId';
import Error from '../../components/Error';
import FormatBalance from '../../components/FormatBalance';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import CustomTooltip from '../../components/Tooltip';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { ListAccounts, LIST_ACCOUNTS } from '../../schemas/accounts.schema';
import { HoldersRolesFilters, rolesMap } from './HoldersRolesFilters';

const DEFAULT_ROWS_PER_PAGE = 20;

type Filters = Record<string, boolean>;

const RolesTooltipContent: FC<{ roles: string[] }> = ({ roles }) => {
  const labels = useMemo(
    () => roles.slice(1).map((role, index) => <span key={index}>{rolesMap[role] ?? role}</span>),
    [roles]
  );
  return (
    <>
      <Typography fontSize={'12px'} textTransform={'uppercase'} paddingBottom={'10px'}>
        additional roles
      </Typography>
      <Stack fontSize={'12px'} spacing={2}>
        {labels}
      </Stack>
    </>
  );
};

const rolesToCell = (roles: string[]) => {
  return !roles.length ? (
    <>
      <AccountBoxIcon />
      <span>none</span>
    </>
  ) : (
    <>
      {roles.length > 1 ? (
        <CustomTooltip title={<RolesTooltipContent roles={roles} />} arrow placement='left'>
          <SwitchAccountIcon style={{ color: theme.palette.primary.main }} />
        </CustomTooltip>
      ) : (
        <AccountBoxIcon style={{ color: theme.palette.primary.main }} />
      )}
      <span>{rolesMap[roles[0]] ?? roles[0]}</span>
    </>
  );
};

const accountToRow = (
  item: ListAccounts['account'][0],
  rank: number,
  filters: Filters
): BaselineCell[] => {
  const rankProps = rank <= 10 ? { style: { fontWeight: 900 } } : {};

  const roles = Object.entries(item.roles)
    .filter(([key]) => key !== '__typename')
    .filter(([, value]) => !!value)
    .sort(([roleA], [roleB]) => (filters[roleB] ? 1 : 0) - (filters[roleA] ? 1 : 0))
    .map(([role, value]): string => (role === 'special' ? (value as string) : role));
  const accountLink = `accounts/${item.address}`;

  return [
    { value: rank, props: rankProps },
    {
      value: <Address name={identity.displayName} value={item.address} link={accountLink} truncated />
    },
    { value: item.nonce },
    {
      value: (
        <Stack
          direction={'row'}
          spacing={1}
          justifyContent='flex-start'
          divider={<Divider flexItem variant='middle' orientation='vertical' />}
        >
          {rolesToCell(roles)}
        </Stack>
      ),
      props: { colSpan: 2 }
    },
    { value: <FormatBalance value={item.lockedBalance.toString()} /> },
    { value: <FormatBalance value={item.totalBalance.toString()} /> }
  ];
};

const useHeaders = () => {
  const [filters, setFilters] = useState<Filters>({
    validator: false,
    nominator: false,
    council: false,
    techcommit: false,
    special: false
  });

  const headers = useMemo(
    () => [
      { value: 'rank' },
      { value: 'account' },
      { value: 'transactions' },
      {
        value: (
          <HoldersRolesFilters callback={setFilters} filters={filters}>
            role
          </HoldersRolesFilters>
        ),
        props: { colSpan: 2 }
      },
      { value: 'locked balance' },
      { value: 'total balance' }
    ],
    [filters]
  );

  return {
    headers,
    filters
  };
};

const buildOrClause = (filters: Filters) => {
  return [
    filters.council && { role: { council: { _eq: true } } },
    filters.nominator && { role: { nominator: { _eq: true } } },
    filters.techcommit && { role: { techcommit: { _eq: true } } },
    filters.validator && { role: { validator: { _eq: true } } },
    filters.special && { role: { special: { _neq: 'null' } } }
  ].filter((v) => !!v);
};

const HoldersTable: FC = () => {
  const {
    cursorField: timestamp,
    limit,
    offset,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage
  } = usePaginatorByCursor<ListAccounts['account'][0]>({
    rowsPerPage: DEFAULT_ROWS_PER_PAGE,
    cursorField: 'timestamp'
  });
  const { filters, headers } = useHeaders();
  const hasFilters = Object.values(filters).some((v) => !!v);

  const orClause = useMemo(() => buildOrClause(filters), [filters]);

  const variables = useMemo(
    () => ({
      limit,
      offset,
      where: {
        _and: [
          { timestamp: { _lte: timestamp } },
          hasFilters
            ? {
                _or: orClause
              }
            : {}
        ]
      },
      orderBy: [{ total_balance: 'desc' }]
    }),
    [hasFilters, limit, offset, orClause, timestamp]
  );

  const { data, error, loading } = useQuery<ListAccounts>(LIST_ACCOUNTS, { variables });
  const rows = useMemo(
    () =>
      (data?.account || []).map((item, index) => accountToRow(item, index + 1 + offset, filters)),
    [data?.account, filters, offset]
  );

  const footer = useMemo(() => {
    if (data?.agg && data?.account && data.account.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data.account[0])}
          rowsPerPageOptions={[10, DEFAULT_ROWS_PER_PAGE, 30, 40, 50]}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      );
    }
    return <></>;
  }, [data?.account, data?.agg, onPageChange, onRowsPerPageChange, page, rowsPerPage]);

  console.log(error);

  return (
    <PaperStyled>
      <Typography variant='h3' sx={{ mb: 4, px: '3px' }}>
        Account Holders
      </Typography>
      {loading ? (
        <TableSkeleton cells={headers.length} rows={rowsPerPage} />
      ) : error ? (
        <Error type='data-unavailable' />
      ) : (
        <BaselineTable headers={headers} rows={rows} footer={footer} />
      )}
    </PaperStyled>
  );
};

export default HoldersTable;
