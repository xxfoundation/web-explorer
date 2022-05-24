import { Stack, Typography } from '@mui/material';
import { default as React, FC } from 'react';
import { GetBlockByPK } from '../../schemas/blocks.schema';
import CopyButton from '../buttons/CopyButton';
import { Address, Hash } from '../ChainId';
import Link from '../Link';
import { SummaryPaperWrapper, SummaryRow } from '../Paper/SummaryPaper';
import TimeAgoComponent from '../TimeAgo';
import BlockStatusIcon from './BlockStatusIcon';

const BlockSummary: FC<{
  data: GetBlockByPK['block'];
}> = ({ data }) => {
  return (
    <SummaryPaperWrapper>
      <SummaryRow label='title'>
        <Typography>{data.timestamp}</Typography>
      </SummaryRow>
      <SummaryRow label='status'>
        <Stack direction={'row'} alignItems='center'>
          <BlockStatusIcon status={data.number > data.numberFinalized ? 'pending' : 'successful'} />
        </Stack>
      </SummaryRow>
      <SummaryRow label='era'>
        <Typography>{data.currentEra}</Typography>
      </SummaryRow>
      <SummaryRow label='hash' action={<CopyButton value={data.hash} />}>
        <Hash value={data.hash} />
      </SummaryRow>
      <SummaryRow label='parent hash'>
        <Hash value={data.parentHash} />
      </SummaryRow>
      <SummaryRow label='state root'>
        <Hash value={data.stateRoot} />
      </SummaryRow>
      <SummaryRow label='extrinsics root'>
        <Hash value={data.extrinsicsRoot} />
      </SummaryRow>
      <SummaryRow label='block producer' action={<CopyButton value={data.author} />}>
        <Address
          name={data.authorName}
          value={data.author}
          link={`/blocks/${data.hash}/producer/${data.author}`}
        />
      </SummaryRow>
      <SummaryRow label='block time'>
        <Typography>
          <TimeAgoComponent date={data.timestamp} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='spec version'>
        <Link to={'#'}>
          <Typography>{data.specVersion}</Typography>
        </Link>
      </SummaryRow>
    </SummaryPaperWrapper>
  );
};

export default BlockSummary;
