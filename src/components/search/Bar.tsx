import { useLazyQuery } from '@apollo/client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, FormControl, Grid, InputAdornment, SxProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getSearchQuery, SearchTypes } from '../../schemas/search.schema';
import { Bar, SearchButton, SearchInput, SelectItem, SelectOption } from './Bar.styles';
import validators from './validations';

const dividerSxProps: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: 22,
  borderColor: 'primary.light',
  display: { xs: 'none', sm: 'flex' }
};

const SearchOptionsPlaceholders: Record<SearchTypes, string> = {
  all: 'Block / Event', // 'Block / Extrinsic / Event / Account',
  blocks: 'Block',
  // extrinsics: 'Extrinsic',
  event: 'Event'
  // account: 'Account'
};

const SearchBar = () => {
  const history = useHistory();
  const [option, setOption] = useState<SearchTypes>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputError, setSearchInputError] = useState<boolean>();

  const [query, queryVariables] = useMemo(() => {
    return getSearchQuery(option);
  }, [option]);
  const [executeQuery, { data, loading }] = useLazyQuery<{ entity: { id: string } }>(query);

  useEffect(() => {
    if (data?.entity?.id) {
      history.push(`/${option}/${data.entity.id}`);
      setSearchInput('');
    }
  }, [data, history, option, setSearchInput]);

  const executeValidation = useCallback(
    (value: unknown) => {
      const optionValidator = validators[option];
      setSearchInputError(!optionValidator || !optionValidator(String(value)));
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
      executeQuery(queryVariables(searchInput));
    }
  }, [executeValidation, searchInput, searchInputError, executeQuery, queryVariables]);

  if (loading) {
    return (
      <Bar component='form'>
        <SearchInput
          placeholder={`Searching for ${SearchOptionsPlaceholders[option]} ${searchInput}`}
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
              <SelectItem value={'event'}>Event</SelectItem>
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
              placeholder={`Search by ${SearchOptionsPlaceholders[option]}`}
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
