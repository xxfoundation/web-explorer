import { Container } from '@mui/material';
import React from 'react';
import ChainInfo from '../../components/blockchain/ChainInfo';
import Breadcrumb from '../../components/Breadcrumbs';
import TokenStatus from './TokenStatus';

const Blockchain = () => {
  return (
    <Container sx={{ mt: 5, mb: 12 }}>
      <Breadcrumb />
      <ChainInfo />
      <TokenStatus />
    </Container>
  );
};

export default Blockchain;
