import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ButtonGroup, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { withCopy } from '../buttons/CopyButton';
import { Address, Hash } from '../ChainId';
import SummaryPaper from '../SummaryPaper';

const BackAndForwardArrows = () => {
  return (
    <ButtonGroup>
      <IconButton aria-label='back'>
        <ArrowBackIcon />
      </IconButton>
      <IconButton arial-label='forward'>
        <ArrowForwardIcon />
      </IconButton>
    </ButtonGroup>
  );
};

const BlockSummaryHeader: React.FC<{ number: string }> = ({ number }) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Typography>Block No. {number}</Typography>
      <Stack direction={'row'} justifyContent={'space-around'} spacing={2}>
        <Link to='/blocks'>blocks</Link>
        <Divider orientation='vertical' flexItem />
        <BackAndForwardArrows />
      </Stack>
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
      <Hash value={parentHash} variant='body3' />
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
      <>
        <CheckCircleOutlineIcon color={'success'} />
        {data.status}
      </>
    )
  },
  { label: 'era', value: data.era },
  {
    label: 'hash',
    value: withCopy(data.hash, <Hash value={data.hash} variant='body3' />)
  },
  { label: 'parent hash', value: backAndForwardWithLabel(data.parentHash) },
  {
    label: 'state root',
    value: (
      <>
        <CheckCircleOutlineIcon color='success' />
        <Hash value={data.stateRoot} variant={'body3'} />
      </>
    )
  },
  {
    label: 'extrinsics root',
    value: <Hash value={data.extrinsicsRoot} variant={'body3'} />
  },
  { label: 'block producer', value: producerField(data.blockProducer) },
  { label: 'block time', value: data.blockTime },
  { label: 'spec version', value: <Link to={'#'}>{data.specVersion}</Link> }
];

const BlockSummary: React.FC<{ data: BlockSummaryTyp; number: string }> = ({ data, number }) => {
  const summaryData = React.useMemo(() => {
    return summaryDataParser(data);
  }, [data]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BlockSummaryHeader number={number} />
      </Grid>
      <Grid item xs={12}>
        <SummaryPaper data={summaryData} />
      </Grid>
    </Grid>
  );
};

export default BlockSummary;
