import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ButtonGroup, Divider, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import CopyButton from '../buttons/CopyButton';
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
  { label: 'time', value: <Typography>{data.time}</Typography> },
  {
    label: 'status',
    value: (
      <Stack direction={'row'} alignItems='center'>
        <CheckCircleOutlineIcon color={'success'} sx={{ mr: 1 }} />
        <Typography>{data.status}</Typography>
      </Stack>
    )
  },
  { label: 'era', value: <Typography>{data.era}</Typography> },
  {
    label: 'hash',
    value: <Hash value={data.hash} />,
    action: <CopyButton value={data.hash} />
  },
  {
    label: 'parent hash',
    value: <Hash value={data.parentHash} />,
    action: <BackAndForwardArrows />
  },
  {
    label: 'state root',
    value: (
      <Stack direction={'row'}>
        <CheckCircleOutlineIcon color='success' sx={{ mr: 1 }} />
        <Hash value={data.stateRoot} />
      </Stack>
    )
  },
  {
    label: 'extrinsics root',
    value: <Hash value={data.extrinsicsRoot} />
  },
  {
    label: 'block producer',
    value: (
      <Address
        name={data.blockProducer.name}
        value={data.blockProducer.hash}
        link={`/blocks/${data.hash}/producer/${data.blockProducer.hash}`}
      />
    ),
    action: <CopyButton value={data.blockProducer.hash} />
  },
  { label: 'block time', value: <Typography><TimeAgoComponent date={data.blockTime} /></Typography> },
  { label: 'spec version', value: <Link to={'#'}><Typography>{data.specVersion}</Typography></Link> }
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
