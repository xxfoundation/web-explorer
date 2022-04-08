import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';
import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import HistoryTable from './HistoryTable';

const HistoryPage = () => {
  const totalOfExtrinsics = 32987;
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack justifyContent={'space-between'} direction={'row'} sx={{ mb: 5 }}>
        <Typography variant='h1'>Extrinsic History</Typography>
        <LoadingButton loading={false} startIcon={<FileDownloadIcon />}>
          Download data
        </LoadingButton>
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
