
import { Grid, useTheme} from '@mui/material';
import React from 'react';
import { useToggle } from '../../hooks';
import useSearch from '../../hooks/useSearch';
import Dimmer from '../Dimmer';
import { Bar } from './Bar.styles';
import DisplaySearchResults from './DisplayResults';
import SearchInput from './SearchInput';

const SearchBar = () => {
  const { dismiss, error, loading, results, search } = useSearch();
  const [dimmed, ] = useToggle();
  const theme = useTheme();
  const color = theme.palette.mode === 'light' ? theme.palette.text.primary : '#FFF';
 
  return (
    <div style={{ position: 'relative', color }}>
      <Dimmer active={dimmed} />
      <Bar component={'form'}>
        <Grid container alignItems='center'>
          <SearchInput
            loading={loading}
            search={search}
          />
        </Grid>
      </Bar>
      {results && (
        <DisplaySearchResults
          dismiss={dismiss}
          error={error}
          results={results} />
      )}
    </div>
  );
};

export default SearchBar;
