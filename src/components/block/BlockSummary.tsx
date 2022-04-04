import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
  Avatar,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import CopyButton from '../CopyButton';
import Link from '../Link';
import { SummaryPaper, textWithCopy } from '../Summary';

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

const producerField = (hash: string, producer: Producer) => {
  return (
    <Box>
      <Stack direction={'row'} spacing={3} justifyContent={'flex-start'} alignItems={'center'}>
        {producer.name && (
          <Stack direction={'row'} spacing={1}>
            <RemoveCircleIcon />
            <Typography>{producer.name}</Typography>
          </Stack>
        )}
        <Stack direction={'row'} spacing={1} alignItems='center'>
          <Avatar alt={producer.name || producer.hash} src={producer.icon} />
          <Link to={`/blocks/${hash}/producer/${producer.hash}`}>{producer.hash}</Link>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <Divider orientation='vertical'></Divider>
          <CopyButton value={producer.hash} />
        </Stack>
      </Stack>
    </Box>
  );
};

const backAndForwardWithLabel = (parentHash: string) => {
  return (
    <Stack direction={'row'} spacing={1}>
      <Typography>{parentHash}</Typography>
      <Divider orientation='vertical' flexItem />ƒ
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

const summaryData = (data: BlockSummaryTyp) => [
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
  { label: 'hash', value: textWithCopy(data.hash, <Typography>{data.hash}</Typography>) },
  { label: 'parent hash', value: backAndForwardWithLabel(data.parentHash) },
  {
    label: 'state root',
    value: (
      <>
        <CheckCircleOutlineIcon color='success' />
        {data.stateRoot}
      </>
    )
  },
  { label: 'extrinsics root', value: data.extrinsicsRoot },
  { label: 'block producer', value: producerField(data.hash, data.blockProducer) },
  { label: 'block time', value: data.blockTime },
  { label: 'spec version', value: <Link to={'#'}>{data.specVersion}</Link> }
];

const BlockSummary: React.FC<{ data: BlockSummaryTyp; number: string }> = ({ data, number }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BlockSummaryHeader number={number} />
      </Grid>
      <Grid item xs={12}>
        <SummaryPaper data={summaryData(data)} />
      </Grid>
    </Grid>
  );
};

export default BlockSummary;
