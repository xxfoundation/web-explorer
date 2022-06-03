import { Container, Typography } from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import HistoryTable from './HistoryTable';

const EventsHistory = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography sx={{ mb: 5 }} variant='h1'>
        Events
      </Typography>
      <PaperStyled>
        <HistoryTable />
      </PaperStyled>
    </Container>
  );
};

export default EventsHistory;
