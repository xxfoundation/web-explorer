import React, { FC } from 'react';
import {
  Typography,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid
} from '@mui/material';
import { StakingOptions } from '../SimpleStaker';
import { StakingBalances } from '../../../../simple-staking/actions';
import FormatBalance from '../../../../components/FormatBalance';
import { TableStyled } from '../../../../components/Tables/TableContainer.styled';
import { BN } from '@polkadot/util';

const optionText = (enabled: boolean, title: string, body: JSX.Element | string) => {
  return (
    <Grid item xs={12} sx={{ m: 2 }}>
      <Typography sx={{ fontWeight: enabled ? 600 : 400 }} variant='h3'>{title}</Typography>
      <Typography sx={{ fontWeight: enabled ? 600 : 400 }} variant='body2'>{body}</Typography>
    </Grid>
  );
};

const styledBalance = (value: string | BN) => {
  return (
    <Typography sx={{ color: 'black', fontWeight: 600}} variant='body3'>
      <FormatBalance value={value} />
    </Typography>
  );
}

type Props = {
  balances: StakingBalances;
  selected?: string;
  onSelect: (option: StakingOptions) => void;
};

const ActionSelection: FC<Props> = ({ balances, onSelect, selected }) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(evt.target.value as StakingOptions);
  };

  return (
    <>
      <Stack spacing={4}>
        <Typography variant='h2'>Select one of the following options:</Typography>
        <FormControl>
          <RadioGroup
            value={selected ?? ''}
            aria-labelledby='staking-options'
            defaultValue='stake'
            name='staking-options'
            onChange={handleChange}
          >
            <FormControlLabel
              labelPlacement='end'
              value='stake'
              control={<Radio disabled={balances.available.eqn(0)} />}
              label={
                balances.available.eqn(0)
                  ? optionText(false, 'Stake', <>This account has no funds to be staked. </>)
                  : optionText(true,
                      'Stake',
                      <>
                        You have {styledBalance(balances.staked)} staked. You can stake up to {styledBalance(balances.available)} more.
                      </>
                    )
              }
            />
            <FormControlLabel
              labelPlacement='end'
              value='unstake'
              control={<Radio disabled={balances.staked.eqn(0)} />}
              label={
                balances.staked.eqn(0)
                  ? optionText(false, 'Unstake', <>This account has no funds to be unstaked. </>)
                  : optionText(true,
                      'Unstake',
                      <>
                        You can unstake up to {styledBalance(balances.staked)}.
                      </>
                    )
              }
            />
            <FormControlLabel
              labelPlacement='end'
              value='redeem'
              control={<Radio disabled={balances.redeemable.eqn(0)} />}
              label={
                balances.redeemable.eqn(0)
                  ? optionText(false, 'Redeem', <>This account has no funds to be redeemed. </>)
                  : optionText(true,
                      'Redeem',
                      <>
                        You can redeem {styledBalance(balances.redeemable)}.
                      </>
                    )
              }
            />
          </RadioGroup>
        </FormControl>
        { balances.unlocking.length > 0 &&
          <Stack spacing={2}>
            <Typography variant='h3'>Unstaked funds</Typography>
            <TableStyled>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell>Amount</TableCell>
                    <TableCell>Available to redeem in</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {balances.unlocking.map(([value, days]) => (
                    <TableRow>
                    <TableCell>
                    <Typography>
                      <FormatBalance value={value} />
                    </Typography>
                    </TableCell>
                    <TableCell>
                    <Typography>{days} day{(days > 1) && 's'}</Typography>
                    </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableStyled>
          </Stack>
        }
      </Stack>
    </>
  );
};

export default ActionSelection;
