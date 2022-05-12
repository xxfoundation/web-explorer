import { Box, Container, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import PaperWrap from '../../components/Paper/PaperWrap.styled';
import BarChart from '../../components/charts/BarChart/BarChart';
import TransferTable from './TransfersTable';

const extrinsincCountIn72Hours = 4320;
const HOUR = 60 * 60 * 1000;

function buildTimestamps () {
  const date = dayjs();
  const timestamps = Array.from(Array(extrinsincCountIn72Hours).keys())
    .map(() => Math.floor((date.unix() * 1000) - (Math.random() * (48 * HOUR))))
  timestamps.sort();
  return timestamps;
}

const TransfersPage = () => {
  const totalOfExtrinsics = 32987;
  const timestamps = useMemo(() => buildTimestamps(), []);
  const timestampsB = useMemo(() => buildTimestamps(), []);

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        sx={{ mb: 5 }}
      >
        <Typography variant='h1'>Transfers</Typography>
        <DownloadDataButton onClick={() => {}}>Download data</DownloadDataButton>
      </Stack>
      <Box sx={{ mb: 5 }}>
        <PaperWrap>
          <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
            <BarChart series={[{ timestamps, label: 'xx' }, { timestamps: timestampsB, label: 'transfers' }]}  />
          </Box>
        </PaperWrap>
      </Box>
      <PaperWrap>
        <Typography hidden>FILTER ALL | {totalOfExtrinsics}</Typography>
        <span hidden>filters placeholder</span>
        <TransferTable />
      </PaperWrap>
    </Container>
  );
};

export default TransfersPage;
