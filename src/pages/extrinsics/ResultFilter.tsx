import { useTheme, Badge, Button, Checkbox, FormControlLabel, Stack, Switch } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';

import Dropdown from '../../components/Dropdown';

type Props = {
  value: boolean | null;
  onChange: (v: boolean | null) => void;
}

const ResultFilter: FC<Props> = ({ onChange, value }) => {
  const theme = useTheme();
  const [resultFilter, setResultFilter] = useState(value);

  const reset = useCallback(() => setResultFilter(null), []);
  const toggleFilter = useCallback(() => setResultFilter((v) => !v), []);
  const toggleFilterEnabled = useCallback(
    () => setResultFilter((v) => v === null ? true : null),
    []
  );
  const applyChanges = useCallback(
    () => onChange(resultFilter),
    [onChange, resultFilter]
  );

  const canApplyChanges = value !== resultFilter;

  return (
    <Dropdown buttonLabel={
      <>
        Result
        &nbsp;
        {resultFilter !== null && <>
          <Badge color='primary' sx={{ pl: 1 }} badgeContent={1} />
          &nbsp;
        </>
        }
      </>
    }>
      <Stack padding={2}>
        <FormControlLabel
          sx={{
            mb: 1,
            span: {
              fontSize: '14px',
              fontWeight: 400,
              color:
                resultFilter !== null
                  ? theme.palette.primary.main
                  : theme.palette.grey[600]
            }
          }}
          control={
            <Checkbox
              checked={resultFilter !== null}
              onChange={toggleFilterEnabled}
            />
          }
          label={'Enable'}
        />
        {resultFilter !== null && (
          <FormControlLabel
            label={resultFilter ? 'Success': 'Failed'}
            control={
              <Switch
                onChange={toggleFilter}
                inputProps={{'aria-label': resultFilter ? 'Success': 'Failed'}}
                checked={resultFilter}
                color='success' />
            }
          />
        )}
        <Stack
          direction={'row'}
          marginTop={'12px'}
          justifyContent={'space-evenly'}>
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
    </Dropdown>
  )
}

export default ResultFilter;
