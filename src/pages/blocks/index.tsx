import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import BlocksTable from './BlocksTable';

const PageHeader = () => {
  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} sx={{ mb: 5 }}>
      <Typography cy-id='h1' variant='h1'>Blocks</Typography>
    </Stack>
  );
};

const BlocksPage = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <PageHeader />
      <PaperStyled>
        <BlocksTable />
      </PaperStyled>
    </Container>
  );
};

export default BlocksPage;
