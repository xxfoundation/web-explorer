import { Tabs, styled } from '@mui/material';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-flexContainer': {
    flexWrap: 'wrap',
  },
  '& .MuiTab-root': {
    marginBottom: '0.5rem',
    backgroundColor: theme.palette.grey[200],
    borderRadius: 33,
    '&:not(:last-child)': {
      marginRight: '0.5rem',
    },

    '&.Mui-selected': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main
    }
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  }
}));

export { default as Panel } from './TabPanel';

export default StyledTabs;
