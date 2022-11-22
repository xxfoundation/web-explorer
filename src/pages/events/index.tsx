import { Container, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import EventsTable from './EventsTable';

const EventsHistory = () => {
  const { t } = useTranslation();

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography sx={{ mb: 5 }} variant='h1'>
        {t('Events')}
      </Typography>
      <PaperStyled>
        <EventsTable />
      </PaperStyled>
    </Container>
  );
};

export default EventsHistory;
