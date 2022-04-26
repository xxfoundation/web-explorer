import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DownloadDataButton from '../../components/buttons/DownloadDataButton';
import { PaperWrap } from '../../components/Paper/PaperWrap';
import BlocksTable from './BlocksTable';

const PageHeader = () => {
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} sx={{ mb: 5 }}>
      <Typography variant='h1'>Blocks</Typography>
      <DownloadDataButton onClick={() => {}} disabled>
        Download data
      </DownloadDataButton>
    </Stack>
  );
};

const BlocksPage = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <PageHeader />
      <PaperWrap>
        <BlocksTable />
      </PaperWrap>
    </Container>
  );
};

export default BlocksPage;
