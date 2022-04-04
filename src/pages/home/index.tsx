import { Container } from '@mui/material';
import React from 'react';
import ChainInfo from '../../components/blockchain/ChainInfo';
import Breadcrumb from '../../components/Breadcrumbs';
import TokenStatus from './TokenStatus';

const Blockchain = () => {
  return (
    <>
      <Breadcrumb />
      <Container sx={{ my: 5 }}>
        <ChainInfo />
        <TokenStatus />
      </Container>
    </>
  );
};

export default Blockchain;
