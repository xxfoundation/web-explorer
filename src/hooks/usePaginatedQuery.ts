import type { DocumentNode, TypedDocumentNode, QueryHookOptions, QueryResult, OperationVariables } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { TotalOfItems } from '../schemas/types';
import usePagination, { DEFAULT_ROWS_PER_PAGE, PaginationOptions } from '../hooks/usePagination';
import { useEffect, useMemo } from 'react';

type UsePaginatedQuery<TData> = QueryResult<TData, OperationVariables>
  & { pagination: ReturnType<typeof usePagination> }


const usePaginatedQuery = <TData extends TotalOfItems>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  options: QueryHookOptions<TData, OperationVariables>,
  paginationOptions?: PaginationOptions
):  UsePaginatedQuery<TData> => {
  const pagination = usePagination(paginationOptions);
  const { limit, offset, setCount } = pagination;
  const queryOptions = useMemo(
    () => ({
      ...options,
      fetchPolicy: 'cache-first',
      variables: {
        limit,
        offset,
        ...options.variables,
      }
    }) as QueryHookOptions<TData>,
    [limit, offset, options]
  );

  const result = useQuery<TData>(query, queryOptions);
  
  useEffect(() => {
    if (result.data?.agg.aggregate.count !== undefined) {
      setCount(Number(result.data?.agg.aggregate.count));
    }
  }, [setCount, result.data?.agg.aggregate.count]);

  useEffect(
    () => {
      result.client.query({
        query,
        variables: {
          limit,
          offset: offset + (paginationOptions?.rowsPerPage ?? DEFAULT_ROWS_PER_PAGE),
          ...options.variables,
        }
      })
    }, [
    limit,
    offset,
    options.variables,
    paginationOptions?.rowsPerPage,
    query,
    queryOptions,
    result.client
  ]);

  return {
    ...result,
    pagination
  }
}

export default usePaginatedQuery;
