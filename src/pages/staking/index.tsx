import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import PaperWrap from '../../components/Paper/PaperWrap.styled';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import StakingMetrics from './StakingMetrics';
import { useToggle } from '../../hooks';
import StakingCharts from './StakingCharts';
import NewValidatorTabs from './ValidatorTabs';

const Staking: React.FC = () => {
  const [expandStats, stats] = useToggle();

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack direction='row' sx={{ mb: 5 }} alignItems='flex-end' justifyContent='space-between'>
        <Typography cy-id='h1' variant='h1'>Staking</Typography>
        <Button cy-id='show-staking-charts' onClick={stats.toggle} endIcon={stats.icon}>
          Show Staking Charts
        </Button>
      </Stack>
      <Stack spacing={3}>
        {expandStats && <StakingCharts />}
        <PaperWrap>
          <StakingMetrics />
        </PaperWrap>
        <PaperWrap>
          <NewValidatorTabs />
        </PaperWrap>
      </Stack>
    </Container>
  );
};

export default Staking;
