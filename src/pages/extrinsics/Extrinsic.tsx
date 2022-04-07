import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import { Breadcrumbs, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import RouteBreadcrumb from '../../components/Breadcrumbs';
import CopyButton, { withCopy } from '../../components/buttons/CopyButton';
import { Address, Hash } from '../../components/ChainId';
import FormatBalance from '../../components/FormatBalance';
import SummaryPaper from '../../components/SummaryPaper';
import Tag from '../../components/Tags/Tag';

const Extrinsic = () => {
  const { extrinsicId } = useParams<{ extrinsicId: string }>();
  const extrinsicsDetailData = useMemo(() => {
    const sampleAddress = '0xa86Aa530f6cCBd854236EE00ace687a29ad1c062';
    return [
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
        value: (
          <Breadcrumbs separator='/'>
            <Tag filled>balances</Tag>
            <Stack direction={'row'} spacing={1} alignItems='center'>
              <Tag>transfer</Tag>
              <InfoOutlinedIcon color='primary' />
            </Stack>
          </Breadcrumbs>
        )
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
        value: (
          <Stack direction='row' alignItems='center'>
            <PaidOutlinedIcon />
            <FormatBalance value={'24985'} isShort />
          </Stack>
        )
      },
      {
        label: 'fee',
        value: (
          <Stack direction='row' alignItems='center'>
            <PaidOutlinedIcon />
            <Typography>0.297000000 XX</Typography>
          </Stack>
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
      {
        label: '',
        value: (
          <>
            <Button>copy</Button>
            <Button>view code</Button>
          </>
        )
      },
      {
        label: 'parameters',
        value: (
          <Stack>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              divider={<Divider orientation='vertical' flexItem />}
            >
              <>desk</>
              <Address value={sampleAddress} variant='body3' link={`???/${sampleAddress}`} />
              <CopyButton value={sampleAddress} />
            </Stack>
            <Stack
              direction={'row'}
              spacing={1}
              alignItems={'center'}
              divider={<Divider orientation='vertical' flexItem />}
            >
              <>value</>
              <>249.85</>
            </Stack>
          </Stack>
        )
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
  }, []);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RouteBreadcrumb />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h1'>Extrinsic No.{extrinsicId}</Typography>
      </Grid>
      <Grid item xs={12}>
        <SummaryPaper data={extrinsicsDetailData} />
      </Grid>
      <Grid>
        
      </Grid>
    </Grid>
  );
};

export default Extrinsic;
