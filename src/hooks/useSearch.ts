import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { Account, SearchAccounts, SEARCH_ACCOUNTS } from '../schemas/accounts.schema';
import { Block, GetBlockByHash, GetBlockByPK, GET_BLOCK_BY_BLOCK_NUMBER, GET_BLOCK_BY_HASH } from '../schemas/blocks.schema';
import { Extrinsic, GetExtrinsicByHash, GetExtrinsicByBNAndIndex, GET_EXTRINSIC_BY_BN_AND_INDEX, GET_EXTRINSIC_BY_HASH } from '../schemas/extrinsics.schema';
import { validateExtrinsicHash, validateBlockHash } from '../utils';

export type SearchResults = {
  blocks?: Block[];
  extrinsics?: Extrinsic[];
  accounts?: Account[];
}

export type UseSearch = {
  dismiss: () => void;
  error?: string;
  loading: boolean;
  results?: SearchResults;
  search: (input: string) => void;
}

const useSearch = (): UseSearch => {
  const [results, setResults] = useState<SearchResults>();
  const [error, setError] = useState<string>();
  
  const [executeAccountSearch, searchAccounts] = useLazyQuery<SearchAccounts>(SEARCH_ACCOUNTS);
  const [executeBlockSearchByHash, searchBlocksByHash] = useLazyQuery<GetBlockByHash>(GET_BLOCK_BY_HASH);
  const [executeBlockSearchByNumber, searchBlocksByNumber] = useLazyQuery<GetBlockByPK>(GET_BLOCK_BY_BLOCK_NUMBER);
  const [executeExtrinsicSearch, searchExtrinsicsByPK] = useLazyQuery<GetExtrinsicByBNAndIndex>(GET_EXTRINSIC_BY_BN_AND_INDEX);
  const [executeExtrinsicSearchByHash, searchExtrinsicsByHash] = useLazyQuery<GetExtrinsicByHash>(GET_EXTRINSIC_BY_HASH);

  const queries = useMemo(() => [
    searchAccounts,
    searchBlocksByHash,
    searchBlocksByNumber,
    searchExtrinsicsByPK,
    searchExtrinsicsByHash
  ], [
    searchAccounts,
    searchBlocksByHash,
    searchBlocksByNumber,
    searchExtrinsicsByPK,
    searchExtrinsicsByHash
  ]);

  const loading = useMemo(
    () => queries.some((q) => q.loading),
    [queries]
  );

  const errors = useMemo(
    () => queries.filter((q) => !!q.error).map((q) => q.error),
    [queries]
  );

  const search = useCallback(async (input: string) => {
    setResults(undefined);
    setError(undefined);

    const promises = [];

    const accounts: Account[] = [];
    const blocks: Block[] = [];
    const extrinsics: Extrinsic[] = [];

    if (input && Number.isInteger(Number(input))) {
      promises.push(
        executeBlockSearchByNumber({ variables: { blockNumber: input } })
          .then((result) => result.data && blocks.push(result.data.block))
      );
    }

    if (input) {
      promises.push(
        executeAccountSearch({ variables: { search: input } })
          .then((result) => result.data && accounts.push(...result.data.accounts))
      );
    }

    if (input && /^\d+\-\d+$/.test(input)) {
      const [blockNumber, extrinsicIndex] = input.split('-');
      promises.push(
        executeExtrinsicSearch({ variables: { blockNumber, extrinsicIndex } })
          .then((result) => result.data && extrinsics.push(...result.data.extrinsic))
      );
    }

    if (input && validateExtrinsicHash(input)) {
      promises.push(
        executeExtrinsicSearchByHash({ variables: { hash: input }})
          .then((result) => result.data && extrinsics.push(...result.data.extrinsic)),
      );
    }

    if (input && validateBlockHash(input)) {
      promises.push(
        executeBlockSearchByHash({ variables: { hash: input } })
          .then((result) => result.data && blocks.push(...result.data.block))
      )
    }

    await Promise.all(promises);

    if (accounts.length === 0 && blocks.length === 0 && extrinsics.length === 0) {
      setError('Sorry, we couldn\'t find anything for that.');
    } else {
      setResults({
        accounts,
        blocks,
        extrinsics,
      });
    }

  }, [
    executeAccountSearch,
    executeBlockSearchByHash,
    executeBlockSearchByNumber,
    executeExtrinsicSearch,
    executeExtrinsicSearchByHash,
  ]);

  useEffect(() => {
    if (errors.length > 0) {
      setError('Data currently unavailable');
    }
  }, [errors]);

  const dismiss = useCallback(() => {
    setResults(undefined);
  }, [])

  return {
    dismiss,
    error,
    loading,
    results,
    search,
  };
}

export default useSearch;
