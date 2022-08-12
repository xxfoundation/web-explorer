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
import Banner from './components/BannerDesktop';
import Api from './components/Api';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <Banner />
      <ApolloProvider client={apolloClient}>
        <Api>
          <App />
        </Api>
      </ApolloProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
