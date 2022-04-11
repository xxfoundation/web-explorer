import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ButtonGroup, Divider, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { withCopy } from '../buttons/CopyButton';
import { Address, Hash } from '../ChainId';
import SummaryPaper from '../Paper/SummaryPaper';
import TimeAgoComponent from '../TimeAgo';
import { BlockNav } from './Block.styled';

const BackAndForwardArrows = () => {
  return (
    <ButtonGroup>
      <IconButton aria-label='back' size='small'>
        <ArrowBackIcon fontSize='small' />
      </IconButton>
      <IconButton arial-label='forward' size='small'>
        <ArrowForwardIcon fontSize='small' />
      </IconButton>
    </ButtonGroup>
  );
};

const BlockSummaryHeader: React.FC<{ number: string }> = ({ number }) => {
  return (
    <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
      <Typography variant='h1'>Block No. {number}</Typography>
      <BlockNav direction={'row'} alignItems={'center'} spacing={2}>
        <Link to='/blocks'>
          <Typography variant='h4'>blocks</Typography>
        </Link>
        <Divider orientation='vertical' variant='middle' flexItem />
        <BackAndForwardArrows />
      </BlockNav>
    </Stack>
  );
};

type Producer = { dunno?: string; name?: string; hash: string; icon?: string };

const producerField = (producer: Producer) => {
  return withCopy(
    producer.hash,
    <Address name={producer.name} value={producer.hash} variant='body3' />
  );
};

const backAndForwardWithLabel = (parentHash: string) => {
  return (
    <Stack direction={'row'} spacing={1}>
      <Hash value={parentHash} />
      <Divider orientation='vertical' flexItem />
      <BackAndForwardArrows />
    </Stack>
  );
};

type BlockSummaryTyp = {
  time: string;
  status: string;
  era: number;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  blockProducer: Producer;
  blockTime: number;
  specVersion: number;
};

const summaryDataParser = (data: BlockSummaryTyp) => [
  { label: 'time', value: data.time },
  {
    label: 'status',
    value: (
      <Stack spacing={1} direction={'row'} alignItems='center'>
        <CheckCircleOutlineIcon color={'success'} />
        {data.status}
      </Stack>
    )
  },
  { label: 'era', value: data.era },
  {
    label: 'hash',
    value: withCopy(data.hash, <Hash value={data.hash} />)
  },
  { label: 'parent hash', value: backAndForwardWithLabel(data.parentHash) },
  {
    label: 'state root',
    value: (
      <>
        <CheckCircleOutlineIcon color='success' />
        <Hash value={data.stateRoot} />
      </>
    )
  },
  {
    label: 'extrinsics root',
    value: <Hash value={data.extrinsicsRoot} />
  },
  { label: 'block producer', value: producerField(data.blockProducer) },
  { label: 'block time', value: <TimeAgoComponent date={data.blockTime} /> },
  { label: 'spec version', value: <Link to={'#'}>{data.specVersion}</Link> }
];

const BlockSummary: React.FC<{ data: BlockSummaryTyp; number: string }> = ({ data, number }) => {
  const summaryData = React.useMemo(() => {
    return summaryDataParser(data);
  }, [data]);
  return (
    <>
      <BlockSummaryHeader number={number} />
      <SummaryPaper data={summaryData} />
    </>
  );
};

export default BlockSummary;
