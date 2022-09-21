import React, { FC, useCallback, useEffect } from 'react';

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export const ERAS_IN_A_QUARTER = 90;
export const ERAS_IN_A_MONTH = 30;

const timeframeLabels: Record<string, number> = {
  All: 0,
  Quarter: ERAS_IN_A_QUARTER,
  Month: ERAS_IN_A_MONTH
};

type Props = {
  value?: number;
  onChange: (eras: number) => void;
}

const TimeframesDropdown: FC<Props> = ({ onChange, value }) => {
  const handleChange = useCallback(
    ({ target }: SelectChangeEvent<number>) => onChange(Number(target.value)),
    [onChange]
  );

  useEffect(() => {
    if (value === undefined) {
      onChange(ERAS_IN_A_MONTH);
    }
  }, [onChange, value])
  
  return (
      <FormControl variant='standard'>
        <Select
          labelId='timeframe-label'
          id='timeframe-select'
          value={value ?? 0}
          label='Timeframe'
          onChange={handleChange}
        >
          {Object.entries(timeframeLabels).map(([label, time]) => (
            <MenuItem value={time} key={time}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};

export default TimeframesDropdown;
