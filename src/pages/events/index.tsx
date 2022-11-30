import { Container, Typography } from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import EventsTable from './EventsTable';

const EventsHistory = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography cy-id='h1' sx={{ mb: 5 }} variant='h1'>
        Events
      </Typography>
      <PaperStyled>
        <EventsTable />
      </PaperStyled>
    </Container>
  );
};

export default EventsHistory;
