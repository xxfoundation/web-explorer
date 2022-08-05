import '../augment-types';
import { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types/create';
import { keyring } from '@polkadot/ui-keyring';

const registry = new TypeRegistry();

const useApi = () => {
  const [apiError, setApiError] = useState<null | string>(null);
  const [api, setApi] = useState<ApiPromise>();
  const [connected, setConnected] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!api) {
      const provider = new WsProvider(process.env.REACT_APP_API_URL);
      setApi(new ApiPromise({
        provider,
        registry,
      }));
    }
  }, [api]);

  useEffect(() => {
    if (api && api.consts) {
      api.on('disconnected', () => setConnected(false));
      api.on('connected', () => setConnected(true));
      api.on('error', (error) => setApiError(error));
      api.on('ready', () => {
        setIsReady(true)
        keyring.loadAll({
          genesisHash: api.genesisHash,
          ss58Format: 55,
        });
      });
    }
  }, [api]);

  return {
    error: apiError,
    api,
    connected,
    isReady
  }
};

export default useApi;
