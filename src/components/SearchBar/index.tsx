
import { Grid, useTheme} from '@mui/material';
import React from 'react';
import useSearch from '../../hooks/useSearch';
import { Bar } from './Bar.styles';
import DisplaySearchResults from './DisplayResults';
import SearchInput from './SearchInput';

const SearchBar = () => {
  const { dismiss, error, loading, results, search } = useSearch();
  const theme = useTheme();
  const color = theme.palette.mode === 'light' ? theme.palette.text.primary : '#FFF';
 
  return (
    <div style={{ position: 'relative', color }}>
      <Bar>
        <Grid container alignItems='center'>
          <SearchInput
            loading={loading}
            search={search}
          />
        </Grid>
      </Bar>
      {(results || error) && (
        <DisplaySearchResults
          dismiss={dismiss}
          error={error}
          results={results} />
      )}
    </div>
  );
};

export default SearchBar;
