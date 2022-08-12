import { BN, BN_TEN, BN_ZERO } from '@polkadot/util';
import type { StakingOptions } from '../SimpleStaker';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';

import { TableStyled } from '../../../../components/Tables/TableContainer.styled';
import Address from '../../../../components/Hash/XXNetworkAddress';
import FormatBalance from '../../../../components/FormatBalance';
import Loading from '../../../../components/Loading';
import { StakingBalances } from '../../../../simple-staking/actions';

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
};

type Props = {
  account: string;
  amount?: BN;
  balances?: StakingBalances;
  option?: StakingOptions;
  setBalances: (balances: StakingBalances) => void;
  setAmountIsValid: (valid: boolean) => void;
  setAmount: (bn: BN) => void;
};

const AmountSelection: FC<Props> = ({
  account,
  amount = BN_ZERO,
  balances,
  option,
  setAmount,
  setAmountIsValid
}) => {
  const theme = useTheme();
  const [inputTouched, setInputTouched] = useState(false);

  const activeStake = balances?.staked ?? BN_ZERO;
  const available =
    option === 'stake' ? balances?.available ?? BN_ZERO : balances?.staked ?? BN_ZERO;
  const redeemable = balances?.redeemable ?? BN_ZERO;
  const totalBalance = balances?.total ?? BN_ZERO;

  const displayedStake = useMemo(() => {
    return option === 'stake' ? activeStake.add(amount) : activeStake.sub(amount);
  }, [activeStake, amount, option]);

  const amountIsValid = useMemo(
    () => amount.gt(BN_ZERO) && amount.lte(available),
    [amount, available]
  );

  useEffect(() => {
    setAmountIsValid(amountIsValid);
  }, [amountIsValid, setAmountIsValid]);

  const title = useMemo<Record<StakingOptions, string>>(
    () => ({
      redeem: 'Tokens to be Redeemed',
      stake: 'Input Amount to Stake',
      unstake: 'Input Amount to Unstake'
    }),
    []
  );

  const loading = !balances;

  const setMax = useCallback(() => {
    setAmount(available);
  }, [available, setAmount]);

  const onInputChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      setInputTouched(true);
      const decimalPoints = evt.target.value.split('.')[1]?.length ?? 0;
      const parsed = evt.target.value.replace(/\D/g, '');

      setAmount(new BN(parsed).mul(DECIMALS_POW).div(BN_TEN.pow(new BN(decimalPoints))));
    },
    [setAmount]
  );

  const amountString = useMemo(() => bnToStringDecimal(amount ?? BN_ZERO), [amount]);

  const error = inputTouched && !amountIsValid;

  const validationColor = available.lt(BN_ZERO)
    ? theme.palette.error.main
    : amount.gt(BN_ZERO)
    ? theme.palette.success.main
    : undefined;

  const stakeInputLabel = (
    <>
      Insert Amount from <i>Available to Stake</i> to be added to <i>Active Stake</i>
    </>
  );
  const unstakeInputLabel = (
    <>
      Insert Amount from <i>Available to Unstake</i> to be removed from <i>Active Stake</i>
    </>
  );

  return (
    <Stack spacing={4}>
      <Typography variant='h2'>{option && title[option]}</Typography>
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
                  <TableCell>Active Stake</TableCell>
                  <TableCell>
                    <>Available to {option}</>
                  </TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography sx={{ color: validationColor }} variant='body2'>
                      <FormatBalance value={displayedStake} precision={4} />
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant='body2'>
                      {option === 'redeem' ? (
                        <FormatBalance value={redeemable} />
                      ) : (
                        <FormatBalance value={available} />
                      )}
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
          {option === 'redeem' && (
            <Alert severity='info'>
              <AlertTitle sx={{ fontSize: '1rem', mb: 1 }}>Reedeming unstaked tokens</AlertTitle>
              <Typography variant='body3'>
                You will be unlocking the tokens you've previously unstaked. After signing and
                submitting the transaction you will be able to transfer, vote or stake those tokens
                again.
              </Typography>
            </Alert>
          )}
          {option !== 'redeem' && (
            <>
              <Typography variant='body3'>
                {option === 'stake' ? stakeInputLabel : unstakeInputLabel}
              </Typography>
              <Box sx={{ marginTop: '0.25em !important' }}>
                <FormControl>
                  <OutlinedInput
                    error={error}
                    size='small'
                    value={amountString}
                    type='number'
                    onChange={onInputChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <Button onClick={setMax}>Max</Button>
                      </InputAdornment>
                    }
                  />
                  {error && (
                    <FormHelperText sx={{ color: theme.palette.error.main }}>
                      {amount.gt(available)
                        ? 'Amount cannot be bigger than Available'
                        : 'Input Amount is invalid'}
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
            </>
          )}
        </Stack>
      </Loading>
    </Stack>
  );
};

export default AmountSelection;
