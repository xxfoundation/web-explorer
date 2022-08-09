import { BN, BN_TEN, BN_ZERO } from '@polkadot/util';
import type { StakingOptions } from './SimpleStaker'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, useTheme} from '@mui/material';

import { TableStyled } from '../../../components/Tables/TableContainer.styled';
import useBalances from '../../../hooks/useBalances';
import Address from '../../../components/Hash/XXNetworkAddress';
import useStakingInfo from '../../../hooks/useStakingInfo';
import FormatBalance from '../../../components/FormatBalance';
import Loading from '../../../components/Loading';

type Props = {
  option: StakingOptions;
  amount?: BN;
  setAmountIsValid: (valid: boolean) => void;
  setAmount: (bn: BN) => void;
  account: string;
}

const DECIMAL_POINTS = 9;
const DECIMALS_POW = BN_TEN.pow(new BN(DECIMAL_POINTS));

const bnToStringDecimal = (bn: BN) => {
  const converted = bn.toString();
  const regex = `[0-9]{1,${DECIMAL_POINTS}}$`;
  const match = converted.match(new RegExp(regex));
  const decimals = match?.[0];
  const lengthDiff = converted.length - (decimals?.length ?? 0);
  const integers = converted.slice(0, lengthDiff) || '0';
  const d = decimals?.replace(new RegExp(`0{1,${DECIMAL_POINTS}}$`), '');

  return `${integers}${d ? '.' : ''}${d}`;
}

const AmountSelection: FC<Props> = ({ account, amount = BN_ZERO, option, setAmount, setAmountIsValid }) => {
  const theme = useTheme();
  const balances = useBalances(account);
  const stakingInfo = useStakingInfo(account);
  const [inputTouched, setInputTouched] = useState(false);

  const amountIsValid = useMemo(() => 
    amount.gt(BN_ZERO) && amount.lte(
      balances?.availableBalance ?? BN_ZERO
    ),
    [amount, balances?.availableBalance]
  );

  useEffect(() => {
    setAmountIsValid(amountIsValid);
  }, [amountIsValid, setAmountIsValid]);

  const title = useMemo<Record<StakingOptions, string>>(() => ({
    'redeem': 'Tokens to be redeemed',
    'stake': 'Input amount to stake',
    'unstake': 'Input amount to unstake'
  }), []);

  const loading = !balances || !stakingInfo;

  const stakedAmount = stakingInfo?.stakingLedger.active.toBn().add(amount) ?? BN_ZERO;
  const freeBalance = balances?.freeBalance.toBn() ?? BN_ZERO;
  const totalBalance = stakedAmount.add(freeBalance);

  const setMax = useCallback(() => {
    setAmount(freeBalance);
  }, [freeBalance, setAmount]);

  const onInputChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputTouched(true);
    const decimalPoints = evt.target.value.split('.')[1]?.length ?? 0;
    const parsed = evt.target.value.replace(/\D/g, '');

    setAmount(
      new BN(parsed)
        .mul(DECIMALS_POW)
        .div(BN_TEN.pow(new BN(decimalPoints)))
    );
  }, [setAmount]);

  const amountString = useMemo(() => bnToStringDecimal(amount ?? BN_ZERO), [amount])

  const error = inputTouched && !amountIsValid;

  const validationColor = freeBalance.lt(BN_ZERO) ? theme.palette.error.main : (amount.gt(BN_ZERO) ? theme.palette.success.main : undefined);

  return (
    <Stack spacing={4}>
      <Typography variant='h2'>
        {title[option]}
      </Typography>
      <Box>
        <Typography variant='h3' sx={{ mb: 2 }}>
          Account
        </Typography>
        <Address value={account} truncated='mdDown' />
      </Box>
      <Loading loading={loading}>
        <Stack spacing={4}>
          <TableStyled>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Active Stake
                  </TableCell>
                  <TableCell>
                    Available to stake
                  </TableCell>
                  <TableCell>
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography sx={{ color: validationColor }} variant='body2'>
                        <FormatBalance value={stakedAmount} />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        <FormatBalance value={freeBalance} />
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body2'>
                        <FormatBalance value={totalBalance} />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
            </Table>
          </TableStyled>
          <Box>
            <FormControl>
              <OutlinedInput
                error={error}
                size='small'
                value={amountString}
                type='number'
                onChange={onInputChange}
                endAdornment={
                  <InputAdornment position='end'>
                    <Button onClick={setMax}>
                      Max
                    </Button>
                  </InputAdornment>
                }
              />
              {error && (
                <FormHelperText sx={{ color: theme.palette.error.main }}>
                  Amount is invalid
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        </Stack>
      </Loading>
    </Stack>
  )
}

export default AmountSelection;
