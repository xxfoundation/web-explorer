import { useQuery } from '@apollo/client';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import React, { FC, useMemo, useEffect } from 'react';
import { EXTRINSICS_OF_BLOCK, ListExtrinsics, Extrinsic } from '../../schemas/extrinsics.schema';
import Hash from '../Hash';
import Link from '../Link';
import { BaseLineCellsWrapper, BaselineTable } from '../Tables';
import TimeAgoComponent from '../TimeAgo';
import { usePagination } from '../../hooks';

const ROWS_PER_PAGE = 5;

const rowsParser = (rowData: Extrinsic) => {
  return BaseLineCellsWrapper([
    <Link to={`/extrinsics/${rowData.blockNumber}-${rowData.index}`}>
      {rowData.blockNumber}-{rowData.index}
    </Link>,
    <Hash
      value={rowData.hash}
      truncated
      url={`/extrinsics/${rowData.blockNumber}-${rowData.index}`}
      showTooltip
    />,
    <TimeAgoComponent date={rowData.timestamp} />,
    <BlockStatusIcon status={rowData.success ? 'successful' : 'failed'} />,
    <Link
      to={`/extrinsics/${rowData.blockNumber}-${rowData.index}`}
    >{`${rowData.section} (${rowData.method})`}</Link>
  ]);
};

const headers = BaseLineCellsWrapper(['extrinsic id', 'hash', 'time', 'result', 'action']);

type Props = {
  where: Record<string, unknown>;
}

const BlockExtrinsics: FC<Props> = ({ where }) => {
  const pagination = usePagination({ rowsPerPage: ROWS_PER_PAGE });
  const { paginate, setCount: setPaginationCount } = pagination;

  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'desc' }],
      where
    };
  }, [where]);
  const { data, error, loading } = useQuery<ListExtrinsics>(EXTRINSICS_OF_BLOCK, { variables });

  const rows = useMemo(() => {
    return paginate(data?.extrinsics || []).map(rowsParser);
  }, [data?.extrinsics, paginate]);

  useEffect(() => {
    if (data?.agg) {
      setPaginationCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setPaginationCount]);

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rowsPerPage={pagination.rowsPerPage}
      rows={rows}
      footer={pagination.controls} />
  );
};

export default BlockExtrinsics;
