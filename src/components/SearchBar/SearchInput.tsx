import SearchIcon from '@mui/icons-material/Search';
import { FormControl, Grid, InputAdornment } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchButton, SearchInput } from './Bar.styles';

type Props = {
  search: (input: string) => void;
  loading: boolean;
}

const GenericSearchInput: FC<Props> = ({ loading, search }) => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');

  const searchInputOnChange = useCallback<React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>(
    ({ target: { value } }) => setSearchInput(value),
    [setSearchInput]
  );

  const submitSearch = useCallback(
    () => search(searchInput),
    [search, searchInput]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter') {
        submitSearch();
      }
    },
    [submitSearch]
  );

  return (
    <>
      <Grid item xs>
        <FormControl fullWidth variant='standard'>
          <SearchInput
            placeholder={'Search'}
            disabled={loading}
            inputProps={{ minLength: 1 }}
            onChange={searchInputOnChange}
            value={searchInput}
            disableUnderline
            onKeyDown={handleKeyDown}
            startAdornment={
              <InputAdornment position='start'>
                {loading
                  ? <CircularProgress size={20} color='inherit' />
                  : <SearchIcon sx={{ ml: 1 }} />}
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>
      <Grid item xs='auto' sx={{ display: { xs: 'none', sm: 'block' } }}>
        <SearchButton disabled={loading} onClick={submitSearch}>
          {t('SEARCH')}
        </SearchButton>
      </Grid>
    </>
  );
};

export default GenericSearchInput;
