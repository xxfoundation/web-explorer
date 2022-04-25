import { Stack, Typography } from '@mui/material';
import { default as React } from 'react';
import BackAndForwardArrows from '../buttons/BackAndForwardArrows';
import CopyButton from '../buttons/CopyButton';
import { Address, Hash } from '../ChainId';
import Link from '../Link';
import SummaryPaper from '../Paper/SummaryPaper';
import TimeAgoComponent from '../TimeAgo';
import BlockStatusIcon from './BlockStatusIcon';
import { BlockType } from './types';

const summaryDataParser = (data: BlockType) => {
  if (!data) return [];
  return [
    { label: 'time', value: <Typography>{data.timestamp}</Typography> },
    {
      label: 'status',
      value: (
        <Stack direction={'row'} alignItems='center'>
          <BlockStatusIcon status={data.number > data.numberFinalized ? 'pending' : 'successful'} />
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
};

const BlockSummary: React.FC<{
  data?: { block: BlockType };
  loading: boolean;
}> = ({ data, loading }) => {
  return (
    <SummaryPaper
      data={data ? summaryDataParser(data.block) : []}
      loading={loading}
      skeletonLines={9}
    />
  );
};

export default BlockSummary;
