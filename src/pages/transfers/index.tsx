import { Box, Container, Stack, Tooltip, Typography } from '@mui/material';
import FunctionsIcon from '@mui/icons-material/Functions';
import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import { theme } from '../../themes/default';
import TransfersBarChart from './TransfersBarChart';
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
          <TransfersBarChart />
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
            <div style={{ margin: '0 0 1em 0', display: 'inline-flex' }}>
              <FunctionsIcon />
              <Tooltip title='Total Number of Transfer' placement='top' arrow>
                <Typography>= {totalOfTransfers}</Typography>
              </Tooltip>
            </div>
          </Stack>
        )}
        <span hidden>filters placeholder</span>
        <TransferTable setCount={setTotalOfTransfers} />
      </PaperStyled>
    </Container>
  );
};

export default TransfersPage;
