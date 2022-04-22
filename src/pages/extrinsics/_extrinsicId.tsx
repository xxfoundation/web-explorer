import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box, Container, Divider, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CopyButton from '../../components/buttons/CopyButton';
import { Address, Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import SummaryPaper from '../../components/Paper/SummaryPaper';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import ModuleCalls from './ModuleCalls';

const sampleEventsData = (extrinsicId: string) => {
  const items = [];
  for (let step = 0; step < 9; step++) {
    items.push({
      id: '287845-' + step,
      hash: '0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a869',
      action: 'Balances (Withdraw)',
      extrinsicId
    });
  }
  return items;
};

const sampleAddress = '0xa86Aa530f6cCBd854236EE00ace687a29ad1c062';

const extrinsicsDetailData = [
  { label: 'time', value: '2022-02-28 16:42:30 (+UTC)' },
  {
    label: 'block',
    value: (
      <Link to={'/blocks/504782'}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <CheckCircleOutlineOutlinedIcon color='success' />
          <Typography>504782</Typography>
        </Stack>
      </Link>
    )
  },
  {
    label: 'lifetime',
    value: <Typography>Immortal</Typography>
  },
  {
    label: 'extrinsic hash',
    value: (
      <Hash value='0x91dde1fb579d6ca88a65dcba6ca737095748f7ea214437e93cf0b7133253b350' link={'#'} />
    )
  },
  {
    label: 'module/call',
    value: <ModuleCalls module='balance' call='transfers' />
  },
  {
    label: 'sender',
    value: <Address name='john doe' value={sampleAddress} link={`/accounts/${sampleAddress}`} />,
    action: <CopyButton value={sampleAddress} />
  },
  {
    label: 'destination',
    value: <Address value={sampleAddress} link={`/accounts/${sampleAddress}`} />,
    action: <CopyButton value={sampleAddress} />
  },
  {
    label: 'value',
    // TODO how to remove the B from the display
    value: (
      <Typography>
        <FormatBalance value={'249850000000'} />
      </Typography>
    )
  },
  {
    label: 'fee',
    value: (
      <Typography>
        {/* TODO how to display 0.297000000 XX */}
        <FormatBalance value={'297000000'} />
      </Typography>
    )
  },
  {
    label: 'nonce',
    value: <Typography>8329</Typography>
  },
  {
    label: 'result',
    value: (
      <Stack direction='row' spacing={1} alignItems='center'>
        <CheckCircleOutlineOutlinedIcon color='success' />
        <Typography>Success</Typography>
      </Stack>
    )
  },
  {
    label: <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />,
    value: <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
  },
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
  // const eventsData = useMemo(() => {
  //   return sampleEventsData(extrinsicId);
  // }, [extrinsicId]);

  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='events' count={9} />,
        content: <Typography>placeholder</Typography>
      }
    ];
  }, []);
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Box sx={{ mb: 5 }}>
        <Typography variant='h1'>Extrinsic #{extrinsicId}</Typography>
      </Box>
      <SummaryPaper data={extrinsicsDetailData} />
      <Box sx={{ mt: 2 }}>
        <TabsWithPanels panels={panels} tabsLabel='extrinsic page events' />
      </Box>
    </Container>
  );
};

export default Extrinsic;
