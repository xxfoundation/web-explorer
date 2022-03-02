import { styled } from '@mui/material/styles';

import { 
    Input,
    Select,
    Button,
} from '@mui/material';

export const Bar = styled('div')(({ theme }) => ({
    background: theme.palette.background.transparent,
    borderRadius: 48,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
}));

export const SelectOption = styled(Select)(({ theme }) => ({
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

export const SearchInput = styled(Input)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    "&:before, &:after": {
        border: "none !important",
    },
    svg: {
        color: theme.palette.primary.contrastText,
    },
}));

export const SearchButton = styled(Button)(({ theme }) => ({
    background: "none",
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    color: theme.palette.primary.contrastText,
}));

