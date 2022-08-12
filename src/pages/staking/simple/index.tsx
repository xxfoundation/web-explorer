import React from 'react';
import { Container } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import SimpleStaker from './SimpleStaker';

const Staking: React.FC = () => (
  <Container sx={{ my: 5 }}>
    <Breadcrumb />
    <SimpleStaker />
  </Container>
);

export default Staking;
