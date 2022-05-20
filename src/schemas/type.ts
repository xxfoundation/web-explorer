// TODO find a way to match the query with the result type
export type QueryResultPair<T> = {
  query: string;
  result: T;
};
