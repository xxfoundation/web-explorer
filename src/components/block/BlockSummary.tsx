import type { Block } from '../../schemas/blocks.schema';
import React, { FC, useMemo } from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
import { Address } from '../ChainId';
import dayjs from 'dayjs';
import BlockStatusIcon from './BlockStatusIcon';
import TimeAgo from '../TimeAgo';
import {
  SummaryContainer,
  SummaryEntry,
  SummaryHeader,
  SummaryValue,
  WithCopy
} from '../Summary';
import Ellipsis from '../Ellipsis';

const timeFormat = 'YYYY.MM.DD | h:mm A (UTC)';

const BlockSummary: FC<{ block?: Block }> = ({ block }) => {
  const formattedTimestamp = useMemo(
    () => (block?.timestamp ? dayjs.utc(block?.timestamp).format(timeFormat) : undefined),
    [block?.timestamp]
  );

  return (
    <SummaryContainer>
      <SummaryEntry>
        <SummaryHeader>Time</SummaryHeader>
        <SummaryValue>{formattedTimestamp ?? <Skeleton />}</SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Status</SummaryHeader>
        <SummaryValue>
          {block?.finalized === undefined ? (
            <Skeleton />
          ) : (
            <Stack direction='row' spacing={2} alignItems='center'>
              <BlockStatusIcon status={block?.finalized ? 'successful' : 'pending'} />
              <Box sx={{ pb: 0.5 }}>{block?.finalized ? 'Finalized' : 'Pending'}</Box>
            </Stack>
          )}
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Era</SummaryHeader>
        <SummaryValue>{block?.currentEra ?? <Skeleton />}</SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Hash</SummaryHeader>
        <SummaryValue>
          {block?.hash ? <WithCopy value={block.hash}>{block.hash}</WithCopy> : <Skeleton />}
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Parent Hash</SummaryHeader>
        <SummaryValue>
          <Ellipsis>{block?.parentHash ?? <Skeleton />}</Ellipsis>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>State Root</SummaryHeader>
        <SummaryValue>
          <Ellipsis>{block?.stateRoot ?? <Skeleton />}</Ellipsis>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Extrinsics Root</SummaryHeader>
        <SummaryValue>
          <Ellipsis>{block?.extrinsicsRoot ?? <Skeleton />}</Ellipsis>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Block Producer</SummaryHeader>
        <SummaryValue>
          <Ellipsis>
            {block ? (
              <WithCopy value={block.author}>
                <Address
                  name={block.authorName}
                  value={block.author}
                  link={`/blocks/${block.number}/producer/${block.author}`}
                />
              </WithCopy>
            ) : (
              <Skeleton />
            )}
          </Ellipsis>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>{'Block Time'}</SummaryHeader>
        <SummaryValue>{block ? <TimeAgo date={block.timestamp} /> : <Skeleton />}</SummaryValue>
      </SummaryEntry>
    </SummaryContainer>
  );
};

export default BlockSummary;
