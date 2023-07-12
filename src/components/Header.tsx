import { Container, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import logoColor from '../assets/images/logos/xx-network-logo--color.svg';
import logoWhite from '../assets/images/logos/xx-network-logo--white.svg';
import useLocalStorage from '../hooks/useLocalStorage';
import { GridContainer, Root } from './Header.styled';
import Link from './Link';
import DesktopNav from './menus/Main';
import MobileNav from './menus/Mobile';
import SearchBar from './SearchBar';
import axios, { AxiosError } from 'axios';
import Tag from './Tags/Tag';

type LiveCoinJSONData = {
  rate: string
}

async function getCoinMarketValue() {
  const apiUrl = 'https://api.livecoinwatch.com/coins/single';
  const apiKey = process.env.REACT_APP_LIVECOIN_API_KEY

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey
  };

  const params = {
    currency: 'USD',
    code: 'XX',
    meta: true
  };
  
  try {
    const { data, status } = await axios.post<LiveCoinJSONData>(apiUrl, params, { headers });
    console.warn(data);

    let coinValue = 'error';
    if (status === 200) {
      coinValue = JSON.stringify(data.rate);
    }
    window.localStorage.setItem('coin_value', coinValue)
    
    return coinValue;
  } catch (err) {
    const error = err as Error | AxiosError;
    if (axios.isAxiosError(error)) {
      console.warn('error message: ', error.message);
      return error.message;
    } else {
      console.warn('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}

// type CoinGeckoJSONData = {
//   market_data: { 
//     current_price: {
//       usd: string;
//     }
//   }
// }

// async function getCoinMarketValueCoinGecko() {
//   try {
//     // 👇️ const data: GetUsersResponse
//     const { data, status } = await axios.get<CoinGeckoJSONData>(
//       'https://api.coingecko.com/api/v3/coins/xxcoin/',
//       {
//         headers: {
//           Accept: 'application/json',
//         },
//       },
//     );
    
//     let coinValue = 'error';
//     if (status === 200) {
//       coinValue = JSON.stringify(data.market_data.current_price.usd);
//     }
//     window.localStorage.setItem('coin_value', coinValue)

//     return coinValue;
//   } catch (err) {
//     const error = err as Error | AxiosError;
//     if (axios.isAxiosError(error)) {
//       console.warn('error message: ', error.message);
//       return error.message;
//     } else {
//       console.warn('unexpected error: ', error);
//       return 'An unexpected error occurred';
//     }
//   }
// }

const Header = () => {
  const { pathname } = useLocation();
  const [dismissed] = useLocalStorage('banner.dismissed');
  const theme = createTheme({
    palette: {
      mode: pathname === '/' ? 'light' : 'dark'
    }
  });
  const [coinValue, setCoinValue] = useState<string>('');
  
  getCoinMarketValue().then(retval => {
    setCoinValue(retval);
  })
  
  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Container sx={{ mt: !dismissed ? { sm: '3em', xs: '8.5em' } : undefined }}>
          <GridContainer container>
            <Grid item xs='auto' sx={{ display: { sm: 'none', xs: 'block' } }}>
              <MobileNav />
            </Grid>
            <Grid item xs>
              <Link to='/'>
                {pathname === '/' ? (
                  <img src={logoColor} alt='xx network' />
                ) : (
                  <img src={logoWhite} alt='xx network' />
                )}
              </Link>
            </Grid>
            <Grid item xs='auto' sx={{ display: { sm: 'block', xs: 'none' } }}>
              <DesktopNav />
            </Grid>
            <Grid>
              <Tag filled price sx={{marginLeft: 2}}>
                <Typography fontSize={'12px'} fontWeight={400}>
                  XX = $ {parseFloat(coinValue).toFixed(3)}
                </Typography>
              </Tag>
            </Grid>
          </GridContainer>
          <SearchBar />
        </Container>
      </Root>
    </ThemeProvider>
  );
};
export default Header;
