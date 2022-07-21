import { Divider, Grid, SxProps } from '@mui/material';
import React from 'react';
import useSearch from '../../hooks/useSearch';
import { Bar } from './Bar.styles';
import SearchInput from './SearchInput';

const dividerSxProps: SxProps = {
  position: 'absolute',
  top: 0,
  right: 0,
  height: 22,
  borderColor: 'primary.light',
  display: { xs: 'none', sm: 'flex' }
};

const SearchBar = () => {
  const { loading, search } = useSearch();

  return (
    <Bar component={'form'}>
      <Grid container alignItems='center'>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 }, position: 'relative', height: 22 }}>
          <Divider orientation='vertical' sx={dividerSxProps} />
        </Grid>
        <SearchInput
          loading={loading}
          search={search}
        />
      </Grid>
    </Bar>
  );
};

export default SearchBar;
