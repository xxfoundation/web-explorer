import { Container } from '@mui/material';
import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import HistoryTable from './HistoryTable';

const EventsHistory = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <PaperStyled>
        <HistoryTable />
      </PaperStyled>
    </Container>
  );
};

export default EventsHistory;
