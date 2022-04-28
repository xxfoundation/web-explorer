import { OperationVariables, TypedDocumentNode, useLazyQuery } from '@apollo/client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, FormControl, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useState } from 'react';
import { SEARCH_ALL, SEARCH_BLOCKS } from '../../schemas/search.schema';
import HashValidator from '../HashValidator';
import isValidXXNetworkAddress from '../IsValidXXNetworkAddress';
import { Bar, SearchButton, SearchInput, SelectItem, SelectOption } from './Bar.styles';

type SearchType = 'all' | 'blocks' | 'extrinsics' | 'event' | 'account';

const SearchOptions: Record<SearchType, string> = {
  all: 'Block / Extrinsic / Event / Account',
  blocks: 'Block',
  extrinsics: 'Extrinsic',
  event: 'Event',
  account: 'Account'
};

const extrinsicPattern = /^([a-z\-])+$/;

const validNumber = (value: string) => !isNaN(Number(value));
const validStringWithHifen = (value: string) => !!value.match(extrinsicPattern)?.length;

const validators: Record<SearchType, (v: string) => boolean> = {
  all: (value: string) => !!value,
  blocks: (value: string) => validNumber(value),
  extrinsics: (value: string) =>
    validNumber(value) || validStringWithHifen(value) || HashValidator(value),
  event: (value: string) => validNumber(value) || validStringWithHifen(value),
  account: (value: string) => isValidXXNetworkAddress(value)
};

const defineVars = (option: SearchType, searchInput: unknown): OperationVariables => {
  if (option === 'blocks') {
    return { blockNumber: Number(searchInput) };
  }
  return {};
};

const defineQuery = (option: SearchType): TypedDocumentNode => {
  if (option === 'blocks') {
    return SEARCH_BLOCKS;
  }

  return SEARCH_ALL;
};

const SearchBar = () => {
  const [option, setOption] = useState<SearchType>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputError, setSearchInputError] = useState<boolean>();

  const [executeSearch, { data, loading }] = useLazyQuery<{ entity: { id: string } }>(
    defineQuery(option)
  );
  if (data?.entity.id) {
    // TODO push to new route
    console.warn(`redirecting to ${option}/${data.entity.id}`);
  }

  const executeValidation = useCallback(
    (value: unknown) => {
      const optionValidator = validators[option];
      if (!optionValidator || !optionValidator(String(value))) {
        setSearchInputError(true);
      } else {
        setSearchInputError(false);
      }
    },
    [option, setSearchInputError]
  );

  const handleChange = useCallback(
    ({ target: { value } }) => {
      setOption(value);
    },
    [setOption]
  );

  const searchInputOnChange = useCallback(
    ({ target: { value } }) => {
      setSearchInput(value);
      executeValidation(value);
    },
    [setSearchInput, executeValidation]
  );

  const submitSearch = useCallback(async () => {
    executeValidation(searchInput);
    if (!searchInputError && searchInput) {
      executeSearch({ variables: defineVars(option, searchInput) });
    }
  }, [executeValidation, searchInput, searchInputError, executeSearch, option]);

  return (
    <Bar component='form'>
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
              <SelectItem value={'extrinsics'}>Extrinsic</SelectItem>
              <SelectItem value={'event'}>Event</SelectItem>
              <SelectItem value={'account'}>Account</SelectItem>
            </SelectOption>
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 }, position: 'relative', height: 22 }}>
          <Divider
            orientation='vertical'
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: 22,
              borderColor: 'primary.light',
              display: { xs: 'none', sm: 'flex' }
            }}
          />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth variant='standard'>
            <SearchInput
              placeholder={`Search by ${SearchOptions[option]}`}
              onChange={searchInputOnChange}
              value={searchInput}
              disableUnderline
              startAdornment={
                <InputAdornment position='start'>
                  {loading ? <CircularProgress size={20} color='inherit' /> : <SearchIcon />}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SearchButton onClick={submitSearch}>SEARCH</SearchButton>
        </Grid>
      </Grid>
    </Bar>
  );
};

export default SearchBar;
