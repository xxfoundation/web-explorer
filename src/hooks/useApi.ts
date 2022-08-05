import '../augment-types';
import { useEffect, useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types/create';
import { keyring } from '@polkadot/ui-keyring';

const registry = new TypeRegistry();

const settings = {
  chain: 'xx network',
  chainType: 'substrate',
  genesisHash: '0x50dd5d206917bf10502c68fb4d18a59fc8aa31586f4e8856b493e43544aa82aa',
  ss58Format: 55
};

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
    if (api) {
      setIsReady(true);
      api.on('disconnected', () => setConnected(false));
      api.on('connected', () => setConnected(true));
      api.on('error', (error) => setApiError(error));
      api.on('ready', () => {
        keyring.loadAll({
          genesisHash: settings.genesisHash,
          ss58Format: settings.ss58Format,
          type: 'ed25519'
        });
      })
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
