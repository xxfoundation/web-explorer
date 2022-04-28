import React from 'react';
import {  Container,  Stack, Typography } from '@mui/material';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import StakingMetrics from './StakingMetrics';
import ValidatorTable from './ValidatorTable';

const Staking: React.FC = () => {
  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' sx={{ pb: 5}}>Staking</Typography>
      <Stack spacing={3}>
        <PaperWrapStyled>
          <StakingMetrics />
        </PaperWrapStyled>
        <PaperWrapStyled>
          <ValidatorTable />
        </PaperWrapStyled>
      </Stack>
    </Container>
  )
}

export default Staking;