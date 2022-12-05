import { Badge, Button, Checkbox, FormControlLabel, FormGroup, Stack, useTheme } from '@mui/material';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../components/DropdownFilter';
import { Roles } from '../../schemas/accounts.schema';

export type RoleFiltersType = Roles;

export const roleToLabelMap: Record<string, string> = {
  validator: 'validator',
  nominator: 'nominator',
  council: 'council',
  techcommit: 'technical committee',
  special: 'special'
};

export const HoldersRolesFilters: FC<{
  onChange: (filters: Record<string, boolean>) => void;
  filters: Record<string, boolean>;
}> = ({ filters, onChange }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [filterState, setFilterState] = useState(filters);

  const makeFilterToggler = useCallback((key: string) => () => setFilterState((state) => ({
    ...state,
    [key]: !state[key]
  })), []);

  const applyChanges = useCallback(() => {
    onChange(filterState);
  }, [filterState, onChange]);

  const reset = useCallback(() => {
    setFilterState({});
  }, []);

  const canApplyChanges = Object.keys(roleToLabelMap)
    .some((filter) => filters[filter] !== filterState[filter]);

  const badgeCount = filters.all
    ? 0
    : Object.values(filters).filter((v) => !!v).length;

  return (
    <Dropdown buttonLabel={
      <>
        {t('Roles')}
        &nbsp;
        {badgeCount > 0 && <>
          <Badge color='primary' sx={{ pl: 1 }} badgeContent={badgeCount} />
          &nbsp;
        </>
        }
      </>
    }>
      <FormGroup sx={{ padding: '30px' }}>
        <Stack direction={'column'} paddingBottom={'5px'}>
          {Object.keys(roleToLabelMap).map((filter) => (
            <FormControlLabel
              key={filter}
              sx={{
                span: {
                  fontSize: '14px',
                  fontWeight: 400,
                  color:
                    filterState[filter]
                      ? theme.palette.primary.main
                      : theme.palette.grey[600]
                }
              }}
              control={
                <Checkbox
                  disabled={filter === 'all' ? false : filterState.all}
                  checked={filterState.all || !!filterState[filter]}
                  onChange={makeFilterToggler(filter)}
                />
              }
              label={roleToLabelMap[filter]}
            />
          ))}
          
        </Stack>
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
            {t('Apply')}
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
            {t('Clear')}
          </Button>
        </Stack>
      </FormGroup>
    </Dropdown>
  );
};
