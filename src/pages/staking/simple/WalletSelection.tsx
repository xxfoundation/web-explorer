import type { BN } from '@polkadot/util';

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Checkbox, Typography, Stack, Table, TableCell, TableHead, TableBody, TableRow } from '@mui/material';

import useAccounts from '../../../hooks/useAccounts';
import { TableStyled } from '../../../components/Tables/TableContainer.styled';
import Address from '../../../components/Hash/XXNetworkAddress';
import { usePagination } from '../../../hooks';
import useApi from '../../../hooks/useApi';
import FormatBalance from '../../../components/FormatBalance';
import Loading from '../../../components/Loading';


type Props = {
  selected: string;
  onSelect: (addr: string) => void;
}

const WalletSelection: FC<Props> = ({ onSelect, selected }) => {
  const accounts = useAccounts();
  const { api } = useApi();
  const pagination = usePagination({ rowsPerPage: 10 });
  const [balances, setBalances] = useState<BN[]>();

  const { setCount } = pagination;
  useEffect(() => {
    setCount(accounts.allAccounts.length);
  }, [accounts.allAccounts.length, setCount])

  useEffect(() => {
    api?.query?.system?.account.multi(accounts?.allAccounts)
      .then((infos) => {
        const b = infos.map((info) => info.data.free.add(info.data.reserved));
        setBalances(b);
      });
  }, [accounts?.allAccounts, api?.query?.system?.account]);

  const handleCheckboxClick = useCallback((acct: string) => () => {
    onSelect(acct);
  }, [onSelect]);

  const { paginate } = pagination;
  const paginated = useMemo(() => paginate(accounts.allAccounts), [accounts, paginate])

  return (
    <Stack spacing={4}>
      <Typography variant='h2'>
        Select Wallet
      </Typography>
      {(!balances || !accounts) ? <Loading /> : (
        <TableStyled>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>
                  Account
                </TableCell>
                <TableCell>
                  Balance
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
            {paginated.map((acct, i) => (
              <TableRow key={acct}>
                <TableCell>
                  <Address truncated='mdDown' value={acct} />
                </TableCell>
                <TableCell>
                  <FormatBalance value={balances[i]} />
                </TableCell>
                <TableCell>
                <Checkbox
                  checked={selected === acct}
                  onChange={handleCheckboxClick(acct)} />
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableStyled>
      )}
      {pagination.controls}
    </Stack>
  );
}

export default WalletSelection;

