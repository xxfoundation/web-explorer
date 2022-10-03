import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Divider, Stack, Tooltip, Typography } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';

import { theme } from '../../themes/default';
import Address from '../../components/Hash/XXNetworkAddress';
import FormatBalance from '../../components/FormatBalance';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { BaselineCell, BaselineTable, HeaderCell } from '../../components/Tables';
import { CustomTooltip } from '../../components/Tooltip';
import { ListAccounts, LIST_ACCOUNTS } from '../../schemas/accounts.schema';
import { HoldersRolesFilters, roleToLabelMap } from './HoldersRolesFilters';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';
import useSessionState from '../../hooks/useSessionState';
import GeneralFilter from '../../components/Tables/filters/GeneralFilter';
import { NumberParam, useQueryParam } from 'use-query-params';
import useDebounce from '../../hooks/useDebounce';

type RoleFilters = Record<string, boolean>;
type Filters = { era?: number, roles: RoleFilters };

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
  filters: RoleFilters
): BaselineCell[] => {
  const rankProps = rank <= 10 ? { style: { fontWeight: 900 } } : {};

  const roles = Object.entries(item.roles)
    .filter(([key]) => key !== '__typename')
    .filter(([, value]) => !!value)
    .sort(([roleA], [roleB]) => (filters[roleB] ? 1 : 0) - (filters[roleA] ? 1 : 0))
    .map(([role, value]): string =>
      role === 'special' && typeof value === 'string' ? value : role
    );
  const accountLink = `accounts/${item.id}`;

  return [
    { value: rank, props: rankProps },
    {
      value: <Address truncated roles={item.roles} name={item.identity?.display} value={item.id} url={accountLink} />
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
    { value: <FormatBalance value={item.totalBalance.toString()} /> },
    { value: item.whenCreatedEra }
  ];
};

const useHeaders = () => {
  const [search, setSearch] = useState<string>();
  const [roleFilters, setRoleFilters] = useSessionState<RoleFilters>('accounts.roleFilters', {});
  const [eraQuery, setEraQuery] = useQueryParam('era', NumberParam);
  const [eraSessionState, setEraSessionState] = useSessionState<number | undefined>('accounts.whenCreated', undefined);
  const era = useMemo(() => eraQuery || eraSessionState, [eraSessionState, eraQuery]);

  const onEraChange = useCallback((e?: string) => {
    const eraNumber = e ? Number(e) : undefined;
    setEraQuery(eraNumber);
    setEraSessionState(eraNumber);
  }, [setEraQuery, setEraSessionState]);

  const headers = useMemo<HeaderCell[]>(
    () => [
      { value: 'Rank' },
      {
        label: 'Account',
        value: <GeneralFilter label='Account' value={search} onChange={setSearch} />
      },
      {
        label: 'Extrinsics',
        value: (
          <Tooltip
            title='An Extrinsic is defined by any action that is performed by an user of the xx network blockchain.'
            arrow
          >
            <Typography variant='h4'>extrinsics</Typography>
          </Tooltip>
        )
      },
      {
        label: 'Role',
        value: <HoldersRolesFilters onChange={setRoleFilters} filters={roleFilters} />,
        props: { colSpan: 2 }
      },
      { value: 'Locked balance' },
      { value: 'Total balance' },
      {
        label: 'Era created',
        value: <GeneralFilter value={era?.toString()} onChange={onEraChange} label='Era created' />
      }
    ],
    [era, onEraChange, roleFilters, search, setRoleFilters]
  );

  return {
    headers,
    filters: { roles: roleFilters, era },
    search
  };
};

const buildOrClause = (filters: Filters) =>
  [
    filters.roles.council && { role: { council: { _eq: true } } },
    filters.roles.nominator && { role: { nominator: { _eq: true } } },
    filters.roles.techcommit && { role: { techcommit: { _eq: true } } },
    filters.roles.validator && { role: { validator: { _eq: true } } },
    filters.roles.special && { role: { special: { _neq: 'null' } } },
  ].filter((v) => !!v);

const AccountsTable: FC = () => {
  const { filters, headers, search } = useHeaders();
  const orClause = useMemo(
    () => buildOrClause(filters),
    [filters]
  );

  const variables = useMemo(
    () => ({
      where: {
        when_created_era: { _eq: filters.era },
        _or: [
          { account_id: { _ilike: `%${search ?? ''}%`} },
          { identity: { display: { _ilike: `%${search ?? ''}%`} } }
        ],
        ...(orClause.length > 0 && {
          _and: { _or: orClause }
        })
      },
      orderBy: [{ total_balance: 'desc' }]
    }),
    [filters.era, search, orClause]
  );


  const { data, error, loading, pagination } = usePaginatedQuery<ListAccounts>(LIST_ACCOUNTS, {
    variables
  });

  const { offset } = pagination;
  const rows = useMemo(
    () =>
      (data?.account || []).map((item, index) => accountToRow(item, index + 1 + offset, filters.roles)),
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

export default AccountsTable;
