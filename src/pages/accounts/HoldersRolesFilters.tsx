import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Checkbox, FormControlLabel, FormGroup, Popover, Stack } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useToggle } from '../../hooks';
import { theme } from '../../themes/default';
import { Roles } from './types';

type RoleFiltersType = Roles | 'all';

export const filtersDefaultState = (): Record<Roles, boolean> => ({
  council: false,
  nominator: false,
  validator: false,
  'technical committe': false,
  treasurie: false
});

const cleanLocalStateFilters = () => {
  const defaultState = filtersDefaultState();
  return {
    all: false,
    ...defaultState
  };
};

const HoldersRolesFilters: FC<{
  callback: Dispatch<SetStateAction<Record<Roles, boolean>>>;
  roles: Record<Roles, boolean>;
}> = ({ callback, children, roles }) => {
  const [open, { set: toggle }] = useToggle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [filtersState, setFilters] = useState<Record<RoleFiltersType, boolean>>({
    all: false,
    council: false,
    nominator: false,
    validator: false,
    'technical committe': false,
    treasurie: false
  });

  const onClick = useCallback(
    ({ currentTarget }) => {
      setAnchorEl(currentTarget);
      toggle(true);
      setFilters(() => ({
        all: Object.values(roles).filter((r) => r).length === 5,
        ...roles
      }));
    },
    [toggle, roles]
  );

  const onCheckBoxChange = useCallback(
    (name: string, checked: boolean) => {
      setFilters((prev) => ({ ...prev, [name]: checked }));
    },
    [setFilters]
  );

  const filters = useMemo(() => {
    return Object.entries(filtersState).map(([label, value]) => {
      return (
        <FormControlLabel
          key={label}
          sx={{
            span: {
              fontSize: '14px',
              fontWeight: 400,
              color: theme.palette.grey[600]
            }
          }}
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
    return setFilters(() => {
      callback(filtersDefaultState());
      return cleanLocalStateFilters();
    });
  }, [callback]);

  const handleClose = useCallback(() => {
    setFilters(() => {
      toggle(false);
      setAnchorEl(null);
      return {
        ...cleanLocalStateFilters()
      };
    });
  }, [toggle]);

  const applyOnClick = useCallback(() => {
    const { all, ...queryFilters } = filtersState;
    callback(
      all
        ? {
            'technical committe': true,
            council: true,
            nominator: true,
            treasurie: true,
            validator: true
          }
        : {
            council: queryFilters.council,
            nominator: queryFilters.nominator,
            validator: queryFilters.validator,
            'technical committe': queryFilters['technical committe'],
            treasurie: queryFilters.treasurie
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
          <Stack direction={'row'} marginTop={'12px'} justifyContent={'space-evenly'}>
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

export default HoldersRolesFilters;
