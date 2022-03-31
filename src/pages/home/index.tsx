import { Container } from '@mui/material';
import React from 'react';
import ChainInfo from '../../components/blockchain/ChainInfo';
import TokenStatus from './TokenStatus';

const Blockchain = () => {
  return (
    <Container sx={{ mt: 5, mb: 12 }}>
      <ChainInfo />
      <TokenStatus />
    </Container>
  );
};

export default Blockchain;
