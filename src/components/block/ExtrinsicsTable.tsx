import { useQuery } from '@apollo/client';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import React, { FC, useMemo, useEffect } from 'react';
import { EXTRINSICS_OF_BLOCK, ListExtrinsics, Extrinsic } from '../../schemas/extrinsics.schema';
import Hash from '../Hash';
import Link from '../Link';
import { BaseLineCellsWrapper, BaselineTable, headerCellsWrapper } from '../Tables';
import TimeAgoComponent from '../TimeAgo';
import { usePagination } from '../../hooks';
import { useTranslation } from 'react-i18next';

const ROWS_PER_PAGE = 10;

const rowsParser = (extrinsic: Extrinsic) => {
  return BaseLineCellsWrapper([
    <Link to={`/extrinsics/${extrinsic.blockNumber}-${extrinsic.extrinsicIndex}`}>
      {extrinsic.blockNumber}-{extrinsic.extrinsicIndex}
    </Link>,
    <Hash
      truncated
      value={extrinsic.hash}
      url={`/extrinsics/${extrinsic.blockNumber}-${extrinsic.extrinsicIndex}`}
    />,
    <TimeAgoComponent date={extrinsic.timestamp} />,
    <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />,
    <Link
      to={`/extrinsics/${extrinsic.blockNumber}-${extrinsic.extrinsicIndex}`}
    >{`${extrinsic.module} (${extrinsic.call})`}</Link>
  ]);
};

type Props = {
  accountId?: string;
  blockNumber?: number;
};

const ExtrinsicsTable: FC<Props> = ({ accountId, blockNumber }) => {
  const { t } = useTranslation();
  const pagination = usePagination({ rowsPerPage: ROWS_PER_PAGE });
  const { paginate, setCount: setPaginationCount } = pagination;

  const variables = useMemo(() => {
    return {
      orderBy: [{ timestamp: 'desc' }],
      where: {
        ...(accountId && { signer: { _eq: accountId } }),
        ...(blockNumber && { block_number: { _eq: blockNumber } })
      }
    };
  }, [accountId, blockNumber]);

  const { data, error, loading } = useQuery<ListExtrinsics>(EXTRINSICS_OF_BLOCK, { variables });

  const rows = useMemo(() => {
    return paginate(data?.extrinsics || []).map(rowsParser);
  }, [data?.extrinsics, paginate]);

  useEffect(() => {
    if (data?.agg) {
      setPaginationCount(data.agg.aggregate.count);
    }
  }, [data?.agg, setPaginationCount]);

  const headers = useMemo(
    () => headerCellsWrapper([
      t('extrinsic id'),
      t('hash'),
      t('time'),
      t('result'),
      t('action')
    ]),
    [t]
  )

  return (
    <BaselineTable
      error={!!error}
      loading={loading}
      headers={headers}
      rowsPerPage={pagination.rowsPerPage}
      rows={rows}
      footer={pagination.controls}
    />
  );
};

export default ExtrinsicsTable;
