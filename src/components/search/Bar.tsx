import { useLazyQuery } from '@apollo/client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, FormControl, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useState } from 'react';
import { SEARCH_BLOCKS } from '../../schemas/search.schema';
import { BlockType } from '../block/types';
import HashValidator from '../HashValidator';
import isValidXXNetworkAddress from '../IsValidXXNetworkAddress';
import { Bar, SearchButton, SearchInput, SelectItem, SelectOption } from './Bar.styles';

type SearchType = 'all' | 'block' | 'extrinsic' | 'event' | 'account';

interface SearchTypeBase<Variables, Response> {
  variables: Variables;
  response: Response;
}

type SearchTypeProps = {
  all: SearchTypeBase<unknown, unknown>;
  block: SearchTypeBase<{ blockNumber: number }, { blocks: BlockType }>;
  event: SearchTypeBase<unknown, unknown>;
  extrinsic: SearchTypeBase<unknown, unknown>;
  account: SearchTypeBase<unknown, unknown>;
};

const SearchOptions: Record<SearchType, string> = {
  all: 'Block / Extrinsic / Event / Account',
  block: 'Block',
  extrinsic: 'Extrinsic',
  event: 'Event',
  account: 'Account'
};

const extrinsicPattern = /^([a-z\-])+$/;

const validNumber = (value: string) => !isNaN(Number(value));
const validStringWithHifen = (value: string) => !!value.match(extrinsicPattern)?.length;

const validators: Record<SearchType, (v: string) => boolean> = {
  all: (value: string) => !!value,
  block: (value: string) => validNumber(value),
  extrinsic: (value: string) =>
    validNumber(value) || validStringWithHifen(value) || HashValidator(value),
  event: (value: string) => validNumber(value) || validStringWithHifen(value),
  account: (value: string) => isValidXXNetworkAddress(value)
};

const SearchBar = () => {
  const [option, setOption] = useState<SearchType>('all');
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchInputError, setSearchInputError] = useState<boolean>();

  const [executeSearch, { loading }] = useLazyQuery<
    SearchTypeProps[typeof option]['response'],
    SearchTypeProps[typeof option]['variables']
  >(SEARCH_BLOCKS);

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
      // TODO check option value and run validations from the value
      setSearchInput(value);
      executeValidation(value);
    },
    [setSearchInput, executeValidation]
  );

  const submitSearch = useCallback(() => {
    if (searchInputError || !searchInput) {
      return;
    }
    executeSearch({ variables: { blockNumber: Number(searchInput) } });
  }, [searchInputError, searchInput, executeSearch]);

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
              <SelectItem value={'block'}>Block </SelectItem>
              <SelectItem value={'extrinsic'}>Extrinsic</SelectItem>
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
