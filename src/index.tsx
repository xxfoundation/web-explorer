import { ApolloProvider} from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import apolloCache from './apolloCache';
import './dayjs';
import App from './App';
import './charts';
import './index.css';
import { client as apolloClient } from './plugins/apollo';
import reportWebVitals from './reportWebVitals';
import SnackbarProvider from './SnackbarProvider';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
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
