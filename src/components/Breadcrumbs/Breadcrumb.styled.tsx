import { Breadcrumbs } from '@mui/material';
import Link from '../Link';
import { styled } from '@mui/material/styles';

export const BreadcrumbStyled = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: 14,
  '*': { // target all items
    textTransform: theme.typography.h5.textTransform,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
  },
  'ol li:last-child *': { // target last item
    fontWeight: theme.typography.h6.fontWeight,
  }
}));

export const CustomLink = styled(Link)(({ theme }) => ({
  textDecorationLine: 'none',
  color: theme.palette.grey[500],
  ':hover': {
    color: theme.palette.primary.main,
    textDecorationLine: 'none'
  }
}));