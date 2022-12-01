import type { TFunction } from 'i18next';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Divider, Stack, Tooltip, Typography } from '@mui/material';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
import {NumberParam, useQueryParam} from 'use-query-params';
import DateDayFilter from '../../components/Tables/filters/DateDayFilter';
import { TDate } from '../../components/SingleDate';

const MILISECONDS_IN_DAY = 86400000;

type RoleFilters = Record<string, boolean>;
type Filters = { roles: RoleFilters };

const RolesTooltipContent: FC<{ roles: string[] }> = ({ roles }) => {
  const { t } = useTranslation();
  const labels = useMemo(
    () =>
      roles.slice(1).map((role, index) => <span key={index}>{roleToLabelMap[role] ?? role}</span>),
    [roles]
  );
  return (
    <>
      <Typography fontSize={'12px'} textTransform={'uppercase'} paddingBottom={'10px'}>
        {t('additional roles')}
      </Typography>
      <Stack fontSize={'12px'} spacing={2}>
        {labels}
      </Stack>
    </>
  );
};

const rolesToCell = (t: TFunction, roles: string[]) => {
  return !roles.length ? (
    <>
      <AccountBoxIcon />
      <span>{t('none')}</span>
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
  t: TFunction,
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
          {rolesToCell(t, roles)}
        </Stack>
      ),
      props: { colSpan: 2 }
    },
    { value: <FormatBalance value={item.lockedBalance.toString()} /> },
    { value: <FormatBalance value={item.totalBalance.toString()} /> },
    { value: <Typography><TimeAgoComponent date={item.whenCreated} /></Typography>}
  ];
};

const useHeaders = (whenCreatedQueryParam: string | null) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>();
  const [roleFilters, setRoleFilters] = useSessionState<RoleFilters>('accounts.roleFilters', {});
  const [filteredDay, setFilteredDay] = useSessionState<string | undefined | TDate>('accounts.filteredDay', whenCreatedQueryParam !== null ? whenCreatedQueryParam : undefined);

  const headers = useMemo<HeaderCell[]>(
    () => [
      { value: t('Rank') },
      {
        label: t('Account'),
        value: (
          <GeneralFilter
            label={t('Account')}
            value={search}
            onChange={setSearch} />
        )
      },
      {
        label: t('Extrinsics'),
        value: (
          <Tooltip
            title={t('An Extrinsic is defined by any action that is performed by an user of the xx network blockchain.')}
            arrow
          >
            <Typography variant='h4'>{t('extrinsics')}</Typography>
          </Tooltip>
        )
      },
      {
        label: t('Role'),
        value: <HoldersRolesFilters onChange={setRoleFilters} filters={roleFilters} />,
        props: { colSpan: 2 }
      },
      { value: t('Locked balance') },
      { value: t('Total balance') },
      { label: t('When Created'), value: <DateDayFilter onChange={setFilteredDay} value={filteredDay} /> }
    ],
    [filteredDay, roleFilters, search, setFilteredDay, setRoleFilters, t]
  );
  return {
    headers,
    filters: { roles: roleFilters },
    search,
    filteredDay,
    setFilteredDay
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
  const { t } = useTranslation();
  const [whenCreatedQueryParam] = useQueryParam('whenCreated', NumberParam);
  const { filteredDay, filters, headers, search, setFilteredDay } = useHeaders(whenCreatedQueryParam ? new Date(whenCreatedQueryParam).toISOString() : null);

  const orClause = useMemo(
    () => buildOrClause(filters),
    [filters]
  );
  
  useEffect(() => {
    if(whenCreatedQueryParam) {
      setFilteredDay(new Date(whenCreatedQueryParam).toISOString())
    }
  }, [setFilteredDay, whenCreatedQueryParam])

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
        ...(filteredDay && {
          _or: 
            {
              when_created: { 
                _gt: new Date(filteredDay).getTime(), 
                _lte: new Date(filteredDay).getTime() + MILISECONDS_IN_DAY
              }
            }
          }
        )
      },
    }),
    [search, filteredDay, orClause]
  );

  const { data, error, loading, pagination, refetch } = usePaginatedQuery<ListAccounts>(LIST_ACCOUNTS, {
    variables
  });
  
  useEffect(() => {
    refetch({variables})
  }, [refetch, setFilteredDay, variables])

  const { offset } = pagination;
  const rows = useMemo(
    () =>
      (data?.account || []).map(
        (account, index) => accountToRow(
          t,
          account,
          index + 1 + offset,
          filters.roles
        )
      ),
    [t, data?.account, filters, offset]
  );

  return (
    <PaperStyled>
      <Typography variant='h3' sx={{ mb: 4, px: '3px' }}>
        {t('Account Holders')}
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
