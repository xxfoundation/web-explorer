import React from 'react';
import {  Container,  Stack, Typography } from '@mui/material';
import PaperWrap from '../../components/Paper/PaperWrap.styled';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import StakingMetrics from './StakingMetrics';
import ValidatorTable from './ValidatorTable';

const Staking: React.FC = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' sx={{ pb: 5}}>Staking</Typography>
      <Stack spacing={3}>
        <PaperWrap>
          <StakingMetrics />
        </PaperWrap>
        <PaperWrap>
          <ValidatorTable />
        </PaperWrap>
      </Stack>
    </Container>
  )
}

export default Staking;