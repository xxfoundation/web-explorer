import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Checkbox, FormControlLabel, FormGroup, Popover, Stack } from '@mui/material';
import React, { Dispatch, FC, SetStateAction, useCallback, useMemo, useState } from 'react';
import { useToggle } from '../../hooks';
import { Roles } from '../../schemas/accounts.schema';
import { theme } from '../../themes/default';

type RoleFiltersType = Roles | 'all';

const rolesMap = {
  all: 'all',
  validator: 'validator',
  nominator: 'nominator',
  council: 'council',
  techcommit: 'technical committee',
  special: 'special'
};

export const filtersDefaultState = (): Record<Roles, boolean> => ({
  validator: false,
  nominator: false,
  council: false,
  techcommit: false,
  special: false
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
  const [selectedRoles, setSeletedRoles] = useState<Record<RoleFiltersType, boolean>>(
    cleanLocalStateFilters()
  );

  const onClick = useCallback(
    ({ currentTarget }) => {
      setAnchorEl(currentTarget);
      toggle(true);
      setSeletedRoles(() => ({
        all: Object.values(roles).filter((r) => r).length === 6,
        ...roles
      }));
    },
    [toggle, roles]
  );

  const onCheckBoxChange = useCallback(
    (name: string, checked: boolean) => {
      setSeletedRoles((prev) => ({ ...prev, [name]: checked }));
    },
    [setSeletedRoles]
  );

  const displayedCheckboxList = useMemo(() => {
    return Object.entries(selectedRoles).map(([label, value]) => {
      return (
        <FormControlLabel
          key={label}
          sx={{
            span: {
              fontSize: '14px',
              fontWeight: 400,
              color:
                value && roles[label as Roles]
                  ? theme.palette.primary.main
                  : theme.palette.grey[600]
            }
          }}
          control={
            <Checkbox
              disabled={label === 'all' ? false : selectedRoles.all}
              checked={value as boolean}
              onChange={({ target: { checked } }) => onCheckBoxChange(label, checked)}
            />
          }
          label={rolesMap[label as RoleFiltersType]}
        />
      );
    });
  }, [selectedRoles, roles, onCheckBoxChange]);

  const cleanFilters = useCallback(() => {
    return setSeletedRoles(() => {
      callback(filtersDefaultState());
      return cleanLocalStateFilters();
    });
  }, [callback]);

  const handleClose = useCallback(() => {
    setSeletedRoles(() => {
      toggle(false);
      setAnchorEl(null);
      return {
        ...cleanLocalStateFilters()
      };
    });
  }, [toggle]);

  const applyOnClick = useCallback(() => {
    const { all, ...selection } = selectedRoles;
    callback(
      all
        ? {
            validator: true,
            nominator: true,
            council: true,
            techcommit: true,
            special: true
          }
        : {
            validator: selection.validator,
            nominator: selection.nominator,
            council: selection.council,
            techcommit: selection.techcommit,
            special: selection.special
          }
    );
    handleClose();
  }, [selectedRoles, callback, handleClose]);

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
          <Stack direction={'column'} paddingBottom={'5px'}>
            {displayedCheckboxList}
          </Stack>
          <Stack direction={'row'} marginTop={'12px'} justifyContent={'space-evenly'}>
            <Button
              variant='contained'
              sx={{ borderRadius: '45px', textTransform: 'uppercase', marginRight: '1em' }}
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
