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
import { StakingOptions } from './SimpleStaker';

const optionText = (title: string, body: string) => {
  return (
    <Grid item xs={12} sx={{ m: 2 }}>
      <Typography variant='h3'>{title}</Typography>
      <Typography variant='body2'>{body}</Typography>
    </Grid>
  );
};

type Props = {
  onSelect: (option: StakingOptions) => void;
};

const ActionSelection: FC<Props> = ({ onSelect }) => {
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(evt.target.value as StakingOptions);
  };

  return (
    <>
      <Stack spacing={4}>
        <Typography variant='h2'>Select one of the following options:</Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby='staking-options'
            defaultValue='stake'
            name='staking-options'
            onChange={handleChange}
          >
            <FormControlLabel
              labelPlacement='end'
              value='stake'
              control={<Radio />}
              label={optionText(
                'Stake',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              )}
            />
            <FormControlLabel
              labelPlacement='end'
              value='unstake'
              control={<Radio />}
              label={optionText(
                'Unstake',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              )}
            />
            <FormControlLabel
              labelPlacement='end'
              value='redeem'
              control={<Radio />}
              label={optionText(
                'Redeem',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              )}
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </>
  );
};

export default ActionSelection;
