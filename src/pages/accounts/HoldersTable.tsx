import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';

import { theme } from '../../themes/default';
import Address from '../../components/Hash/XXNetworkAddress';
import FormatBalance from '../../components/FormatBalance';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import { CustomTooltip } from '../../components/Tooltip';
import { ListAccounts, LIST_ACCOUNTS } from '../../schemas/accounts.schema';
import { HoldersRolesFilters, roleToLabelMap } from './HoldersRolesFilters';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';

type Filters = Record<string, boolean>;

const RolesTooltipContent: FC<{ roles: string[] }> = ({ roles }) => {
  const labels = useMemo(
    () =>
      roles.slice(1).map((role, index) => <span key={index}>{roleToLabelMap[role] ?? role}</span>),
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
      <span>{roleToLabelMap[roles[0]] ?? roles[0]}</span>
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
      value: (
        <Address
          truncated
          name={item.identity?.display}
          value={item.address}
          url={accountLink} />
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
  const [filters, setFilters] = useState<Filters>({});

  const headers = useMemo(
    () => [
      { value: 'rank' },
      { value: 'account' },
      { value: 'transactions' },
      {
        value: <HoldersRolesFilters onChange={setFilters} filters={filters} />,
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

const buildOrClause = (filters: Filters) =>
  [
    filters.council && { role: { council: { _eq: true } } },
    filters.nominator && { role: { nominator: { _eq: true } } },
    filters.techcommit && { role: { techcommit: { _eq: true } } },
    filters.validator && { role: { validator: { _eq: true } } },
    filters.special && { role: { special: { _neq: 'null' } } }
  ].filter((v) => !!v);

const HoldersTable: FC = () => {
  const { filters, headers } = useHeaders();
  const hasFilters = !filters.all && Object.values(filters).some((v) => !!v);

  const orClause = useMemo(() => buildOrClause(filters), [filters]);

  const variables = useMemo(
    () => ({
      where: {
        _and: [
          hasFilters
            ? {
                _or: orClause
              }
            : {}
        ]
      },
      orderBy: [{ total_balance: 'desc' }]
    }),
    [hasFilters, orClause]
  );

  const { data, error, loading, pagination } = usePaginatedQuery<ListAccounts>(LIST_ACCOUNTS, {
    variables
  });
  const { offset } = pagination;
  const rows = useMemo(
    () =>
      (data?.account || []).map((item, index) => accountToRow(item, index + 1 + offset, filters)),
    [data?.account, filters, offset]
  );

  return (
    <PaperStyled>
      <Typography variant='h3' sx={{ mb: 4, px: '3px' }}>
        Account Holders
      </Typography>
      <BaselineTable
        error={!!error}
        loading={loading}
        headers={headers}
        rows={rows}
        rowsPerPage={pagination.rowsPerPage}
        footer={pagination.controls}
      />
    </PaperStyled>
  );
};

export default HoldersTable;
