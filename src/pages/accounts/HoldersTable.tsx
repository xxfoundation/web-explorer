import { useQuery } from '@apollo/client';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { Address } from '../../components/ChainId';
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
      <span>unknown</span>
      <AccountBoxIcon />
    </>
  ) : (
    <>
      <span>{roles[0]}</span>
      {roles.length > 1 ? (
        <CustomTooltip title={<RolesTooltipContent roles={roles} />} arrow placement='right'>
          <SwitchAccountIcon />
        </CustomTooltip>
      ) : (
        <AccountBoxIcon />
      )}
    </>
  );
};

const accountToRow = (item: ListAccounts['account'][0], rank: number): BaselineCell[] => {
  const rankProps = rank <= 10 ? { style: { fontWeight: 900 } } : {};
  const roles = Object.entries(item.roles)
    .filter((entry) => entry[1] === true)
    .map(([role]) => role as Roles);
  return [
    { value: rank, props: rankProps },
    {
      value: <Address value={item.address} link={`/accounts/${item.address}`} truncated />
    },
    { value: item.nonce },
    {
      value: (
        <Stack
          direction={'row'}
          spacing={1}
          justifyContent='space-evenly'
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

const useHeaders = (): [BaselineCell[], Record<Roles, boolean>] => {
  const [sortVariables, setSortVariables] = useState<Record<Roles, boolean>>({
    validator: false,
    nominator: false,
    council: false,
    techcommit: false
    // treasury: false
  });
  return [
    [
      { value: 'rank' },
      { value: 'account' },
      { value: 'transactions' },
      {
        value: (
          <HoldersRolesFilters callback={setSortVariables} roles={sortVariables}>
            role
          </HoldersRolesFilters>
        ),
        props: { colSpan: 2 }
      },
      { value: 'locked xx coin' },
      { value: 'balance xx' }
    ],
    sortVariables
  ];
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
  const [headers] = useHeaders();
  const variables = useMemo(
    () => ({
      limit,
      offset,
      where: { timestamp: { _lte: timestamp } },
      orderBy: [{ total_balance: 'desc' }]
    }),
    [limit, offset, timestamp]
  );
  const { data, loading } = useQuery<ListAccounts>(LIST_ACCOUNTS, { variables });
  const rows = useMemo(
    () => (data?.account || []).map((item, index) => accountToRow(item, index + offset)),
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
      ) : (
        <BaselineTable headers={headers} rows={rows} footer={footer} />
      )}
    </PaperStyled>
  );
};

export default HoldersTable;
