import type { DocumentNode, TypedDocumentNode, QueryHookOptions, QueryResult, OperationVariables } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { TotalOfItems } from '../schemas/types';
import usePagination, { PaginationOptions } from '../hooks/usePagination';
import { useEffect } from 'react';

type UsePaginatedQuery<TData> = QueryResult<TData, OperationVariables>
  & { pagination: ReturnType<typeof usePagination> }


const usePaginatedQuery = <TData extends TotalOfItems>(
  query: DocumentNode | TypedDocumentNode<TData, OperationVariables>,
  options: QueryHookOptions<TData, OperationVariables>,
  paginationOptions?: PaginationOptions
):  UsePaginatedQuery<TData> => {
  const pagination = usePagination(paginationOptions);
  const { limit, offset, setCount } = pagination;
  const queryOptions = {
    ...options,
    variables: {
      limit,
      offset,
      ...options.variables,
    }
  } as QueryHookOptions;

  const result = useQuery<TData>(query, queryOptions);
  
  useEffect(() => {
    if (result.data?.agg.aggregate.count) {
      setCount(Number(result.data?.agg.aggregate.count));
    }
  }, [setCount, result.data?.agg.aggregate.count]);

  return {
    ...result,
    pagination
  }
}

export default usePaginatedQuery;
