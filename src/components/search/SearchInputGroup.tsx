import { OperationVariables, TypedDocumentNode, useLazyQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { FC, useCallback, useState } from 'react';
import { SearchButton, SearchInput } from './Bar.styles';
import { SearchResponse } from './types';

const SearchInputGroup: FC<{
  document: TypedDocumentNode;
  variables: (v: string) => OperationVariables;
  successSearchCallback: (res: string) => void;
  // errorSearchCallback: () => void;
  validator: (v: string) => boolean;
  inputPlaceholder: { empty: string; loading: string };
}> = ({ document, inputPlaceholder, successSearchCallback, validator, variables }) => {
  const [executeQuery, { loading }] = useLazyQuery<SearchResponse>(document);
  const [searchInput, setSearchInput] = useState('');

  const searchInputOnChange = useCallback(
    ({ target: { value } }) => setSearchInput(value),
    [setSearchInput]
  );
  const submitSearch = useCallback(() => {
    if (validator(searchInput)) {
      executeQuery(variables(searchInput))
        .then(({ data, error }) => {
          // TODO what to do when error?
          if (!error && data && data?.entity?.id) {
            successSearchCallback(data.entity.id);
          }
        })
        .finally(() => {
          setSearchInput('');
        });
    }
  }, [successSearchCallback, executeQuery, searchInput, validator, variables]);

  if (loading) {
    return (
      <SearchInput
        placeholder={inputPlaceholder.loading}
        disabled
        disableUnderline
        startAdornment={
          <InputAdornment position='start'>
            <CircularProgress size={20} color='inherit' />
          </InputAdornment>
        }
      />
    );
  }

  return (
    <>
      <Grid item xs>
        <FormControl fullWidth variant='standard'>
          <SearchInput
            placeholder={inputPlaceholder.empty}
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
    </>
  );
};

export default SearchInputGroup;
