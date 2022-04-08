import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Container, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import RouteBreadcrumb from '../../components/Breadcrumbs';
import { withCopy } from '../../components/buttons/CopyButton';
import { Address, Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import SummaryPaper from '../../components/SummaryPaper';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import EventsTable from './EventsTable';
import ModuleCalls from './ModuleCalls';

const sampleAddress = '0xa86Aa530f6cCBd854236EE00ace687a29ad1c062';

const extrinsicsDetailData = [
  { label: 'time', value: '2022-02-28 16:42:30 (+UTC)' },
  {
    label: 'block',
    value: (
      <Stack direction='row' spacing={1} alignItems='center'>
        <CheckCircleOutlineOutlinedIcon color='success' />
        <Typography>504782</Typography>
      </Stack>
    )
  },
  {
    label: 'lifetime',
    value: <>immortal</>
  },
  {
    label: 'extrinsic hash',
    value: (
      <Hash
        value='0x91dde1fb579d6ca88a65dcba6ca737095748f7ea214437e93cf0b7133253b350'
        variant='body3'
      />
    )
  },
  {
    label: 'module/call',
    value: <ModuleCalls module='balance' call='transfers' />
  },
  {
    label: 'sender',
    value: withCopy('', <Address name='john doe' value={sampleAddress} variant='body3' />)
  },
  {
    label: 'destination',
    value: withCopy('', <Address value={sampleAddress} variant='body3' />)
  },
  {
    label: 'value',
    // TODO how to remove the B from the display
    value: <FormatBalance value={'249850000000'} />
  },
  {
    label: 'fee',
    value: (
      <>
        {/* TODO how to display 0.297000000 XX */}
        <FormatBalance value={'297000000'} denomination={9} />
      </>
    )
  },
  {
    label: 'nonce',
    value: <>8329</>
  },
  {
    label: 'result',
    value: (
      <Stack direction='row' spacing={1} alignItems='center'>
        <CheckCircleOutlineOutlinedIcon color='success' />
        <Typography>success</Typography>
      </Stack>
    )
  },
  { label: '', value: <Divider /> },
  // { label: 'parameters', value: <ParametersToSummary parameters={sampleDataParameters} /> },
  {
    label: 'signature',
    value: (
      <Typography>
        0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a8692377ef3046d27667cffb3cc7b963f86d0cbaa043113c2949b970a5bb14658ea401
      </Typography>
    )
  }
];

const Extrinsic = () => {
  const { extrinsicId } = useParams<{ extrinsicId: string }>();
  return (
    <Container sx={{ my: 5 }}>
      <RouteBreadcrumb />
      <Typography variant='h1'>Extrinsic #{extrinsicId}</Typography>
      <SummaryPaper data={extrinsicsDetailData} />
      <TabsWithPanels
        panels={[{ label: <TabText message='events' count={9} />, content: <EventsTable /> }]}
        tabsLabel='extrinsic page events'
      />
    </Container>
  );
};

export default Extrinsic;
