import { useCallback, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { isHex } from '@polkadot/util';

import { Account, SearchAccounts, SEARCH_ACCOUNTS } from '../schemas/accounts.schema';
import { Block, GetBlockByHash, GetBlockByPK, GET_BLOCK_BY_BLOCK_NUMBER, GET_BLOCK_BY_HASH } from '../schemas/blocks.schema';
import { Extrinsic, GetExtrinsicByHash, GetExtrinsicByBNAndIndex, GET_EXTRINSIC_BY_BN_AND_INDEX, GET_EXTRINSIC_BY_HASH } from '../schemas/extrinsics.schema';
import { isValidXXNetworkAddress } from '../utils';

export type SearchResults = {
  blocks?: Block[];
  extrinsics?: Extrinsic[];
  accounts?: Account[];
}

export type UseSearch = {
  results: SearchResults;
  loading: boolean;
  search: (input: string) => void;
}

const useSearch = (): UseSearch => {
  const [results, setResults] = useState<SearchResults>({});
  
  const [executeAccountSearch, searchAccounts] = useLazyQuery<SearchAccounts>(SEARCH_ACCOUNTS);
  const [executeBlockSearchByHash, searchBlocksByHash] = useLazyQuery<GetBlockByHash>(GET_BLOCK_BY_HASH);
  const [executeBlockSearchByNumber, searchBlocksByNumber] = useLazyQuery<GetBlockByPK>(GET_BLOCK_BY_BLOCK_NUMBER);
  const [executeExtrinsicSearch, searchExtrinsicsByPK] = useLazyQuery<GetExtrinsicByBNAndIndex>(GET_EXTRINSIC_BY_BN_AND_INDEX);
  const [executeExtrinsicSearchByHash, searchExtrinsicsByHash] = useLazyQuery<GetExtrinsicByHash>(GET_EXTRINSIC_BY_HASH);

  const loading = [
    searchAccounts,
    searchBlocksByHash,
    searchBlocksByNumber,
    searchExtrinsicsByPK,
    searchExtrinsicsByHash
  ].some((q) => q.loading);


  const search = useCallback((input: string) => {
    setResults({});
    if (Number.isInteger(input)) {
      executeBlockSearchByNumber({ variables: { blockNumber: input } });
    }

    if (isValidXXNetworkAddress(input)) {
      executeAccountSearch({ variables: { search: input } });
    }

    if (/^\d+\-\d+$/.test(input)) {
      const [blockNumber, extrinsicIndex] = input.split('-');
      executeExtrinsicSearch({ variables: { blockNumber, extrinsicIndex } });
    }

    if (isHex(input)) {
      executeExtrinsicSearchByHash({ variables: { hash: input }});
      executeBlockSearchByHash({ variables: { hash: input } });
    }
  }, [
    executeAccountSearch,
    executeBlockSearchByHash,
    executeBlockSearchByNumber,
    executeExtrinsicSearch,
    executeExtrinsicSearchByHash,
  ]);

  useEffect(() => {
    const accounts = searchAccounts.data?.accounts ?? [];
    const blocks = [
      ...(searchBlocksByHash.data?.block ?? []),
      ...(searchBlocksByNumber.data?.block ? [searchBlocksByNumber.data?.block] : [])
    ];
    const extrinsics = [
      ...(searchExtrinsicsByPK.data?.extrinsic ?? []),
      ...(searchExtrinsicsByHash?.data?.extrinsic ?? [])
    ];

    setResults({
      accounts,
      blocks,
      extrinsics
    });
  }, [
    searchAccounts.data?.accounts,
    searchBlocksByHash.data?.block,
    searchBlocksByNumber.data?.block,
    searchExtrinsicsByHash?.data?.extrinsic,
    searchExtrinsicsByPK.data?.extrinsic
  ]);

  return {
    loading,
    results,
    search,
  };
}

export default useSearch;
