import React, { FC, useCallback, useMemo, useState } from 'react';
import {
  useTheme,
  Badge,
  Button,
  Checkbox,
  Input,
  FormControlLabel,
  Stack,
  FormControl,
  Typography
} from '@mui/material';
import { uniq } from 'lodash';

import Dropdown from '../../Dropdown';
import { arrayCompare } from '../../utils';
import Loading from '../../Loading';
import { Box } from '@mui/system';

type Props = {
  buttonLabel: string | null | React.ReactNode;
  search?: string;
  onSearchChange?: (s: string) => void;
  value?: string[];
  transformValue?: (s: string) => string | React.ReactNode,
  valuesLoading?: boolean;
  onChange: (v?: string[]) => void;
  availableValues?: string[];
  disabled?: boolean
};

const ValuesFilter: FC<Props> = ({
  availableValues: available,
  buttonLabel,
  disabled = false,
  onChange,
  onSearchChange,
  search = '',
  transformValue = (s) => s,
  value,
  valuesLoading = false,
}) => {
  const theme = useTheme();
  const [localValues, setLocalValues] = useState<string[] | undefined>(value);
  const toggleValue = useCallback(
    (module: string) =>
      setLocalValues((currentModules) =>
        currentModules?.includes(module)
          ? currentModules?.filter((meth) => meth !== module)
          : currentModules?.concat(module).sort((a, b) => a.localeCompare(b))
      ),
    []
  );

  const [valuesFilter, setValuesFilter] = useState('');

  const onSearchFilterChange = useCallback((v: string) => {
    
    if (onSearchChange) {
      onSearchChange(v)
    } else {
      setValuesFilter(v);
    }
  }, [onSearchChange])

  const toggleFilter = useCallback(() => {
    setLocalValues((m) => (m !== undefined ? undefined : []));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reset = useCallback(() => {setLocalValues(undefined); onChange([])}, []);
  const applyChanges = useCallback(() => onChange(localValues), [localValues, onChange]);
  const canApplyChanges = !valuesLoading && (localValues !== value || !arrayCompare(localValues, value));

  const availableValues = useMemo(
    () => uniq((localValues ?? []).concat(available ?? [])),
    [available, localValues]
  );

  return (
    <Dropdown
      disabled={disabled}
      buttonLabel={
        <>
          {buttonLabel}
          &nbsp;
          {localValues !== undefined && localValues.length > 0 && (
            <>
              <Badge color='primary' sx={{ pl: 1 }} badgeContent={localValues.length} />
              &nbsp;
            </>
          )}
        </>
      }
    >
      <Stack padding={2}>
        <FormControlLabel
          sx={{
            mb: 1,
            span: {
              fontSize: '14px',
              fontWeight: 400,
              color:
                localValues !== undefined ? theme.palette.primary.main : theme.palette.grey[600]
            }
          }}
          control={<Checkbox checked={localValues !== undefined} onChange={toggleFilter} />}
          label={'Enable'}
        />
        {localValues !== undefined && (
          <Stack>
            <FormControl>
              <Input
                sx={{ mb: 1 }}
                placeholder='Search...'
                onChange={(v) => onSearchFilterChange(v.target.value)}
                value={search || valuesFilter}
              />
            </FormControl>
            {valuesLoading ? (
              <Box sx={{ my: 2 }}>
                <Loading size='sm' />
                <Box sx={{ mt: 1, textAlign: 'center' }}>
                  <Typography variant='body3' sx={{ fontSize: 12 }}>
                    Loading...
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Stack sx={{ maxHeight: '12rem', overflow: 'auto', mb: 1 }}>
                {availableValues?.length === 0 && (
                  <Typography variant='body3'>
                    No available values...
                  </Typography>
                )}
                {availableValues?.map((val) => (
                  <FormControlLabel
                    key={val}
                    sx={{
                      mb: -0.75,
                      span: {
                        fontSize: '14px',
                        fontWeight: 400,
                        color: localValues.includes(val)
                          ? theme.palette.primary.main
                          : theme.palette.grey[600]
                      }
                    }}
                    control={
                      <Checkbox
                        checked={localValues.includes(val)}
                        onChange={() => toggleValue(val)}
                      />
                    }
                    label={transformValue(val)}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        )}
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
    </Dropdown>
  );
};

export default ValuesFilter;
