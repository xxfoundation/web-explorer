import { BN, BN_ZERO } from '@polkadot/util';

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
import { Close, Warning } from '@mui/icons-material';
import { keyring } from '@polkadot/ui-keyring';

import useAccounts from '../../../../hooks/useAccounts';
import { TableStyled } from '../../../../components/Tables/TableContainer.styled';
import Address from '../../../../components/Hash/XXNetworkAddress';
import { usePagination } from '../../../../hooks';
import useApi from '../../../../hooks/useApi';
import FormatBalance from '../../../../components/FormatBalance';
import Loading from '../../../../components/Loading';
import { CustomTooltip as Tooltip } from '../../../../components/Tooltip';

import { useQuery } from '@apollo/client';
import { GET_EXTRINSIC_COUNTS, GetExtrinsicCounts } from '../../../../schemas/accounts.schema';

type Props = {
  selected: string;
  onSelect: (addr: string) => void;
};

const WalletSelection: FC<Props> = ({ onSelect, selected }) => {
  const accounts = useAccounts();
  const { api } = useApi();
  const pagination = usePagination({ rowsPerPage: 10 });
  const [balances, setBalances] = useState<BN[]>();

  const [rewards, setRewards] = useState<BN>(BN_ZERO);
  const { data, loading }= useQuery<GetExtrinsicCounts>(GET_EXTRINSIC_COUNTS, {
    variables: { accountId: selected }
  });

  useEffect(() => {
    if (data && !loading) {
      setRewards(new BN(data.rewardsInfo.aggregate.sum.amount || 0))
    }
  }, [selected, data, loading])

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
      <Typography>
        The selected account has earned <FormatBalance value={rewards} /> in staking rewards
      </Typography>
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
                    <Stack direction='row'>
                      {balances[i]?.eqn(0) && (
                        <Tooltip
                          title='A positive balance is required for any staking activity'
                          placement='top'
                        >
                          <Warning sx={{ mr: 1, color: 'warning.main' }} />
                        </Tooltip>
                      )}
                      <Address
                        truncated='mdDown'
                        value={acct}
                        disableUrl={balances[i]?.eqn(0)}
                        disableAvatar={balances[i]?.eqn(0)}
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      <FormatBalance value={balances[i]} />
                    </Typography>
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
