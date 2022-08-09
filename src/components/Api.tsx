import '../augment-types';

import type { WithChildren } from '../types';

import React, { FC, useEffect, useMemo, useState } from 'react';
import { keyring } from '@polkadot/ui-keyring';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types/create';
import { Box, Typography } from '@mui/material';

import ApiContext, { ApiContextType } from './ApiContext';
import Error from '../components/Error';
import Loading from '../components/Loading';
import derives from '../custom-derives';

const registry = new TypeRegistry();

const Api: FC<WithChildren> = ({ children }) => {
  const [error, setApiError] = useState<null | string>(null);
  const [api, setApi] = useState<ApiPromise>();
  const [connected, setConnected] = useState(false);
  const [ready, setIsReady] = useState(false);

  useEffect(() => {
    if (!api) {
      const provider = new WsProvider(process.env.REACT_APP_API_URL);
      setApi(new ApiPromise({
        derives,
        provider,
        registry
      }));
    }
  }, [api]);

  useEffect(() => {
    if (api) {
      api.on('disconnected', () => setConnected(false));
      api.on('connected', () => setConnected(true));
      api.on('error', (e) => setApiError(e));
      api.on('ready', () => {
        setIsReady(true)
        keyring.loadAll({
          genesisHash: api.genesisHash,
          ss58Format: 55
        });
      });
    }
  }, [api]);

  const context = useMemo<ApiContextType>(() => ({
    api,
    connected,
    ready,
    error
  }), [api, connected, error, ready]);

  if (error) {
    return (
      <Box sx={{ p: 5, py: 10, textAlign: 'center' }}>
        <Error variant='body1' sx={{ fontSize: 24, pb: 5 }} message='Service currently unavailable' />
      </Box>
    );
  }

  if (!ready) {
    return (
      <Box sx={{ p: 5, py: 20 }}>
        <Loading />
        <Typography variant='body1' sx={{ textAlign: 'center' }}>
          Connecting to the API, please wait.
        </Typography>
      </Box>
    );
  }

  return (
    <ApiContext.Provider value={context}>
      {children}
    </ApiContext.Provider>
  );
}

export default Api;
