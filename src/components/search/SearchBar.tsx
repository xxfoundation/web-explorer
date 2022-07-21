import { Container, Grid } from '@mui/material';
import React from 'react';
import useSearch from '../../hooks/useSearch';
import Error from '../Error';
import { Bar } from './Bar.styles';
import SearchInput from './SearchInput';

const SearchBar = () => {
  const { error, loading, results, search } = useSearch();

  return (
    <>
      <Bar component={'form'}>
        <Grid container alignItems='center'>
          <SearchInput
            loading={loading}
            search={search}
          />
        </Grid>
      </Bar>
      {error && (
        <Container sx={{ mt: 3 }}>
          <Error color='darkorange' message={error} />
        </Container>
      )}
    </>
  );
};

export default SearchBar;
