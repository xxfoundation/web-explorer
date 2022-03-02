import { styled } from '@mui/material/styles';

import { 
    Link,
} from '@mui/material';

export const ListLink = styled(Link)(({ theme }) => ({
    display: "block",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: theme.palette.primary.contrastText,
    textDecoration: "none",
    fontSize: 14,
    "&:hover": {
        textDecoration: "underline",
    }
}));