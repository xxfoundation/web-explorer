import { Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import BlocksTable from './BlocksTable';

const PageHeader = () => {
  const { t } = useTranslation();

  return (
    <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'} sx={{ mb: 5 }}>
      <Typography variant='h1'>{t('Blocks')}</Typography>
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
