import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import HistoryTable from './HistoryTable';

const HistoryPage = () => {
  const totalOfExtrinsics = 32987;
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        sx={{ mb: 5 }}
      >
        <Typography variant='h1'>
          Extrinsic History
        </Typography>
        <DownloadDataButton onClick={() => {}}>Download data</DownloadDataButton>
      </Stack>
      <Typography variant='h3' sx={{ mb: 5 }}>
        pretty chart here
      </Typography>
      <PaperWrap>
        <Typography hidden>FILTER ALL | {totalOfExtrinsics}</Typography>
        <span hidden>filters placeholder</span>
        <HistoryTable />
      </PaperWrap>
    </Container>
  );
};

export default HistoryPage;
