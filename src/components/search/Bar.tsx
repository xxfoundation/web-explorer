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
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 } }}>
          <FormControl variant='standard'>
            <SelectOption
              value={option}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              IconComponent={KeyboardArrowDownIcon}
            >
              <SelectItem value=''>All</SelectItem>
              <SelectItem value={10}>Block </SelectItem>
              <SelectItem value={20}>Extrinsic</SelectItem>
              <SelectItem value={30}>Event</SelectItem>
              <SelectItem value={30}>Account</SelectItem>
            </SelectOption>
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ mr: { xs: 0, sm: 3 }, position: 'relative', height: 22 }}>
          <Divider
            orientation='vertical'
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              height: 22,
              borderColor: 'primary.light',
              display: { xs: 'none', sm: 'flex' }
            }}
          />
        </Grid>
        <Grid item xs>
          <FormControl fullWidth variant='standard'>
            <SearchInput
              id='standard-adornment-amount'
              placeholder='Search by Block / Extrinsic / Event / Account'
              startAdornment={
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs='auto' sx={{ display: { xs: 'none', sm: 'block' } }}>
          <SearchButton>SEARCH</SearchButton>
        </Grid>
      </Grid>
    </Bar>
  );
};

export default SearchBar;
