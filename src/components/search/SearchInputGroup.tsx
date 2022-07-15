import { useLazyQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useCallback, useMemo, useState } from 'react';
import { Account, SearchAccounts, SEARCH_ACCOUNTS } from '../../schemas/accounts.schema';
import { Block, GetBlockByHash, GetBlockByPK, GET_BLOCK_BY_BLOCK_NUMBER, GET_BLOCK_BY_HASH } from '../../schemas/blocks.schema';
import { Extrinsic, GetExtrinsicByHash, GetExtrinsicByBNAndIndex, GET_EXTRINSIC_BY_BN_AND_INDEX, GET_EXTRINSIC_BY_HASH } from '../../schemas/extrinsics.schema';
import { SearchButton, SearchInput } from './Bar.styles';

type SearchResults = {
  blocks?: Block[];
  extrinsics?: Extrinsic[];
  accounts?: Account[];
}

export const GenericSearchInput = () => {
  const [result, setResult] = useState<SearchResults>({});
  const [executeAccountSearch, searchAccounts] = useLazyQuery<SearchAccounts>(SEARCH_ACCOUNTS);
  const [executeBlockSearchByHash, searchBlocksByHash] = useLazyQuery<GetBlockByHash>(GET_BLOCK_BY_HASH);
  const [executeBlockSearchByNumber, searchBlocksByNumber] = useLazyQuery<GetBlockByPK>(GET_BLOCK_BY_BLOCK_NUMBER);
  const [executeExtrinsicSearch, searchExtrinsicsByPK] = useLazyQuery<GetExtrinsicByBNAndIndex>(GET_EXTRINSIC_BY_BN_AND_INDEX);
  const [executeExtrinsicSearchByHash, searchExtrinsicsByHash] = useLazyQuery<GetExtrinsicByHash>(GET_EXTRINSIC_BY_HASH);
  const [searchInput, setSearchInput] = useState('');

  const submitSearch = useCallback(() => {}, [])

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

  const loadingMsg = useMemo(
    () => messageLoader(searchInput),
    [messageLoader, searchInput]
  );

  return (
    <>
      <Grid item xs>
        <FormControl fullWidth variant='standard'>
          <SearchInput
            placeholder={placeholder}
            disabled={loading}
            onChange={searchInputOnChange}
            value={loading ? loadingMsg : searchInput}
            disableUnderline
            onKeyDown={handleKeyDown}
            startAdornment={
              <InputAdornment position='start'>
                {loading
                  ? <CircularProgress size={20} color='inherit' />
                  : <SearchIcon />}
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
