import React from 'react';
import {  Container, Typography } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import SimpleStaker from './SimpleStaker';

const Staking: React.FC = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' sx={{ pb: 5}}>Staking Simple</Typography>
      <SimpleStaker />
    </Container>
  )
}

export default Staking;