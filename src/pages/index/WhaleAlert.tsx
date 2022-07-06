import { Box, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import React, { Dispatch, FC, SetStateAction } from 'react';
import BlockStatusIcon from '../../components/block/BlockStatusIcon';
import Address from '../../components/Hash/XXNetworkAddress';
import Hash from '../../components/Hash';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import { BaselineTable } from '../../components/Tables';
import { TableSkeleton } from '../../components/Tables/TableSkeleton';
import Error from '../../components/Error';
import TimeAgo from '../../components/TimeAgo';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import {
  GetTransfersByBlock,
  LIST_WHALE_TRANSFERS,
  Transfer
} from '../../schemas/transfers.schema';

const TransferRow = (data: Transfer) => {
  const extrinsicIdLink = `/extrinsics/${data.blockNumber}-${data.index}`;
  return [
    { value: <Link to={`/blocks/${data.blockNumber}`}>{data.blockNumber}</Link> },
    { value: <TimeAgo date={data.timestamp} /> },
    {
      value: <Address value={data.source} url={`/accounts/${data.source}`} truncated />
    },
    {
      value: <Address value={data.destination} url={`/accounts/${data.destination}`} truncated />
    },
    { value: <FormatBalance value={data.amount.toString()} /> },
    { value: <BlockStatusIcon status={data.success ? 'successful' : 'failed'} /> },
    { value: <Hash truncated value={data.hash} url={extrinsicIdLink} showTooltip /> }
  ];
};

const headers = [
  { value: 'Block' },
  { value: 'Time' },
  {
    value: <Typography>To</Typography>
  },
  {
    value: <Typography>From</Typography>
  },
  { value: 'Amount' },
  { value: 'Result' },
  { value: 'Hash' }
];

const TransferTable: FC<{
  where?: Record<string, unknown>;
  setCount?: Dispatch<SetStateAction<number | undefined>>;
}> = ({}) => {
  const { data, error, loading } = useQuery<GetTransfersByBlock>(LIST_WHALE_TRANSFERS);

  if (error) return <Error type='data-unavailable' />;
  if (loading) return <TableSkeleton rows={10} cells={headers.length} footer />;
  return <BaselineTable headers={headers} rows={(data?.transfers || []).map(TransferRow)} />;
};

const WhaleAlert = () => {
  return (
    <Box sx={{ mt: 7 }}>
      <Typography variant='h3' gutterBottom>
        Whale Alert
      </Typography>
      <PaperStyled>
        <Typography variant='h4' sx={{ mb: 4, px: '3px' }}>
          Top 10 transfers of last week
        </Typography>
        <TransferTable />
      </PaperStyled>
    </Box>
  );
};

export default WhaleAlert;
