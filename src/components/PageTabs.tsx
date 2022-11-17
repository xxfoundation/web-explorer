import { Tabs, styled } from '@mui/material';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '&:after': {
    content: '" "',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    left: 0,
    height: 1,
    backgroundColor:  theme.palette.grey[300],
  },
  overflowX: 'auto',
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  backgroundColor: '#f6f6f6',
  '& .MuiTab-root': {
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
      padding: '0.5rem',
    },
    zIndex: 1,
    '&:first-child': {
      [theme.breakpoints.down('sm')]: {
        paddingLeft: '1rem',
      },
      paddingLeft: '2rem',
    },
    '&.Mui-selected': {
      borderBottom: 'none',
      backgroundColor: theme.palette.background.paper,
    },
    padding: '1.5rem',
    borderRightStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.grey[300]
  },
  '& .MuiTabs-indicator': {
    display: 'none'
  }
}));

export { default as Panel } from './TabPanel'

export default StyledTabs;


