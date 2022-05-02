import { OperationVariables, TypedDocumentNode, useLazyQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useMemo, useState } from 'react';
import { SearchButton, SearchInput } from './Bar.styles';

interface IProps<T> {
  document: TypedDocumentNode;
  placeholder: string;
  messageLoader: (v: string) => string;
  variables: (v: string) => OperationVariables;
  successSearchCallback: (res: T) => void;
  // errorSearchCallback: () => void;
  validator: (v: string) => boolean;
}

export const GenericSearchInput = <T extends object>({
  document,
  messageLoader: messageLoader,
  placeholder,
  successSearchCallback,
  validator,
  variables
}: IProps<T>) => {
  const [executeQuery, { loading }] = useLazyQuery<T>(document);
  const [searchInput, setSearchInput] = useState('');

  const submitSearch = useCallback(() => {
    if (validator(searchInput)) {
      executeQuery(variables(searchInput))
        .then(({ data, error }) => {
          // TODO what to do when error?
          if (!error && data) {
            successSearchCallback(data);
            setSearchInput('');
          }
        })
        .finally(() => {});
    }
  }, [successSearchCallback, executeQuery, searchInput, validator, variables]);

  const searchInputOnChange = useCallback(
    ({ target: { value } }) => setSearchInput(value),
    [setSearchInput]
  );

  const loadingMsg = useMemo(() => messageLoader(searchInput), [messageLoader, searchInput]);

  if (loading) {
    return (
      <SearchInput
        placeholder={loadingMsg}
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
            placeholder={placeholder}
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
