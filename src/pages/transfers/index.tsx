import { Box, Container, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import BarChart from '../../components/charts/BarChart/BarChart';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import TransferTable from './TransfersTable';

const extrinsincCountIn72Hours = 4320;
const HOUR = 60 * 60 * 1000;

function buildExtrinsicsTimestamps () {
  const date = dayjs();
  const timestamps = Array.from(Array(extrinsincCountIn72Hours).keys())
    .map(() => Math.floor((date.unix() * 1000) - (Math.random() * (48 * HOUR))))
  timestamps.sort();
  return timestamps;
}

const TransfersPage = () => {
  const totalOfExtrinsics = 32987;
  const timestamps = useMemo(() => buildExtrinsicsTimestamps(), []);

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
        <PaperStyled>
          <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
            <BarChart hoverLabel={'transfer'} timestamps={timestamps} yAxis={{ title: 'Transfers' }} />
          </Box>
        </PaperStyled>
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
