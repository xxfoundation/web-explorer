import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Box, Container, Stack, Typography } from '@mui/material';
import BarChart from '../../components/charts/BarChart';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import HistoryTable from './HistoryTable';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';

const extrinsinctCountIn72Hours = 4320;
const HOUR = 60 * 60 * 1000;

function buildExtrinsicsTimestamps() {
  const date = dayjs();
  const timestamps = Array.from(Array(extrinsinctCountIn72Hours).keys())
    .map(() => Math.floor((date.unix() * 1000) - (Math.random() * (48 * HOUR))))
  timestamps.sort();
  return timestamps;
}

const HistoryPage = () => {
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
        <Typography variant='h1'>
          Extrinsic History
        </Typography>
        <DownloadDataButton onClick={() => {}}>Download data</DownloadDataButton>
      </Stack>
      <Box sx={{ mb: 5 }}>
        <PaperStyled >
          <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
            <BarChart timestamps={timestamps} />
          </Box>
        </PaperStyled>
      </Box>
      <PaperWrap>
        <Typography hidden>FILTER ALL | {totalOfExtrinsics}</Typography>
        <span hidden>filters placeholder</span>
        <HistoryTable />
      </PaperWrap>
    </Container>
  );
};

export default HistoryPage;
