import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, FormControl, Grid, InputAdornment, SelectChangeEvent } from '@mui/material';
import React, { useCallback } from 'react';
import { Bar, SearchButton, SearchInput, SelectItem, SelectOption } from './Bar.styles';

const SearchBar = () => {
  const [option, setOption] = React.useState<number>(0);

  const handleChange = useCallback((event: SelectChangeEvent<unknown>) => {
    return setOption(Number(event.target.value));
  }, []);

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
              <SelectItem value={0}>All</SelectItem>
              <SelectItem value={1}>Block </SelectItem>
              <SelectItem value={2}>Extrinsic</SelectItem>
              <SelectItem value={3}>Event</SelectItem>
              <SelectItem value={4}>Account</SelectItem>
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
