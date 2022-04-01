import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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
import { Link } from 'react-router-dom';
import { Address, Hash } from '../Hash';
import { SummaryPaper } from '../Summary';

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
        <Link to='/block'>blocks</Link>
        <Divider orientation='vertical' flexItem />
        <BackAndForwardArrows />
      </Stack>
    </Stack>
  );
};

type Producer = { dunno?: string; name?: string; hash: string; icon?: string };

const producerField = (producer: Producer) => {
  return (
    <Box>
      <Stack direction={'row'} spacing={3} justifyContent={'flex-start'} alignItems={'center'}>
        <Stack direction={'row'} spacing={1} alignItems='center'>
          <Avatar alt={producer.hash} src={producer.icon} />
          <Address
            value={producer.name}
            altValue={producer.hash}
            alertMsg={'producer address is not valid'}
            variant='body3'
            copyable
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const backAndForwardWithLabel = (parentHash: string) => {
  return (
    <Stack direction={'row'} spacing={1}>
      <Hash value={parentHash} variant='body3' alertMsg='parent hash is not valid' />
      <Divider orientation='vertical' flexItem />
      <BackAndForwardArrows />
    </Stack>
  );
};

const LinkWrapper = (link: string, text: string | number) => <Link to={link}>{text}</Link>;

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
  {
    label: 'hash',
    value: <Hash value={data.hash} variant='body3' alertMsg='hash is not valid' copyable />
  },
  { label: 'parent hash', value: backAndForwardWithLabel(data.parentHash) },
  {
    label: 'state root',
    value: (
      <>
        <CheckCircleOutlineIcon color='success' />
        <Hash value={data.stateRoot} variant={'body3'} alertMsg={'state root is not valid'} />
      </>
    )
  },
  {
    label: 'extrinsics root',
    value: (
      <Hash
        value={data.extrinsicsRoot}
        variant={'body3'}
        alertMsg={'extrinsics root is not valid'}
      />
    )
  },
  { label: 'block producer', value: producerField(data.blockProducer) },
  { label: 'block time', value: data.blockTime },
  { label: 'spec version', value: LinkWrapper('#', data.specVersion) }
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
