import { useQuery } from '@apollo/client';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';
import { Address } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import genSkeletons from '../../components/genSkeletons';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import CustomTooltip from '../../components/Tooltip';
import { usePaginatorByCursor } from '../../hooks/usePaginatiors';
import { ListAccounts, LIST_ACCOUNTS } from '../../schemas/accounts.schema';
import HoldersRolesFilters from './HoldersRolesFilters';
import { AccountType, Roles } from './types';

const sampleAddress = '0xa86Aa530f6cCBd854236EE00ace687a29ad1c062';

const sampleData: AccountType[] = genSkeletons(23).map((_, index) => {
  return {
    rank: index + 1,
    era: 148,
    transactions: 123,
    roles: ['council', 'nominator'],
    lockedCoin: '000000',
    account: sampleAddress,
    name: 'Display name',
    id: '0x6d6f646c43726f77646c6f610000000000000000',
    publicKey: '0x165161616161',
    balance: {
      transferable: '123231200000'
    },
    reserved: {
      bonded: '234565',
      unbonding: '2144',
      democracy: '234',
      election: '234',
      vesting: '2342'
    },
    locked: {
      bonded: '6772',
      unbonding: '3',
      democracy: '5',
      election: '76',
      vesting: '32'
    },
    personalIntroduction:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultrices aliquet est ac consequat. Quisque tincidunt tellus at dapibus lacinia. Etiam gravida pulvinar vestibulum.',
    address: '6a7YefNJArBVBBVzdMdJ5V4giafmBdfhwi7DiAcxseKA2zbt',
    stash: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
    controller: '15a9ScnYeVfQGL9HQtTn3nkUY1DTB8LzEX391yZvFRzJZ9V7',
    riotID: '@jacogr:matrix.parity.io',
    website: 'http://github/jacobgr',
    email: 'test@elixxir.io',
    twitter: 'xx_network'
  };
});

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
  return (
    <Stack
      direction={'row'}
      spacing={1}
      divider={<Divider flexItem variant='middle' orientation='vertical' />}
    >
      <span>{roles[0]}</span>
      <CustomTooltip title={<RolesTooltipContent roles={roles} />} arrow placement='right'>
        {roles.length > 1 ? <SwitchAccountIcon /> : <AccountBoxIcon />}
      </CustomTooltip>
    </Stack>
  );
};

const accountToRow = (item: ListAccounts['account'][0]): BaselineCell[] => {
  const rankProps = sampleData[0].rank <= 10 ? { style: { fontWeight: 900 } } : {};
  return [
    { value: sampleData[0].rank, props: rankProps },
    {
      value: <Address value={item.address} link={`/accounts/${item.address}`} truncated />
    },
    { value: sampleData[0].transactions },
    { value: rolesToCell(sampleData[0].roles), props: { colSpan: 2 } },
    { value: <FormatBalance value={sampleData[0].lockedCoin} /> },
    { value: <FormatBalance value={sampleData[0].balance.transferable} /> }
  ];
};

const useHeaders = () => {
  const [sortVariables, setSortVariables] = useState<Record<Roles, boolean>>({
    validator: false,
    nominator: false,
    council: false,
    'technical committee': false,
    treasury: false
  });
  return [
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
    rowsPerPage: 20,
    cursorField: 'timestamp'
  });
  const headers: BaselineCell[] = useHeaders();
  const variables = useMemo(
    () => ({
      limit,
      offset,
      where: { timestamp: { _lte: timestamp } }
    }),
    [limit, offset, timestamp]
  );
  const { data, loading } = useQuery<ListAccounts>(LIST_ACCOUNTS, { variables });
  const rows = useMemo(() => (data?.account || []).map(accountToRow), [data?.account]);
  const footer = useMemo(() => {
    if (data?.agg && data?.account && data.account.length) {
      return (
        <TablePagination
          page={page}
          count={data.agg.aggregate.count}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange(data.account[0])}
          rowsPerPageOptions={[10, 20, 30, 40, 50]}
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
      {
        loading
          ? <TableSkeleton cells={headers.length} rows={rowsPerPage} />
          : <BaselineTable headers={headers} rows={rows} footer={footer} />
      }
    </PaperStyled>
  );
};

export default HoldersTable;
