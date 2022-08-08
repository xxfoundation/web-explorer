import React from 'react';
import { Container, Typography } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import SimpleStaker from './SimpleStaker';
import Api from '../../../components/Api';

const Staking: React.FC = () => (
  <Api>
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' sx={{ pb: 5}}>Simple Staker</Typography>
      <SimpleStaker />
    </Container>
  </Api>
);

export default Staking;
