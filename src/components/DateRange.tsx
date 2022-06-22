import React, { FC, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers';

type Range = {
  from?: string | null;
  to?: string | null;
}

type Props = {
  range?: Range;
  onChange: (range: Range) => void;
}

const DateRange: FC<Props> = ({ onChange, range }) => {
  const fromChange = useCallback((from: string | null) => {
    onChange({
      ...range,
      from,
    })
  }, [range, onChange]);

  const toChanged = useCallback((to: string | null) => {
    onChange({
      ...range,
      to
    })
  }, [onChange, range])

  return (
    <>
      <MobileDateTimePicker
        onChange={fromChange}
        value={range?.from}
        renderInput={(params) => <TextField {...params} />}
      />
      <MobileDateTimePicker
        onChange={toChanged}
        value={range?.from}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  )
}

export default DateRange;
