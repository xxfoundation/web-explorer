import type { Block } from '../../schemas/blocks.schema';
import React, { FC, useMemo } from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
import Address from '../Hash/XXNetworkAddress';
import dayjs from 'dayjs';
import BlockStatusIcon from './BlockStatusIcon';
import TimeAgo from '../TimeAgo';
import {
  SummaryContainer,
  SummaryEntry,
  SummaryHeader,
  SummaryLoader,
  SummaryValue,
  WithCopy
} from '../Summary';
import Ellipsis from '../Ellipsis';
import Hash from '../Hash';

const timeFormat = 'YYYY.MM.DD | h:mm A (UTC)';

const BlockSummary: FC<{ block?: Block }> = ({ block }) => {
  const formattedTimestamp = useMemo(
    () => (block?.timestamp ? dayjs.utc(block?.timestamp).format(timeFormat) : undefined),
    [block?.timestamp]
  );
  console.warn(block)

  return !block ? (
    <SummaryLoader number={9} />
  ) : (
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
        <SummaryValue>{block?.currentEra}</SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Block Hash</SummaryHeader>
        <SummaryValue>
          <WithCopy value={block.hash}>
            <Hash truncated='lgDown' value={block.hash} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Parent Hash</SummaryHeader>
        <SummaryValue>
          <Ellipsis>
            <Hash truncated='lgDown' value={block?.parentHash} />
          </Ellipsis>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>State Root</SummaryHeader>
        <SummaryValue>
          <Hash truncated='lgDown' value={block?.stateRoot} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Extrinsics Root</SummaryHeader>
        <SummaryValue>
          <Hash truncated='lgDown' value={block?.extrinsicsRoot} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Block Producer</SummaryHeader>
        <SummaryValue>
          <Ellipsis>
            {block ? (
              block?.authorName ?
                  <WithCopy value={block.author}>
                    <Address
                      roles={block?.authorName}
                      truncated='mdDown'
                      name={block?.authorName?.identity?.display}
                      value={block.author}
                      url={`/blocks/${block.number}/producer/${block.author}`}
                    />
                  </WithCopy>
              : <i>Genesis Block</i>
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
