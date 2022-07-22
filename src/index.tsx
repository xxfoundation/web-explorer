import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import './dayjs';
import App from './App';
import './charts';
import './index.css';
import { client as apolloClient } from './plugins/apollo';
import reportWebVitals from './reportWebVitals';
import SnackbarProvider from './SnackbarProvider';
import { AppBar, Typography, Button, ThemeProvider } from '@mui/material';
import Link from './components/Link';
import { theme } from './themes/default';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <AppBar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: 'ActiveCaption'
        }}
      >
        <Typography variant='body2' sx={{ p: '1em', pr: '2em' }}>
          If you want to interact with the <b>xx network blockchain</b> use our web based wallet app
          (formally known as the explorer)
        </Typography>
        <ThemeProvider theme={theme}>
          <Button
            component={Link}
            to='https://explorer.xx.network'
            variant='contained'
            color='primary'
            fontSize='12px'
            padding='1em'
            margin='auto'
            height='2em'
            target='_blank'
            rel='noopener'
          >
            xx wallet
          </Button>
        </ThemeProvider>
      </AppBar>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
