import { useQuery } from '@apollo/client';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import Pagination from '@mui/material/TablePagination';
import { styles as paginationStyles } from '../../../../components/Tables/TablePagination';

import ExtrinsicsTable from './ExtrinsicsTable';
import { GET_EXTRINSICS_BY_SIGNER, GetExtrinsicsBySigner } from '../../../../schemas/extrinsics.schema';
import Error from '../../../../components/Error';

const PER_PAGE_OPTIONS = [5, 10, 25];
const DEFAULT_PER_PAGE = 5;

const Extrinsics: FC<{ accountId?: string }> = ({ accountId }) => {
  const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  const variables = useMemo(() => ({
      limit: perPage,
      offset: page * perPage,
      signer: accountId,
    }),
    [accountId, page, perPage]
  )

  const query = useQuery<GetExtrinsicsBySigner>(GET_EXTRINSICS_BY_SIGNER, { variables });
  
  const onPage = useCallback<(e: unknown, page: number) => void>(
    (_, p) => setPage(p),
    []
  );

  const onRowsPerPageChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPerPage(parseInt(e.target.value))
    },
    []
  );

  useEffect(() => {
    if (query.data?.count.aggregate.count) {
      setTotal(query.data?.count.aggregate.count);
    }
  }, [query.data?.count.aggregate.count])

  return (
    <>
      <Error type='data-unavailable' error={!!query.error}>
        <ExtrinsicsTable extrinsics={query.data?.extrinsics} />
        <Pagination
          component='div'
          sx={paginationStyles}
          count={total}
          page={page}
          rowsPerPage={perPage}
          onPageChange={onPage}
          rowsPerPageOptions={PER_PAGE_OPTIONS}
          onRowsPerPageChange={onRowsPerPageChange} />
      </Error>
    </>
  );
}

export default Extrinsics;