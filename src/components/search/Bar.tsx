import { useLazyQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import {
  Alert,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  SxProps
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToggle } from '../../hooks';
import { getSearchQuery, SearchTypes } from '../../schemas/search.schema';
import { theme } from '../../themes/tags';
import { Bar, SearchButton, SearchInput, SelectItem, SelectOption } from './Bar.styles';
import validators from './validations';

type SearchResponse = { entity: { id: string } };

const dividerSxProps: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: 22,
  borderColor: 'primary.light',
  display: { xs: 'none', sm: 'flex' }
};

const DefineSearchPlaceholders: Record<SearchTypes, [string, (v: string) => string]> = {
  all: ['Block / Event', (value: string) => `Querying ${value} among all categories`], // 'Block / Extrinsic / Event / Account',
  blocks: ['Block', (value: string) => `Querying Block ID ${value}`],
  events: ['Event', (value: string) => `Querying Event ID ${value}`]
  // extrinsics: 'Extrinsic',
  // account: 'Account'
};

const SearchBar = () => {
  const history = useHistory();
  const [option, setOption] = useState<SearchTypes>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputError, setSearchInputError] = useState<string>('');

  const [inputPlaceholder, loadingInputPlaceholder] = useMemo<[string, string]>(() => {
    const [placeholder, loadingPlaceholder] = DefineSearchPlaceholders[option];
    return [`Search by ${placeholder}`, loadingPlaceholder(searchInput)];
  }, [option, searchInput]);

  const [opened, { toggleOff, toggleOn }] = useToggle();

  // FIXME this operation is missbehaving in some cases, making additional requests
  const [query, queryVariables] = useMemo(() => getSearchQuery(option), [option]);
  const [executeQuery, { loading }] = useLazyQuery<SearchResponse>(query);

  const handleClose = useCallback(() => {
    toggleOff();
    setSearchInputError('');
  }, [toggleOff]);

  const executeValidation = useCallback(
    (value: unknown) => {
      const optionValidator = validators[option];
      if (optionValidator && optionValidator(String(value))) {
        toggleOff();
        setSearchInputError('');
        return true;
      }
      const msg = searchInput ? `${option} is not valid` : 'the search is empty';
      setSearchInputError(msg);
      toggleOn();
      return false;
    },
    [option, searchInput, toggleOff, toggleOn]
  );

  const handleChange = useCallback(({ target: { value } }) => setOption(value), [setOption]);

  const searchInputOnChange = useCallback(
    ({ target: { value } }) => setSearchInput(value),
    [setSearchInput]
  );

  const submitSearch = useCallback(() => {
    const isValid = executeValidation(searchInput);

    if (isValid && searchInput) {
      const queryOptions = queryVariables(searchInput);
      executeQuery(queryOptions).then(({ data }) => {
        if (data?.entity?.id) {
          if (option === 'all') {
            console.warn(`WIP: we found the ${data?.entity?.id}`);
          } else {
            history.push(`/${option}/${data.entity.id}`);
          }
        }
        setSearchInput('');
      });
    }
  }, [executeValidation, searchInput, queryVariables, executeQuery, option, history]);

  if (loading) {
    return (
      <Bar component='form'>
        <SearchInput
          placeholder={loadingInputPlaceholder}
          disabled
          fullWidth
          disableUnderline
          startAdornment={
            <InputAdornment position='start'>
              <CircularProgress size={20} color='inherit' />
            </InputAdornment>
          }
        />
      </Bar>
    );
  }

  return (
    <Bar component='form'>
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
          {searchInputError}
        </Alert>
      </Snackbar>
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
              <SelectItem value={'all'}>All</SelectItem>
              <SelectItem value={'blocks'}>Block </SelectItem>
              <SelectItem value={'events'}>Event</SelectItem>
              {/* <SelectItem value={'extrinsics'}>Extrinsic</SelectItem>
              <SelectItem value={'account'}>Account</SelectItem> */}
            </SelectOption>
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 }, position: 'relative', height: 22 }}>
          <Divider orientation='vertical' sx={dividerSxProps} />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth variant='standard'>
            <SearchInput
              placeholder={inputPlaceholder}
              onChange={searchInputOnChange}
              value={searchInput}
              disableUnderline
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SearchButton disabled={loading} onClick={submitSearch}>
            SEARCH
          </SearchButton>
        </Grid>
      </Grid>
    </Bar>
  );
};

export default SearchBar;
