import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, FormControl, Grid, InputAdornment, SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import { Bar, SearchButton, SearchInput, SelectOption, SelectItem } from './Bar.styles';

const SearchBar = () => {
  const [option, setOption] = React.useState('');

  const handleChange = useCallback(
    (event: SelectChangeEvent<unknown>) => setOption(event.target.value as string),
    []
  );

  return (
    <Bar>
      <Grid container alignItems='center'>
        <Grid item xs='auto' sx={{ mr: 3 }}>
          <FormControl variant='standard'>
            <SelectOption
              value={option}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              IconComponent={KeyboardArrowDownIcon}
            >
              <SelectItem value=''>All</SelectItem>
              <SelectItem value={10}>Blocks </SelectItem>
              <SelectItem value={20}>Intrinsics</SelectItem>
              <SelectItem value={30}>Account</SelectItem>
              <SelectItem value={30}>Event</SelectItem>
            </SelectOption>
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ mr: { xs: 0, md: 3 }, position: 'relative', height: 22 }}>
          <Divider
            orientation='vertical'
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
          <FormControl fullWidth variant='standard'>
            <SearchInput
              id='standard-adornment-amount'
              placeholder='Search by Block / Extrinisic / Account'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs='auto'>
          <SearchButton>SEARCH</SearchButton>
        </Grid>
      </Grid>
    </Bar>
  );
};

export default SearchBar;
