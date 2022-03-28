import { Container } from '@mui/material';
import React from 'react';
import ChainInfo from '../../components/blockchain/ChainInfo';
import TokenStatus from './TokenStatus';

const blockchain = () => {
  return (
    <Container sx={{ my: 5 }}>
      <ChainInfo />
      <TokenStatus />
    </Container>
  );
};

export default blockchain;
