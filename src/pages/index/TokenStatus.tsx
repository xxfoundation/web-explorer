import type { WithChildren } from '../../types';

import { styled, Box, Grid, Typography, Skeleton } from '@mui/material';
import React, { FC } from 'react';
import { StakingSupplyDonutChart, TotalIssuanceDonutChart } from '../../components/charts';
import PaperWrap from '../../components/Paper/PaperWrap.styled';
import AspectBox from '../../components/AspectBox';
import { ChainInfoLink, Data, Item } from '../../components/blockchain/ChainInfo.styles';
import CustomTooltip from '../../components/Tooltip';
import { InfoOutlined } from '@mui/icons-material';
import { useQuery } from '@apollo/client';
import { GetEconomicsMetrics, GET_ECONOMICS_METRICS } from '../../schemas/chaindata.schema';
import FormatBalance from '../../components/FormatBalance';

const ChartWrapContainer = styled(PaperWrap)(({ theme }) => ({
  minHeight: '10rem',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));

const TokenInfoCard: FC<{
  title: string;
  tooltip?: string;
  value?: React.ReactNode;
  path?: string;
}> = ({ path, title, tooltip, value }) => {
  return (
    <Grid item xs={8} sm={4} md={2} lg={2}>
      <Item sx={{ position: 'relative', p: 2 }}> 
        {tooltip && (
          <CustomTooltip title={tooltip}>
            <InfoOutlined
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2 }}
            />
          </CustomTooltip>
        )}
        {path && <ChainInfoLink style={{ zIndex: 1 }} to={path} />}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Typography variant='body4'>{title}</Typography>
          <Data>{value === undefined ? <Skeleton /> : value}</Data>
        </div>
      </Item>
    </Grid>
  );
};

const ChartWrap: FC<WithChildren> = ({ children }) => (
  <ChartWrapContainer>
    <AspectBox ratio={2 / 1}>{children}</AspectBox>
  </ChartWrapContainer>
);

const TokenStatus = () => {
  const economicsQuery = useQuery<GetEconomicsMetrics>(GET_ECONOMICS_METRICS);
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant='h3' gutterBottom>
        Token Status
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={12} md={12}>
          <Grid container columns={8} spacing={{ xs: 1, sm: 2 }}>
            <TokenInfoCard
              title='Market Cap'
              tooltip={
                ''
              }
              value={economicsQuery.data?.economics[0].circulating && <FormatBalance value={economicsQuery.data?.economics[0].circulating} price withTooltip={false}/>}
            />
            <TokenInfoCard
              title='Staked'
              tooltip={
                'Defined by the Annual Growth Rate of the circulating supply given by the distribution of staking rewards.'
              }
              value={economicsQuery.data?.economics[0].staked && <FormatBalance value={economicsQuery.data?.economics[0].staked} price withTooltip={false}/>}
            />
            <TokenInfoCard
              title='Circulating AGR'
              tooltip={
                'Defined by the Annual Growth Rate of the circulating supply given by the distribution of staking rewards.'
              }
              value={economicsQuery.data?.economics[0].inflationRate && `${economicsQuery.data?.economics[0].inflationRate}%`}
            />
            <TokenInfoCard
              title='Total Issuance'
              tooltip={
                'Defined by the Total Supply minus the xx issued as an ERC1404 and not claimed yet (Other > Claims).'
              }
              value={economicsQuery.data?.economics[0].totalIssuance && <FormatBalance value={economicsQuery.data?.economics[0].totalIssuance} price withTooltip={false} />}
            />
          </Grid>
        </Grid>
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
