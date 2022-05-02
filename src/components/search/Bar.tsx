import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Alert, Divider, FormControl, Grid, IconButton, Snackbar, SxProps } from '@mui/material';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToggle } from '../../hooks';
import { getSearchQuery, SearchTypes } from '../../schemas/search.schema';
import { theme } from '../../themes/tags';
import { Bar, SelectItem, SelectOption } from './Bar.styles';
import SearchInputGroup from './SearchInputGroup';
import validators from './validations';

const dividerSxProps: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: 22,
  borderColor: 'primary.light',
  display: { xs: 'none', sm: 'flex' }
};

const DefineSearchPlaceholders: Record<SearchTypes, [string, (v: string) => string]> = {
  blocks: ['Block', (value: string) => `Querying Block ID ${value}`],
  events: ['Event', (value: string) => `Querying Event ID ${value}`],
  extrinsics: ['Extrinsics', (value: string) => `Querying Extrinsic ID ${value}`],
  account: ['Account', (value: string) => `Querying Account ID ${value}`]
};

const AlertEl: FC<{ opened: boolean; content: string; handleClose: () => void }> = ({
  content,
  handleClose,
  opened
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={opened}
      onClose={handleClose}
      key='search notification'
    >
      <Alert
        icon={<ErrorOutlineIcon sx={{ color: theme.palette.primary.contrastText }} />}
        severity='error'
        sx={{ background: theme.palette.error.main, color: theme.palette.primary.contrastText }}
        action={
          <IconButton size='small' aria-label='close' color='inherit' onClick={handleClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        {content}
      </Alert>
    </Snackbar>
  );
};

const SearchBar = () => {
  const history = useHistory();
  const [option, setOption] = useState<SearchTypes>('blocks');
  const inputPlaceholder = useMemo<{ empty: string; loading: string }>(() => {
    const [emptyPlaceholder, loadingPlaceholder] = DefineSearchPlaceholders[option];
    return { empty: `Search by ${emptyPlaceholder}`, loading: loadingPlaceholder(option) };
  }, [option]);
  const [query, queryVariables] = useMemo(() => getSearchQuery(option), [option]);

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [opened, { toggleOff, toggleOn }] = useToggle();
  const handleClose = useCallback(() => {
    toggleOff();
    setAlertMessage('');
  }, [toggleOff]);

  const validator = useCallback(
    (value: string) => {
      const optionValidator = validators[option];
      if (optionValidator && optionValidator(String(value))) {
        toggleOff();
        setAlertMessage('');
        return true;
      }
      const msg = value ? `${option} is not valid` : 'the search is empty';
      setAlertMessage(msg);
      toggleOn();
      return false;
    },
    [option, toggleOff, toggleOn]
  );

  const handleChange = useCallback(({ target: { value } }) => setOption(value), [setOption]);

  const navigateToPage = useCallback(
    (searchResultId: string) => {
      history.push(`/${option}/${searchResultId}`);
    },
    [history, option]
  );

  return (
    <Bar component='form'>
      <AlertEl opened={opened} content={alertMessage} handleClose={handleClose} />
      <Grid container alignItems='center'>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 } }}>
          <FormControl variant='standard'>
            <SelectOption
              value={option}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              IconComponent={KeyboardArrowDownIcon}
            >
              <SelectItem value={'blocks'}>Block </SelectItem>
              <SelectItem value={'events'}>Event</SelectItem>
              <SelectItem value={'extrinsics'}>Extrinsic</SelectItem>
              <SelectItem value={'account'}>Account</SelectItem>
            </SelectOption>
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 }, position: 'relative', height: 22 }}>
          <Divider orientation='vertical' sx={dividerSxProps} />
        </Grid>
        <SearchInputGroup
          document={query}
          variables={queryVariables}
          inputPlaceholder={inputPlaceholder}
          successSearchCallback={navigateToPage}
          validator={validator}
        />
      </Grid>
    </Bar>
  );
};

export default SearchBar;
