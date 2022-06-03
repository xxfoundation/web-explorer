import { Box, Button, Container, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { theme } from '../../themes/default';
import HistoryChart from './HistoryChart';
import HistoryTable from './HistoryTable';

const HistoryPage = () => {
  const [totalOfExtrinsics, setTotalOfExtrinsics] = useState<number>();

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
          <HistoryChart />
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
