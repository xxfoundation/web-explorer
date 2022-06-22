import React, { FC, useCallback, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { Checkbox, FormControl, FormControlLabel, Stack, useTheme } from '@mui/material';
import { useToggle } from '../hooks';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from 'notistack';

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
  maximumRange?: number;
}

const THREE_MONTHS_IN_SECONDS = 7890000000;

const DateRange: FC<Props> = ({ onChange, range = { from: null, to: null }, maximumRange = THREE_MONTHS_IN_SECONDS }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [fromEnabled, { toggle: toggleFrom }] = useToggle(!!range.from);
  const [toEnabled, { toggle: toggleTo }] = useToggle(!!range.to);

  const validateRange = useCallback((keyChanged: keyof Range, r: Range) => {
    let newRange = r;
    const timeThatToIsBehindOfFrom = dayjs.utc(r.from).diff(r.to).valueOf() ?? 0;

    if (timeThatToIsBehindOfFrom > 0) {
      enqueueSnackbar(
        'You can\'t travel back in time',
        { variant: 'error' }
      );
      
      newRange = keyChanged === 'from' ? {
        ...r,
        from: r.to
      } : { ...r, to: r.from };
    }

    const differenceOverMax = dayjs.utc(r.to).diff(r.from).valueOf() - maximumRange;
    if (differenceOverMax > 0) {
      enqueueSnackbar(
        `Date range is over maximum of ${dayjs.duration(maximumRange).humanize()}`,
        { variant: 'error' }
      );
      if (keyChanged === 'to') {
        newRange = {
          ...r,
          to: dayjs.utc(dayjs.utc(r.to).valueOf() - differenceOverMax).toISOString()
        }
      } else {
        newRange = {
          ...r,
          from:  dayjs.utc(dayjs.utc(r.from).valueOf() + differenceOverMax).toISOString()
        }
      }
    }

    return newRange;
  }, [enqueueSnackbar, maximumRange]);

  const validatedOnChange = useCallback(
    (k: keyof Range, r: Range) => onChange(validateRange(k, r)),
    [onChange, validateRange]
  );

  const fromChanged = useCallback((from: Dayjs | null) => {
    validatedOnChange('from', {
      ...range,
      from: from?.toISOString() ?? null,
    });
  }, [range, validatedOnChange]);

  const toChanged = useCallback((to: Dayjs | null) => {
      validatedOnChange('to', {
      ...range,
      to: to?.toISOString() ?? null,
    })
  }, [validatedOnChange, range]);

  useEffect(
    () => {
      if (fromEnabled && range.from === null) {
        fromChanged(defaultFrom);
      }

      if (!fromEnabled && range.from !== null) {
        fromChanged(null);
      }
    },
    [fromChanged, fromEnabled, range.from]
  );

  useEffect(
    () => {
      if (toEnabled && range.to === null) {
        toChanged(defaultTo);
      }
      
      if (!toEnabled && range.to !== null) {
        toChanged(null);
      }
    }
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
            disableFuture
            label={'From (UTC)'}
            onChange={fromChanged}
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
          disableFuture
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
