import React, { FC, useCallback, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import {
  Button,
  FormControl,
  Stack,
  TextField,
  useTheme
} from '@mui/material';

export type TDate = string | number | Date | null

export type Props = {
  value?: TDate | number;
  onChange: (date: TDate) => void;
  maximumRange?: number;
  dateOnly?: boolean
};


const SingleDate: FC<Props> = ({
                                onChange,
                                value = null,
                              }) => {
  const theme = useTheme();
  const [date, setDate] = useState<TDate>(value);

  const applyChanges = useCallback(() => {
    onChange(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const reset = useCallback(() => {
    setDate(null);
  }, []);
  
  const dateChanged = useCallback(
    (f: TDate) => {
      const d = new Date(f || '')
      const newDate = d.setHours(7,0,0,0)
      setDate(newDate);
    },
    []
  );

  const canApplyChanges = value !== date;

  return (
    <Stack padding={2}>
      <FormControl sx={{ mb: 1.5 }} component='div'>
        <DatePicker
          disableFuture
          label={'Date (UTC)'}
          onChange={dateChanged}
          value={date}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormControl>
      <Stack direction={'row'} marginTop={'12px'} justifyContent={'space-evenly'}>
        <Button
          disabled={!canApplyChanges}
          variant='contained'
          sx={{
            borderRadius: '45px',
            textTransform: 'uppercase',
            marginRight: '1em'
          }}
          onClick={applyChanges}
        >
          Apply
        </Button>
        <Button
          variant='contained'
          sx={{
            bgcolor: theme.palette.grey[200],
            color: theme.palette.text.primary,
            borderRadius: '45px',
            textTransform: 'uppercase',
            boxShadow: 'none',
            [':hover']: {
              bgcolor: theme.palette.grey[200],
              color: theme.palette.text.primary
            }
          }}
          onClick={reset}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
};

export default SingleDate;
