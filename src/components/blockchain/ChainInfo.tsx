import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { BN } from '@polkadot/util';
import { camelCase } from 'lodash';

import { LISTEN_FOR_ERA_METRICS } from '../../schemas/chaindata.schema';
import { ChainInfoLink, Data, Item } from './ChainInfo.styles';
import { InfoOutlined } from '@mui/icons-material';
import FormatBalance from '../FormatBalance';
import { EraMetrics, Metric } from './types';
import { EconomicsSubscription, LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';
import Error from '../Error';
import { CustomTooltip } from '../Tooltip';

const ChainInfoCard: FC<{
  title: string;
  tooltip?: string;
  value: string | BN | React.ReactNode;
  path?: string;
}> = ({ path, title, tooltip, value }) => {
  return (
    <Grid item xs={6} sm={3} md={3}>
      <Item sx={{ position: 'relative' }}>
        {tooltip && (
          <CustomTooltip title={tooltip}>
            <InfoOutlined
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2 }}
            />
          </CustomTooltip>
        )}
        {path && <ChainInfoLink style={{ zIndex: 1 }} to={path} />}
        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
          <Typography variant='body4'>{title}</Typography>
          <Data>{value === undefined ? <Skeleton /> : value}</Data>
        </div>
      </Item>
    </Grid>
  );
};

const processMetrics = (data?: Metric[]) =>
  (data ?? []).reduce(
    (acc, { title, value }) => ({
      ...acc,
      [camelCase(title)]: value
    }),
    {} as Record<string, string>
  );

const ChainInfo = () => {
  const metricsSubscription = useSubscription<EraMetrics>(LISTEN_FOR_ERA_METRICS);
  const economicsQuery = useQuery<EconomicsSubscription>(LISTEN_FOR_ECONOMICS);
  const data = useMemo(
    () => processMetrics(metricsSubscription.data?.metrics),
    [metricsSubscription.data?.metrics]
  );

  const {
    accounts,
    activeEra,
    activeValidatorCount,
    blocks,
    nominatorCount,
    transfers,
    validatorSet
  } = data;
  const { inflationRate, totalIssuance } = economicsQuery.data?.economics[0] ?? {};

  if (metricsSubscription.error || economicsQuery.error) {
    return <Error type='data-unavailable' />;
  }

  return (
    <Box className='blockchain-component-chainInfo' mb={7}>
      <Typography variant='h3' gutterBottom>
        Chain data
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <ChainInfoCard title='Finalized Blocks' value={blocks} path='/blocks' />
        <ChainInfoCard title='Active Era' value={activeEra} />
        <ChainInfoCard title='Transfers' value={transfers} path='/transfers' />
        <ChainInfoCard title='Account Holders' value={accounts} path='/accounts' />
        <ChainInfoCard
          title='Total Issuance'
          tooltip={
            'Defined by the Total Supply minus the xx issued as an ERC1404 and not claimed yet (Other > Claims).'
          }
          value={totalIssuance && <FormatBalance value={totalIssuance} />}
        />
        <ChainInfoCard title='Nominators' value={nominatorCount} />
        <ChainInfoCard
          title='Validators'
          path='/staking'
          value={activeValidatorCount && validatorSet && `${activeValidatorCount}/${validatorSet}`}
        />
        <ChainInfoCard
          title='Inflation Rate'
          tooltip={
            'Defined by the annual percentage increase of the circulating supply given by the distribution of staking reward.'
          }
          value={inflationRate && `${inflationRate}%`}
        />
      </Grid>
    </Box>
  );
};

export default ChainInfo;
