import React, { FC, useEffect, useState } from 'react';
import { Typography, Stack, Table, TableCell, TableHead, TableBody, TableRow } from '@mui/material';
import { PalletBalancesAccountData } from '@polkadot/types/lookup';
import { BN, BN_ZERO } from '@polkadot/util';

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

const getTotal = (balances?: PalletBalancesAccountData): BN =>
  balances?.free.toBn().add(balances?.reserved.toBn()) || BN_ZERO;

const WalletSelection: FC<Props> = ({ onSelect, selected }) => {
  const accounts = useAccounts();
  const { api } = useApi();
  const pagination = usePagination({ rowsPerPage: 10 });
  const [balances, setBalances] = useState<BN[]>();

  useEffect(() => {
    api?.query?.system?.account.multi(accounts?.allAccounts)
      .then((infos) => {
        const b = infos.map((info) => info.data.free.add(info.data.reserved));
        setBalances(b);
      });
  }, [accounts?.allAccounts, api?.query?.system?.account]);


  return (
    <>
      <Stack spacing={4}>
        <Typography variant='h2'>
          Select Wallet
        </Typography>
        {(!balances || !accounts) ? <Loading /> : (
          <TableStyled>
            <Table size='small'>
              <TableHead>
                <TableCell>
                  Account
                </TableCell>
                <TableCell>
                  Balance
                </TableCell>
                <TableCell />
              </TableHead>
              <TableBody>
              {accounts.allAccounts.map((acct, i) => (
                <TableRow key={acct}>
                  <TableCell>
                    <Address value={acct} />
                  </TableCell>
                  <TableCell>
                    <FormatBalance value={balances[i]} />
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableStyled>
        )}
      </Stack>
    </>
  );
}

export default WalletSelection;

