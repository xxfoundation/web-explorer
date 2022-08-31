import { Container } from '@mui/material';
import React from 'react';
import ChainInfo from '../../components/blockchain/ChainInfo';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TokenStatus from './TokenStatus';
import LatestInfo from './LatestInfo';
import WhaleAlert from './WhaleAlert';

const Blockchain = () => {
  return (
    <Container sx={{ mt: 1, mb: 12 }}>
      <Breadcrumb />
      <ChainInfo />
      <TokenStatus />
      <LatestInfo />
      <WhaleAlert />
    </Container>
  );
};

export default Blockchain;
