import { Stack, Typography } from '@mui/material';
import { default as React, FC, useMemo } from 'react';
import { GetBlockByPK } from '../../schemas/blocks.schema';
import CopyButton from '../buttons/CopyButton';
import { Address, Hash } from '../ChainId';
import Link from '../Link';
import SummaryPaper from '../Paper/SummaryPaper';
import TimeAgoComponent from '../TimeAgo';
import BlockStatusIcon from './BlockStatusIcon';

const BlockSummary: FC<{
  data: GetBlockByPK['block'];
}> = ({ data }) => {
  const summaryData = useMemo(
    () => [
      { label: 'time', value: <Typography>{data.timestamp}</Typography> },
      {
        label: 'status',
        value: (
          <Stack direction={'row'} alignItems='center'>
            <BlockStatusIcon
              status={data.number > data.numberFinalized ? 'pending' : 'successful'}
            />
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
        value: <Hash value={data.parentHash} />
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
    ],
    [
      data.author,
      data.authorName,
      data.currentEra,
      data.extrinsicsRoot,
      data.hash,
      data.number,
      data.numberFinalized,
      data.parentHash,
      data.specVersion,
      data.stateRoot,
      data.timestamp
    ]
  );
  return <SummaryPaper data={summaryData} />;
};

export default BlockSummary;
