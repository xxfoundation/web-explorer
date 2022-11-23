import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Divider, Stack, Tooltip, Typography } from '@mui/material';
import React, {FC, useEffect, useMemo, useState} from 'react';

import { theme } from '../../themes/default';
import Address from '../../components/Hash/XXNetworkAddress';
import FormatBalance from '../../components/FormatBalance';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { BaselineCell, BaselineTable, HeaderCell } from '../../components/Tables';
import { CustomTooltip } from '../../components/Tooltip';
import { ListAccounts, LIST_ACCOUNTS, PartialAccount, Roles } from '../../schemas/accounts.schema';
import { HoldersRolesFilters, roleToLabelMap } from './HoldersRolesFilters';
import usePaginatedQuery from '../../hooks/usePaginatedQuery';
import useSessionState from '../../hooks/useSessionState';
import GeneralFilter from '../../components/Tables/filters/GeneralFilter';
import TimeAgoComponent from '../../components/TimeAgo';
import DateRangeFilter, {Range} from '../../components/Tables/filters/DateRangeFilter';
import {NumberParam, useQueryParam} from 'use-query-params';

type RoleFilters = Record<string, boolean>;
type Filters = { roles: RoleFilters };

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
  item: PartialAccount,
  rank: number,
  filters: RoleFilters
): BaselineCell[] => {
  const rankProps = rank <= 10 ? { style: { fontWeight: 900 } } : {};
  const rolesObj: Roles = {
    council: item.council,
    nominator: item.nominator,
    special: item.special,
    techcommit: item.techcommit,
    validator: item.validator
  }

  const roles = Object.entries(rolesObj)
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
      value: <Address truncated roles={item} name={item.identity?.display} value={item.id} url={accountLink} />
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
    { value: <Typography><TimeAgoComponent date={item.whenCreated} /></Typography>}
  ];
};

const useHeaders = (eraQueryParam: string | null) => {
  const [search, setSearch] = useState<string>();
  const [roleFilters, setRoleFilters] = useSessionState<RoleFilters>('accounts.roleFilters', {});
  const [range, setRange] = useSessionState<Range>('accounts.range', {
    from: eraQueryParam,
    to: null
  });

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
      { label: 'When Created', value: <DateRangeFilter dateOnly={true} onChange={setRange} value={range} /> }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roleFilters, search, setRoleFilters, range]
  );
  
  return {
    headers,
    filters: { roles: roleFilters },
    search,
    range,
    setRange
  };
};

const buildOrClause = (filters: Filters) =>
  [
    filters.roles.council && { council: { _eq: true } },
    filters.roles.nominator && { nominator: { _eq: true } },
    filters.roles.techcommit && { techcommit: { _eq: true } },
    filters.roles.validator && { validator: { _eq: true } },
    filters.roles.special && { special: { _neq: 'null' } },
  ].filter((v) => !!v);

const AccountsTable: FC = () => {
  const [eraQueryParam] = useQueryParam('era', NumberParam);
  const { filters, headers, range, search, setRange } = useHeaders(eraQueryParam ? new Date(eraQueryParam).toISOString() : null);
  
  const orClause = useMemo(
    () => buildOrClause(filters),
    [filters]
  );
  
  useEffect(() => {
    if(eraQueryParam) {
      setRange({from: new Date(eraQueryParam).toISOString(), to: range.to ? new Date(range.to).toISOString() : null})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eraQueryParam])
  
  const getTimeStamps = useMemo(() => {
    const whenCreated: any = {};
    if(range.to) {
      whenCreated._lte = new Date(range.to).getTime()
    }
    if(range.from) {
      whenCreated._gte = new Date(range.from).getTime()
    }
    return {when_created: whenCreated}
  }, [range])

  const variables = useMemo(
    () => ({
      orderBy: [{ when_created: 'desc' }],
      where: {
        _or: [
          { account_id: { _ilike: `%${search ?? ''}%`} },
          { identity: { display: { _ilike: `%${search ?? ''}%`} } }
        ],
        ...(orClause.length > 0 && {
          _and: { _or: orClause }
        }),
        ...getTimeStamps
      },
    }),
    [search, orClause, getTimeStamps]
  );

  const { data, error, loading, pagination, refetch } = usePaginatedQuery<ListAccounts>(LIST_ACCOUNTS, {
    variables
  });
  
  useEffect(() => {
    refetch({variables})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range])

  const { offset } = pagination;
  const rows = useMemo(
    () =>
      (data?.account || []).map(
        (account, index) => accountToRow(
          account,
          index + 1 + offset,
          filters.roles
        )
      ),
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
