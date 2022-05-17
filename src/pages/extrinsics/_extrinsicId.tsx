import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Box, Button, Container, Divider, Stack, styled, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import EventsTable from '../../components/block/EventsTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CopyButton, { callbackCopyMessage } from '../../components/buttons/CopyButton';
import { Address, Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import Link from '../../components/Link';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import SummaryPaper from '../../components/Paper/SummaryPaper';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import useCopyClipboard from '../../hooks/useCopyToClibboard';
import ModuleCalls from './ModuleCalls';

const RoundedButton = styled(Button)(({}) => {
  return {
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: 1,
    color: 'white'
  };
});

const ParametersActions: FC<{ data: unknown }> = ({ data }) => {
  const staticCopy = useCopyClipboard()[1];
  return (
    <>
      <RoundedButton
        variant='contained'
        onClick={() => staticCopy(JSON.stringify(data), callbackCopyMessage)}
      >
        copy
      </RoundedButton>
      <RoundedButton variant='contained' disabled sx={{ marginLeft: '24px' }}>
        view code
      </RoundedButton>
    </>
  );
};
const elementDivider = (
  <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
);

const sampleAddress = '0xa86Aa530f6cCBd854236EE00ace687a29ad1c062';

const sampleExtrinsicHash = '0x91dde1fb579d6ca88a65dcba6ca737095748f7ea214437e93cf0b7133253b350';

const sampleParameters = {
  this: 'isn\'t real yet'
};

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
    value: <Hash value={sampleExtrinsicHash} link={'#'} />,
    action: <CopyButton value={sampleExtrinsicHash} />
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
    label: elementDivider,
    value: elementDivider
  },
  {
    label: 'parameters',
    value: <ParametersActions data={sampleParameters} />
  },
  {
    label: 'signature',
    value: (
      <Typography>
        0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a8692377ef3046d27667cffb3cc7b963f86d0cbaa043113c2949b970a5bb14658ea401
      </Typography>
    )
  }
];

const sampleStaticBlockNumber = 2121013;

const Extrinsic = () => {
  const { extrinsicId } = useParams<{ extrinsicId: string }>();

  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='events' count={9} />,
        content: (
          <EventsTable
            where={{
              block_number: {
                _eq: sampleStaticBlockNumber
              }
            }}
          />
        )
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
        <PaperStyled>
          <TabsWithPanels panels={panels} tabsLabel='extrinsic page events' />
        </PaperStyled>
      </Box>
    </Container>
  );
};

export default Extrinsic;
