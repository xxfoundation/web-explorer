import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Divider, Stack, Typography } from '@mui/material';
import BN from 'bn.js';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { Address } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import genSkeletons from '../../components/genSkeletons';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';
import { BaselineCell, BaselineTable } from '../../components/Tables';
import TablePagination from '../../components/Tables/TablePagination';
import CustomTooltip from '../../components/Tooltip';
import { HoldersRoles } from './types';

const sampleAddress = '0xa86Aa530f6cCBd854236EE00ace687a29ad1c062';

type AccountType = {
  rank: number;
  transactions: number;
  roles: HoldersRoles[];
  lockedCoin: string | BN;
  balance: string | BN;
  account: string;
};

const sampleData: AccountType[] = genSkeletons(23).map((_, index) => {
  return {
    rank: index + 1,
    transactions: 123,
    roles: ['council', 'nominator'],
    lockedCoin: '000000',
    balance: '16880000',
    account: sampleAddress
  };
});

const headers: BaselineCell[] = [
  { value: 'rank' },
  { value: 'account' },
  { value: 'transactions' },
  { value: 'role', props: { colSpan: 2 } },
  { value: 'locked xx coin' },
  { value: 'balance xx' }
];

const RolesTooltipContent: FC<{ roles: HoldersRoles[] }> = ({ roles }) => {
  const labels = useMemo(
    () => roles.slice(1).map((role, index) => <span key={index}>{role}</span>),
    [roles]
  );
  return (
    <>
      <Typography>additional roles</Typography>
      <Stack spacing={2}>{labels}</Stack>
    </>
  );
};

const rolesToCell = (roles: HoldersRoles[]) => {
  return (
    <CustomTooltip title={<RolesTooltipContent roles={roles} />} arrow placement='right'>
      <Stack
        direction={'row'}
        spacing={1}
        divider={<Divider flexItem variant='middle' orientation='vertical' />}
      >
        <span>{roles[0]}</span>
        <AccountBoxIcon />
      </Stack>
    </CustomTooltip>
  );
};

const accountToRow = (item: AccountType): BaselineCell[] => {
  const rankProps = item.rank <= 10 ? { style: { fontWeight: 900 } } : {};
  return [
    { value: item.rank, props: rankProps },
    { value: <Address value={item.account} link={`/accounts/${item.account}`} truncated /> },
    { value: item.transactions },
    { value: rolesToCell(item.roles), props: { colSpan: 2 } },
    { value: <FormatBalance value={item.lockedCoin} /> },
    { value: <FormatBalance value={item.balance} /> }
  ];
};

const HoldersTable: FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const onRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  }, []);
  const onChangePage = useCallback((_: unknown, number: number) => {
    setPage(number);
  }, []);
  const rows = useMemo(
    () =>
      (rowsPerPage > 0
        ? sampleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : sampleData
      ).map(accountToRow),
    [page, rowsPerPage]
  );
  return (
    <PaperStyled>
      <Typography variant='h3' sx={{ mb: 7, px: '16px' }}>
        top 1,000 holders out of 100,765
      </Typography>
      <BaselineTable
        rows={rows}
        headers={headers}
        footer={
          <TablePagination
            page={page}
            count={sampleData.length}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            rowsPerPageOptions={[10, 20, 30, 40, 50]}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        }
      />
    </PaperStyled>
  );
};

export default HoldersTable;
