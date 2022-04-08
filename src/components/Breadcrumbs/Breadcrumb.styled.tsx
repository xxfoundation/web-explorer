import { Breadcrumbs } from '@mui/material';
import { styled } from '@mui/material/styles';

export const BreadcrumbStyled = styled(Breadcrumbs)(({ theme }) => ({
  marginBottom: 14,
  '& *': { // target all items
    textTransform: theme.typography.h5.textTransform,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
  },
  '& ol li:last-child *': { // target last item
    fontWeight: theme.typography.h6.fontWeight,
  }
}));