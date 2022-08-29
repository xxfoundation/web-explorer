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
    () => {
      if (option === 'stake') {
        return ((amount.gte(BN_ZERO) && activeStake.gt(BN_ZERO)) || amount.gte(DECIMALS_POW)) && amount.lte(available)
      } else if (option === 'redeem') {
        return true
      }
      // Unstake valid amounts are > 0, but at most available - 1 OR available
      return (amount.gt(BN_ZERO) && amount.lte(available.sub(DECIMALS_POW))) || amount.eq(available)
    },
    [activeStake, amount, available, option]
  );

  useEffect(() => {
    if (option === 'redeem') {
      setAmount(redeemable);
    }
    setAmountIsValid(amountIsValid);
  }, [amountIsValid, option, redeemable, setAmount, setAmountIsValid]);

  const title = useMemo<Record<StakingOptions, string>>(
    () => ({
      redeem: 'Redeem',
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

      let value = new BN(parsed).mul(DECIMALS_POW).div(BN_TEN.pow(new BN(decimalPoints)));
      if (option === 'unstake' && value.gt(available.sub(DECIMALS_POW))) {
        value = available;
      }
      setAmount(value);
    },
    [setAmount, option, available]
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
      {activeStake.gt(BN_ZERO) ? (
        <i>
          <br />
          (To change the selected validators, you can proceed with 0)
        </i>
      ) : (
        <i>
          <br />
          (When Staking for the first time, a minimum of 1 xx is required)
        </i>
      )}
    </>
  );
  const unstakeInputLabel = (
    <>
      Insert Amount from <i>Available to Unstake</i> to be removed from <i>Active Stake</i>
      <i>
        <br />
        (When unstaking, the resulting active stake cannot be less than 1 xx, unless its 0 xx)
      </i>
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
                  {option !== 'redeem' && <TableCell>Active Stake</TableCell>}
                  <TableCell>
                    <>Available to {option}</>
                  </TableCell>
                  <TableCell>Total Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  {option !== 'redeem' && (
                    <TableCell>
                      <Typography sx={{ color: validationColor }} variant='body2'>
                        <FormatBalance value={displayedStake} precision={4} />
                      </Typography>
                    </TableCell>
                  )}
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
              <AlertTitle sx={{ fontSize: '1rem', mb: 1 }}>Reedeming unstaked coins</AlertTitle>
              <Typography variant='body3'>
                You will be unlocking the coins you've previously unstaked. After signing and
                submitting the transaction you will be able to transfer, vote or stake those coins
                again. Notice that the Total Balance of your account includes the locked coins,
                which means that balance will NOT increase after redeeming these coins.
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
