import React, { FC, useCallback, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Checkbox, FormControl, FormControlLabel, Stack, useTheme } from '@mui/material';
import { useToggle } from '../hooks';
import dayjs from 'dayjs';

const defaultFrom = dayjs.utc().startOf('day');
defaultFrom.set('hour', 7);
const defaultTo = defaultFrom.date(defaultFrom.date() + 1);;

export type Range = {
  from: string | null;
  to: string | null;
}

type Props = {
  range?: Range;
  onChange: (range: Range) => void;
}


const DateRange: FC<Props> = ({ onChange, range = { from: null, to: null } }) => {
  const theme = useTheme();
  const [fromEnabled, { toggle: toggleFrom }] = useToggle(!!range.from);
  const [toEnabled, { toggle: toggleTo }] = useToggle(!!range.to);

  const fromChange = useCallback((from: { $d: Date } | null) => {
    onChange({
      ...range,
      from: from && from.$d.toISOString(),
    })
  }, [range, onChange]);

  const toChanged = useCallback((to: { $d: Date } | null) => {
    onChange({
      ...range,
      to: to && to.$d.toISOString(),
    })
  }, [onChange, range]);

  useEffect(
    () => {
      const from = !fromEnabled ? null : (range.from ?? defaultFrom.toISOString());
      const to = !toEnabled ? null : (range.to ?? defaultTo.toISOString());

      onChange({
        from,
        to
      });
    },
    [fromEnabled, onChange, range.from, range.to, toEnabled]
  )

  return (
    <Stack padding={2}>
      <FormControlLabel
        sx={{
          mb: 1,
          span: {
            fontSize: '14px',
            fontWeight: 400,
            color:
              fromEnabled
                ? theme.palette.primary.main
                : theme.palette.grey[600]
          }
        }}
        control={
          <Checkbox
            checked={fromEnabled}
            onChange={toggleFrom}
          />
        }
        label={'From'}
      />
      {fromEnabled && (
        <FormControl
        sx={{ mb: 1.5 }}
          component='div'
        >
          <MobileDateTimePicker
            label={'From (UTC)'}
            onChange={fromChange}
            value={range?.from}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormControl>
        
      )}
      <FormControlLabel
        sx={{
          marginLeft: '-11px',
          span: {
            fontSize: '14px',
            fontWeight: 400,
            color:
              toEnabled
                ? theme.palette.primary.main
                : theme.palette.grey[600]
          }
        }}
        control={
          <Checkbox
            checked={toEnabled}
            onChange={toggleTo}
          />
        }
        label={'To'}
      />

      {toEnabled && (
        <MobileDateTimePicker
          label={'To (UTC)'}
          onChange={toChanged}
          value={range?.to}
          renderInput={(params) => <TextField {...params} />}
        />
      )}
    </Stack>
  )
}

export default DateRange;
