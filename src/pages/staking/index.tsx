import React from 'react';
import { Button, Container, Stack, Typography } from '@mui/material';
import PaperWrap from '../../components/Paper/PaperWrap.styled';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import StakingMetrics from './StakingMetrics';
import ValidatorTable from './ValidatorTable';
import { useToggle } from '../../hooks';
import StakingCharts from './StakingCharts';

const Staking: React.FC = () => {
  const [expandStats, stats] = useToggle();

  return (
    <Container sx={{ my: 5 }}>
      <Breadcrumb />
      <Stack direction='row' sx={{ mb: 5 }} alignItems='flex-end' justifyContent='space-between'>
        <Typography variant='h1'>Staking</Typography>
        <Button onClick={stats.toggle} endIcon={stats.icon}>
          Show Staking Charts
        </Button>
      </Stack>
      <Stack spacing={3}>
        {expandStats && <StakingCharts />}
        <PaperWrap>
          <StakingMetrics />
        </PaperWrap>
        <PaperWrap>
          <ValidatorTable />
        </PaperWrap>
      </Stack>
    </Container>
  );
};

export default Staking;
