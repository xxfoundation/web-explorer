import './augment-types';

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
import BannerDesktop from './components/BannerDesktop';
import BannerMobile from './components/BannerMobile';
import { Api } from '@polkadot/react-api';

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider>
      <BannerDesktop />
      <BannerMobile />
      <ApolloProvider client={apolloClient}>
        <Api url={process.env.REACT_APP_API_URL}>
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
