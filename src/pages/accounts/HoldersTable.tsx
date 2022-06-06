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
import { ListAccounts, LIST_ACCOUNTS, Roles } from '../../schemas/accounts.schema';
import HoldersRolesFilters from './HoldersRolesFilters';

const DEFAULT_ROWS_PER_PAGE = 20;

const RolesTooltipContent: FC<{ roles: Roles[] }> = ({ roles }) => {
  const labels = useMemo(
    () => roles.slice(1).map((role, index) => <span key={index}>{role}</span>),
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

const rolesToCell = (roles: Roles[]) => {
  return !roles.length ? (
    <>
      <AccountBoxIcon />
      <span>none</span>
    </>
  ) : (
    <>
      {roles.length > 1 ? (
        <CustomTooltip title={<RolesTooltipContent roles={roles} />} arrow placement='right'>
          <SwitchAccountIcon style={{ color: theme.palette.primary.main }} />
        </CustomTooltip>
      ) : (
        <AccountBoxIcon style={{ color: theme.palette.primary.main }} />
      )}
      <span>{roles[0]}</span>
    </>
  );
};

const accountToRow = (item: ListAccounts['account'][0], rank: number): BaselineCell[] => {
  const rankProps = rank <= 10 ? { style: { fontWeight: 900 } } : {};
  const filteredRoles = Object.entries(item.roles).filter(([key]) => key !== '__typename');
  const roles = filteredRoles
    .filter(([, value]) => value)
    .map(([role, value]) => {
      return role === 'special' ? (value as Roles) : (role as Roles);
    });
  const accountLink = `accounts/${item.address}`;
  let identity = null;
  try {
    identity = item.identity && (JSON.parse(item.identity) as Record<string, string>);
  } catch (err) {
    console.error('Error parsing identity for id:', item.address, item.identity);
  }

  return [
    { value: rank, props: rankProps },
    {
      value: identity ? (
        <Address name={identity.display} value={item.address} link={accountLink} truncated />
      ) : (
        <Address value={item.address} link={accountLink} truncated />
      )
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
  const [filters, setFilters] = useState<Record<Roles, boolean>>({
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
          <HoldersRolesFilters callback={setFilters} roles={filters}>
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
  const variables = useMemo(
    () => ({
      limit,
      offset,
      where: {
        _and: [
          { timestamp: { _lte: timestamp } },
          hasFilters
            ? {
                _or: Object.entries(filters)
                  .filter(([k, v]) => !!v)
                  .map(([key, value]) => ({ role: { [key]: { _eq: value } } }))
              }
            : {}
        ]
      },
      orderBy: [{ total_balance: 'desc' }]
    }),
    [filters, hasFilters, limit, offset, timestamp]
  );

  const { data, error, loading } = useQuery<ListAccounts>(LIST_ACCOUNTS, { variables });
  const rows = useMemo(
    () => (data?.account || []).map((item, index) => accountToRow(item, index + 1 + offset)),
    [data?.account, offset]
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
