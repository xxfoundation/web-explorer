import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import SimpleStaker from './SimpleStaker';
import useApi from '../../../hooks/useApi';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';

const Staking: React.FC = () => {
  const { error, isReady } = useApi();

  if (error) {
    return (
      <Box sx={{ p: 5 }}>
        <Error variant='body1' sx={{ fontSize: 24, pb: 5 }} message='Service currently unavailable' />
      </Box>
    );
  }

  if (!isReady) {
    return (
      <Box sx={{ p: 5, py: 20 }}>
        <Loading />
        <Typography variant='body1' sx={{ textAlign: 'center' }}>
          Connecting to the API, please wait.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Typography variant='h1' sx={{ pb: 5}}>Staking Simple</Typography>
      <SimpleStaker />
    </Container>
  )
}

export default Staking;
