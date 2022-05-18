import { OperationVariables, QueryResult, useQuery } from '@apollo/client';
import { IconButtonProps, Stack, Typography } from '@mui/material';
import { default as React, FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { GET_BLOCK_BY_HASH } from '../../schemas/blocks.schema';
import BackAndForwardArrows from '../buttons/BackAndForwardArrows';
import CopyButton from '../buttons/CopyButton';
import { Address, Hash } from '../ChainId';
import Link from '../Link';
import SummaryPaper from '../Paper/SummaryPaper';
import TimeAgoComponent from '../TimeAgo';
import BlockStatusIcon from './BlockStatusIcon';
import { BlockType } from './types';

const useArrowButtonsOptions = (block: BlockType): { previous: IconButtonProps } => {
  const history = useHistory();
  const buttonProps = useCallback(
    ({ data, loading }: QueryResult<{ blocks?: BlockType[] }, OperationVariables>) => {
      const blockNumber = data?.blocks?.at(0)?.number;
      return {
        disabled: loading || !blockNumber,
        onClick: () => {
          history.push(`/blocks/${blockNumber}`);
        }
      };
    },
    [history]
  );

  const previousBlockQuery = useQuery<{ blocks?: BlockType[] }>(GET_BLOCK_BY_HASH, {
    variables: {
      where: {
        block_hash: {
          _eq: block.parentHash
        }
      }
    }
  });
  return { previous: buttonProps(previousBlockQuery) };
};

const BlockSummary: FC<{
  data: BlockType;
}> = ({ data }) => {
  const arrowsOptions = useArrowButtonsOptions(data);
  const summaryData = [
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
      action: (
        <BackAndForwardArrows
          back={arrowsOptions.previous}
          forward={{ onClick: () => {}, disabled: true }}
        />
      )
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
  return <SummaryPaper data={summaryData} />;
};

export default BlockSummary;
