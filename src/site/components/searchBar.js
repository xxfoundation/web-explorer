import React from "react";

import { 
    Grid, 
    FormControl,
    Input,
    InputAdornment,
    Select,
    MenuItem,
    Divider,
    Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';

const Bar = styled('div')(({ theme }) => ({
    background: theme.palette.background.transparent,
    borderRadius: 48,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
}));

const SelectOption = styled(Select)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        display: "none",
    },
    "&:before, &:after": {
        border: "none !important",
    },
    svg: {
        color: theme.palette.primary.contrastText,
    },
}));

const SearchInput = styled(Input)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    "&:before, &:after": {
        border: "none !important",
    },
    svg: {
        color: theme.palette.primary.contrastText,
    },
}));

const SearchButton = styled(Button)(({ theme }) => ({
    background: "none",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    color: theme.palette.primary.contrastText,
}));

const SearchBar = () => {
    
    const [option, setOption] = React.useState('');

    const handleChange = (event) => {
        setOption(event.target.value);
    };
    
    return (
        <Bar>
            <Grid container alignItems="center">
                <Grid item xs="auto" sx={{ mr: 3, }}>
                    <FormControl variant="standard" >
                        <SelectOption
                        value={option}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        IconComponent = {KeyboardArrowDownIcon}
                        >
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value={10}>Blocks</MenuItem>
                            <MenuItem value={20}>Intrinsics</MenuItem>
                            <MenuItem value={30}>Account</MenuItem>
                            <MenuItem value={30}>Event</MenuItem>
                        </SelectOption>
                    </FormControl>
                </Grid>
                <Grid item xs="auto" sx={{ mr: { xs: 0, md: 3 }, position: "relative", height: 22, }}>
                    <Divider 
                        orientation="vertical" 
                        sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            height: 22,
                            borderColor: "primary.contrastText",
                            display: { xs: "none", md: "flex", }
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
                    <SearchButton>
                        SEARCH
                    </SearchButton>
                </Grid>
            </Grid>
        </Bar>
    )
}

export default SearchBar
