import React, { useCallback } from 'react';

import { Grid, FormControl, InputAdornment, MenuItem, Divider, SelectChangeEvent } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

import { Bar, SelectOption, SearchInput, SearchButton } from './Bar.styles';

const SearchBar = () => {
  const [option, setOption] = React.useState('');

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => setOption(event.target.value as string),
    []
  );

  return (
    <Bar>
      <Grid container alignItems="center">
        <Grid item xs="auto" sx={{ mr: 3 }}>
          <FormControl variant="standard">
            <SelectOption
              value={option}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              IconComponent={KeyboardArrowDownIcon}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={10}>Blocks</MenuItem>
              <MenuItem value={20}>Intrinsics</MenuItem>
              <MenuItem value={30}>Account</MenuItem>
              <MenuItem value={30}>Event</MenuItem>
            </SelectOption>
          </FormControl>
        </Grid>
        <Grid item xs="auto" sx={{ mr: { xs: 0, md: 3 }, position: 'relative', height: 22 }}>
          <Divider
            orientation="vertical"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: 22,
              borderColor: 'primary.contrastText',
              display: { xs: 'none', md: 'flex' }
            }}
          />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth variant="standard">
            <SearchInput
              id="standard-adornment-amount"
              placeholder="Search by Block / Extrinisic / Account"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs="auto">
          <SearchButton>SEARCH</SearchButton>
        </Grid>
      </Grid>
    </Bar>
  );
};

export default SearchBar;
