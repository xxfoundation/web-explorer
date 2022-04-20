import { useQuery } from '@apollo/client';
import { Stack, Typography } from '@mui/material';
import { default as React } from 'react';
import { GET_BLOCK_BY_PK } from '../../schemas/blocks.schema';
import BlockStatus from '../blockchain/BlockStatus';
import BackAndForwardArrows from '../buttons/BackAndForwardArrows';
import CopyButton from '../buttons/CopyButton';
import { Address, Hash } from '../ChainId';
import Link from '../Link';
import SummaryPaper from '../Paper/SummaryPaper';
import TimeAgoComponent from '../TimeAgo';

export type BlockType = {
  numberFinalized: number;
  number: number;
  currentEra: string;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  author: string;
  authorName: string;
  timestamp: number;
  specVersion: number;
};

const summaryDataParser = (data: BlockType) => [
  { label: 'time', value: <Typography>{data.timestamp}</Typography> },
  {
    label: 'status',
    value: (
      <Stack direction={'row'} alignItems='center'>
        <BlockStatus number={data.number} numberFinalized={data.numberFinalized} />
      </Stack>
    )
  },
  { label: 'era', value: <Typography>{data.currentEra}</Typography> },
  {
    label: 'hash',
    value: <Hash value={data.hash} />,
    action: <CopyButton value={data.hash} />
  },
  {
    label: 'parent hash',
    value: <Hash value={data.parentHash} />,
    action: <BackAndForwardArrows back={{ disabled: true }} forward={{ disabled: true }} />
  },
  {
    label: 'state root',
    value: <Hash value={data.stateRoot} />
  },
  {
    label: 'extrinsics root',
    value: <Hash value={data.extrinsicsRoot} />
  },
  {
    label: 'block producer',
    value: (
      <Address
        name={data.authorName}
        value={data.author}
        link={`/blocks/${data.hash}/producer/${data.author}`}
      />
    ),
    action: <CopyButton value={data.author} />
  },
  {
    label: 'block time',
    value: (
      <Typography>
        <TimeAgoComponent date={data.timestamp} />
      </Typography>
    )
  },
  {
    label: 'spec version',
    value: (
      <Link to={'#'}>
        <Typography>{data.specVersion}</Typography>
      </Link>
    )
  }
];

const BlockSummary: React.FC<{
  number: number;
}> = ({ number }) => {
  const { data, error, loading } = useQuery<{ block: BlockType }>(GET_BLOCK_BY_PK, {
    variables: { blockNumber: number }
  });
  if (error) return <h1>falou</h1>;
  return (
    <SummaryPaper
      data={data ? summaryDataParser(data.block) : []}
      loading={loading}
      skeletonLines={9}
    />
  );
};

export default BlockSummary;
