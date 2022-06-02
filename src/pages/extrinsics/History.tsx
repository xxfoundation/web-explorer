import { Box, Button, Container, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
// import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import BarChart from '../../components/charts/BarChart/BarChart';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { theme } from '../../themes/default';
import HistoryTable from './HistoryTable';

const extrinsinctCountIn72Hours = 4320;
const HOUR = 60 * 60 * 1000;

function buildExtrinsicsTimestamps() {
  const date = dayjs();
  const timestamps = Array.from(Array(extrinsinctCountIn72Hours).keys()).map(() =>
    Math.floor(date.unix() * 1000 - Math.random() * (48 * HOUR))
  );
  timestamps.sort();
  return timestamps;
}

const HistoryPage = () => {
  const [totalOfExtrinsics, setTotalOfExtrinsics] = useState<number>();
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
        <Typography variant='h1'>Extrinsic History</Typography>
        {/* <DownloadDataButton onClick={() => {}} disabled>
          Download data
        </DownloadDataButton> */}
      </Stack>
      <Box sx={{ mb: 5 }}>
        <PaperStyled>
          <Box style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth' }}>
            <BarChart series={{ timestamps, label: 'Extrinsic' }} />
          </Box>
        </PaperStyled>
      </Box>
      <PaperStyled>
        {totalOfExtrinsics && (
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            marginBottom='18px'
            fontSize={'16px'}
            fontWeight={700}
            color={theme.palette.grey[600]}
          >
            <Button color='inherit' disabled>
              Filter all
            </Button>
            <Typography>|</Typography>
            <Tooltip title='the total of extrinsics' placement='top' arrow>
              <Typography> {totalOfExtrinsics}</Typography>
            </Tooltip>
          </Stack>
        )}
        <span hidden>filters placeholder</span>
        <HistoryTable setTotalOfExtrinsics={setTotalOfExtrinsics} />
      </PaperStyled>
    </Container>
  );
};

export default HistoryPage;
