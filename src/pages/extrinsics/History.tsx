import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { LoadingButton } from '@mui/lab';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import BarChart from '../../components/charts/BarChart';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import HistoryTable from './HistoryTable';
import VerticalDivider from '../../components/VerticalDivider';

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
      <Box sx={{ mb: 5 }}>
        <PaperWrap>
        <Grid container>
          <VerticalDivider>
            2022.02.05
          </VerticalDivider>
          <Grid item>
            <BarChart />
          </Grid>
          <VerticalDivider>
            2022.02.05
          </VerticalDivider>
          <Grid item >
            <BarChart />
          </Grid>
        </Grid>
        </PaperWrap>
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
