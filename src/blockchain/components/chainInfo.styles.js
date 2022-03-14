import {
    Paper,
    Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";


export const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    paddingLeft: theme.spacing(4.5),
    paddingRight: theme.spacing(4.5),
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
    [theme.breakpoints.down("md")]: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2.5),
        paddingRight: theme.spacing(2.5),
    },
}));

export const Data = styled(Typography)(({ theme }) => ({
    fontSize: 28,
    fontWeight: 900,
    [theme.breakpoints.down("md")]: {
        fontSize: 22,
    },
}));

