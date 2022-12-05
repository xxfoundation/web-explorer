import type { WithChildren } from '../../types';

import { styled, Box, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import { StakingSupplyDonutChart, TotalIssuanceDonutChart } from '../../components/charts';
import PaperWrap from '../../components/Paper/PaperWrap.styled';
import AspectBox from '../../components/AspectBox';
import { useTranslation } from 'react-i18next';

const ChartWrapContainer = styled(PaperWrap)(({ theme }) => ({
  minHeight: '10rem',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));

const ChartWrap: FC<WithChildren> = ({ children }) => (
  <ChartWrapContainer>
    <AspectBox ratio={2 / 1}>{children}</AspectBox>
  </ChartWrapContainer>
);

const TokenStatus = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h3' gutterBottom>
        {t('Token Status')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <ChartWrap>
            <TotalIssuanceDonutChart />
          </ChartWrap>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <ChartWrap>
            <StakingSupplyDonutChart />
          </ChartWrap>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TokenStatus;
