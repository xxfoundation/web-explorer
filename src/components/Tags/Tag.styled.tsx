import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TagStyle = (filled?: boolean) => styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 9,
    paddingRight: 9,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.dark,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.primary.dark,
    backgroundColor: filled ? theme.palette.primary.light : theme.palette.primary.contrastText,
  }));