import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Checkbox, FormControlLabel, FormGroup, Popover, Stack } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useToggle } from '../../hooks';
import { theme } from '../../themes/default';
import { Roles } from './types';

type RoleFiltersType =
  | 'council'
  | 'nominators'
  | 'validators'
  | 'technical committe'
  | 'treasuries'
  | 'all';

export const filtersDefaultState = (): Record<Roles, boolean> => ({
  council: false,
  nominator: false,
  validator: false,
  'technical committe': false,
  treasuries: false
});

const AccountHoldersFilters: FC<{
  callback: Dispatch<SetStateAction<Record<Roles, boolean>>>;
}> = ({ callback, children }) => {
  const [open, { set: toggle }] = useToggle();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [filtersState, setFilters] = useState<Record<RoleFiltersType, boolean>>(
    useCallback(() => {
      const defaultValues = filtersDefaultState();
      return {
        all: false,
        council: defaultValues.council,
        nominators: defaultValues.nominator,
        validators: defaultValues.validator,
        'technical committe': defaultValues['technical committe'],
        treasuries: defaultValues.treasuries
      };
    }, [])
  );

  const onClick = useCallback(
    ({ currentTarget }) => {
      setAnchorEl(currentTarget);
      toggle(true);
    },
    [toggle, setAnchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
    toggle(false);
  }, [toggle, setAnchorEl]);

  const onCheckBoxChange = useCallback(
    (name: string, checked: boolean) => {
      setFilters((prev) => {
        return { ...prev, [name]: checked };
      });
    },
    [setFilters]
  );

  const filters = useMemo(() => {
    return Object.entries(filtersState).map(([label, value]) => {
      return (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              disabled={label === 'all' ? false : filtersState.all}
              checked={value as boolean}
              onChange={({ target: { checked } }) => onCheckBoxChange(label, checked)}
            />
          }
          label={label}
        />
      );
    });
  }, [filtersState, onCheckBoxChange]);

  const cleanFilters = useCallback(() => {
    setFilters(() => {
      const defaultState = filtersDefaultState();
      callback(defaultState);
      return {
        all: false,
        council: defaultState.council,
        nominators: defaultState.nominator,
        validators: defaultState.validator,
        'technical committe': defaultState['technical committe'],
        treasuries: defaultState.treasuries
      };
    });
  }, [callback]);

  const applyOnClick = useCallback(() => {
    const { all, ...queryFilters } = filtersState;
    callback(
      all
        ? {
            'technical committe': true,
            council: true,
            nominator: true,
            treasuries: true,
            validator: true
          }
        : {
            council: queryFilters.council,
            nominator: queryFilters.nominators,
            validator: queryFilters.validators,
            'technical committe': queryFilters['technical committe'],
            treasuries: queryFilters.treasuries
          }
    );
    handleClose();
  }, [callback, filtersState, handleClose]);

  const endIcon = useMemo(
    () => (open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />),
    [open]
  );

  return (
    <>
      <Button color={'inherit'} endIcon={endIcon} onClick={onClick}>
        {children}
      </Button>
      <Popover
        id='account-holders-table-filters'
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
      >
        <FormGroup sx={{ padding: '30px' }}>
          <Stack direction={'column'}>{filters}</Stack>
          <Stack direction={'row'} justifyContent={'space-evenly'}>
            <Button
              variant='contained'
              sx={{ borderRadius: '45px', textTransform: 'uppercase' }}
              onClick={applyOnClick}
            >
              apply
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
              onClick={cleanFilters}
            >
              clear
            </Button>
          </Stack>
        </FormGroup>
      </Popover>
    </>
  );
};

export default AccountHoldersFilters;
