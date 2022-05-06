import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Checkbox, FormControlLabel, FormGroup, Popover, Stack } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useToggle } from '../../hooks';
import { theme } from '../../themes/default';
import { RolesType } from './types';

type FilterOptionsType = 'all' & RolesType;

const filtersDefaultState = () => ({
  all: false,
  council: false,
  nominators: false,
  validators: false,
  'technical committe': false,
  treasuries: false
});

const AccountHoldersFilters: FC<{ text: string }> = ({ text }) => {
  const [open, { set: toggle }] = useToggle();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [filtersState, setFilters] = useState<Record<FilterOptionsType, boolean>>(
    useCallback(() => filtersDefaultState(), [])
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
    (name: FilterOptionsType, checked: boolean) => {
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
              checked={value as boolean}
              onChange={({ target: { checked } }) =>
                onCheckBoxChange(label as FilterOptionsType, checked)
              }
            />
          }
          label={label}
        />
      );
    });
  }, [filtersState, onCheckBoxChange]);

  const cleanFilters = useCallback(() => {
    setFilters(filtersDefaultState());
  }, [setFilters]);

  return (
    <>
      <Button color={'inherit'} endIcon={<KeyboardArrowDownIcon />} onClick={onClick}>
        {text}
      </Button>
      <Popover
        id='account-holders-table-filters'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <FormGroup sx={{ padding: '30px' }}>
          <Stack direction={'column'}>{filters}</Stack>
          <Stack direction={'row'} justifyContent={'space-evenly'}>
            <Button variant='contained' sx={{ borderRadius: '45px', textTransform: 'uppercase' }}>
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
