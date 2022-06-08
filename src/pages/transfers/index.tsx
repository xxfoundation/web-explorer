import { Box, Button, Container, Stack, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { theme } from '../../themes/default';
import TranfersChart from './TransfersChart';
import TransferTable from './TransfersTable';

const TransfersPage = () => {
  const [totalOfTransfers, setTotalOfTransfers] = useState<number>();
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
        {/* <DownloadDataButton onClick={() => {}}>Download data</DownloadDataButton> */}
      </Stack>
      <Box sx={{ mb: 5 }}>
        <PaperStyled>
          <TranfersChart />
        </PaperStyled>
      </Box>
      <PaperStyled>
        {!!totalOfTransfers && (
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
            <Tooltip title='the total of transfer' placement='top' arrow>
              <Typography>{totalOfTransfers}</Typography>
            </Tooltip>
          </Stack>
        )}
        <span hidden>filters placeholder</span>
        <TransferTable setCount={setTotalOfTransfers} />
      </PaperStyled>
    </Container>
  );
};

export default TransfersPage;
