import { styled } from '@mui/material/styles';

import { 
    Paper,
    Typography,
} from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(4),
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows.box,
    borderRadius: 13,
    mask: "linear-gradient(#FFF,#FFF)",
    "&:before": {
        content: "''",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.gradient.primary,
        zIndex: "-1",
    },
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(3),
    },
}));

export const Data = styled(Typography)(({ theme }) => ({
    fontSize: 33,
    fontWeight: 900,
    [theme.breakpoints.down('md')]: {
        fontSize: 22,
    },
}));

