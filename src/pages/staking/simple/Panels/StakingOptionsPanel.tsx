import React, { FC } from 'react';
import {
  Typography,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid
} from '@mui/material';
import { StakingOptions } from '../SimpleStaker';
import { StakingBalances } from '../../../../simple-staking/actions';
import FormatBalance from '../../../../components/FormatBalance';

const optionText = (enabled: boolean, title: string, body: JSX.Element | string) => {
  return (
    <Grid item xs={12} sx={{ m: 2 }}>
      <Typography style={{ fontWeight: enabled ? 600 : 400 }} variant='h3'>{title}</Typography>
      <Typography style={{ fontWeight: enabled ? 600 : 400 }} variant='body2'>{body}</Typography>
    </Grid>
  );
};

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
                        You can stake up to <FormatBalance value={balances.available} />.
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
                        You can unstake up to <FormatBalance value={balances.staked} />.
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
                        You can redeem <FormatBalance value={balances.redeemable} />.
                      </>
                    )
              }
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </>
  );
};

export default ActionSelection;
