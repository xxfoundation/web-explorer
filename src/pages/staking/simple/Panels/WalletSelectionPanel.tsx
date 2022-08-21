import type { BN } from '@polkadot/util';

import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Typography,
  Radio,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Button,
  Box
} from '@mui/material';
import { keyring } from '@polkadot/ui-keyring';
import useAccounts from '../../../../hooks/useAccounts';
import { TableStyled } from '../../../../components/Tables/TableContainer.styled';
import Address from '../../../../components/Hash/XXNetworkAddress';
import { usePagination } from '../../../../hooks';
import useApi from '../../../../hooks/useApi';
import FormatBalance from '../../../../components/FormatBalance';
import Loading from '../../../../components/Loading';
import { Close } from '@mui/icons-material';

type Props = {
  selected: string;
  onSelect: (addr: string) => void;
};

const WalletSelection: FC<Props> = ({ onSelect, selected }) => {
  const accounts = useAccounts();
  const { api } = useApi();
  const pagination = usePagination({ rowsPerPage: 10 });
  const [balances, setBalances] = useState<BN[]>();

  const { setCount } = pagination;
  useEffect(() => {
    setCount(accounts.allAccounts.length);
  }, [accounts.allAccounts.length, setCount]);

  useEffect(() => {
    api?.query.system.account
      .multi(accounts?.allAccounts)
      .then((infos) => {
        const b = infos.map((info) => info.data.free.add(info.data.reserved));
        setBalances(b);
      })
      .catch((error) => console.error(error));
  }, [accounts?.allAccounts, api?.query?.system?.account]);

  const handleAccountChange = useCallback(
    (acct: string) => () => {
      onSelect(acct);
    },
    [onSelect]
  );

  const { paginate } = pagination;
  const paginated = useMemo(() => paginate(accounts.allAccounts), [accounts, paginate]);

  const forget = useCallback(
    (acct: string) => () => {
      const confirmed = confirm('Are you sure you want to forget this account?');
      if (confirmed) {
        keyring.forgetAccount(acct);
      }
    },
    []
  );

  return (
    <Stack spacing={4}>
      <Typography variant='h2'>Select Wallet</Typography>
      {!balances || !accounts || !navigator.onLine ? (
        <Box sx={{ p: 5, py: 20 }}>
          <Loading size='md' />
          <Typography variant='body1' sx={{ textAlign: 'center', marginTop: '1em' }}>
            Trying to connect to the API... Please check your internet connectivity
          </Typography>
        </Box>
      ) : (
        <TableStyled>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>Balance</TableCell>
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
                    <Stack alignItems='center' direction='row'>
                      <Radio
                        disabled={!balances[i] || balances[i].eqn(0)}
                        checked={selected === acct}
                        onChange={handleAccountChange(acct)}
                        value={acct}
                      />
                      <Button
                        size='small'
                        color='error'
                        onClick={forget(acct)}
                        sx={{ minWidth: 0 }}
                      >
                        <Close color='error' />
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {pagination.controls}
        </TableStyled>
      )}
    </Stack>
  );
};

export default WalletSelection;
