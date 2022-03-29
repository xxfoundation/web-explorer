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
import { Link } from 'react-router-dom';
import CopyButton from '../../components/CopyButton';
import { SummaryPaper, textWithCopy } from '../../components/Summary';
import { theme } from '../../themes/default';

const BackAndForwardArrows = () => {
  return (
    <ButtonGroup>
      <IconButton aria-label="back">
        <ArrowBackIcon />
      </IconButton>
      <IconButton arial-label="forward">
        <ArrowForwardIcon />
      </IconButton>
    </ButtonGroup>
  );
};

const BlockSummaryHeader = ({ number }) => {
  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <Typography>Block No. {number}</Typography>
      <Stack direction={'row'} justifyContent={'space-around'} spacing={2}>
        <Link to="#">blocks</Link>
        <Divider orientation="vertical" flexItem />
        <BackAndForwardArrows />
      </Stack>
    </Stack>
  );
};

const producerField = (data) => {
  return (
    <Box>
      <Stack direction={'row'} spacing={3} justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={1}>
          <RemoveCircleIcon />
          <Typography>{data.dunno || 'dunno'}</Typography>
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Avatar alt={data.name} src={data.icon || '??'} />
          <Typography>{data.hash || 'hash'}</Typography>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <Divider orientation="vertical"></Divider>
          <CopyButton value={data.hash} />
        </Stack>
      </Stack>
    </Box>
  );
};

const backAndForwardWithLabel = (data) => {
  return (
    <Stack direction={'row'} spacing={1}>
      <Typography>{data.parentHash}</Typography>
      <Divider orientation="vertical" flexItem />
      <BackAndForwardArrows />
    </Stack>
  );
};

const linkWrapper = (data) => {
  return <Link to="#">{data.specVersion}</Link>;
};

const summaryData = (data) => [
  ['time', data.time],
  [
    'status',
    <>
      <CheckCircleOutlineIcon color={theme.palette.success.main} />
      {data.status}
    </>
  ],
  ['era', data.era],
  ['hash', textWithCopy(data.hash, <Typography>{data.hash}</Typography>)],
  ['parent hash', backAndForwardWithLabel(data)],
  [
    'state root',
    <>
      <CheckCircleOutlineIcon color={theme.palette.success.main} />
      {data.stateRoot}
    </>
  ],
  ['extrinsics root', data.extrinsicsRoot],
  ['block producer', producerField(data.blockProducer)],
  ['block time', data.blockTime],
  ['spec version', linkWrapper(data)]
];

const BlockSummary = ({ data, number }) => {
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
