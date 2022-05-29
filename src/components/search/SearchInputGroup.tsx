import { OperationVariables, TypedDocumentNode, useLazyQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar } from 'notistack';
import React, { useCallback, useMemo, useState } from 'react';
import { SearchButton, SearchInput } from './Bar.styles';

interface IProps<T> {
  document: TypedDocumentNode;
  placeholder: string;
  messageLoader: (v: string) => string;
  variables: (v: string) => OperationVariables;
  successSearchCallback: (v: string, res: T) => void;
  errorSearchCallback: (v: string, err: unknown) => void;
  optionValidator: (v: string) => boolean;
  option: string;
}

export const GenericSearchInput = <T extends object>({
  document,
  errorSearchCallback,
  messageLoader: messageLoader,
  option,
  optionValidator,
  placeholder,
  successSearchCallback,
  variables
}: IProps<T>) => {
  const { enqueueSnackbar } = useSnackbar();
  const [executeQuery, { loading }] = useLazyQuery<T>(document);
  const [searchInput, setSearchInput] = useState('');

  const validator = useCallback(
    (value: string) => {
      if (optionValidator(String(value))) {
        return true;
      }
      const msg = value ? `${option} is not valid` : 'Search is empty';
      enqueueSnackbar(msg, { variant: 'error' });
      return false;
    },
    [enqueueSnackbar, option, optionValidator]
  );

  const submitSearch = useCallback(() => {
    if (validator(searchInput)) {
      executeQuery({ variables: variables(searchInput) })
        .then(({ data, error }) => {
          if (error) {
            errorSearchCallback(searchInput, error);
          } else if (data) {
            successSearchCallback(searchInput, data);
            setSearchInput('');
          }
        })
        .catch((err) => {
          errorSearchCallback(searchInput, err);
        })
        .finally(() => {
          setSearchInput('');
        });
    }
  }, [validator, searchInput, executeQuery, variables, errorSearchCallback, successSearchCallback]);

  const searchInputOnChange = useCallback(
    ({ target: { value } }) => setSearchInput(value),
    [setSearchInput]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        submitSearch();
      }
    },
    [submitSearch]
  );

  const loadingMsg = useMemo(() => messageLoader(searchInput), [messageLoader, searchInput]);

  if (loading) {
    return (
      <SearchInput
        value={loadingMsg}
        disabled
        disableUnderline
        fullWidth
        sx={{ maxWidth: '80%' }}
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
            onKeyDown={handleKeyDown}
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
