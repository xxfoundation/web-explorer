import { Box, Grid,  Skeleton, Typography } from '@mui/material';
import { useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { BN } from '@polkadot/util';
import { camelCase } from 'lodash';

import { LISTEN_FOR_ERA_METRICS } from '../../schemas/chaindata.schema';
import { ChainInfoLink, Data, Item } from './ChainInfo.styles';
import FormatBalance from '../FormatBalance';
import { EraMetrics, Metric } from './types';
import { EconomicsSubscription, LISTEN_FOR_ECONOMICS } from '../../schemas/economics.schema';
import Error from '../Error';

const ChainInfoCard: FC<{ title: string; value: string | BN | React.ReactNode, path?: string }> = ({
  path,
  title,
  value
}) => {
  return (
    <Grid item xs={6} sm={3} md={3}>
      <Item sx={{ position: 'relative' }}>
        {path && (
          <ChainInfoLink to={path} />
        )}
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
  const economicsSubscription = useSubscription<EconomicsSubscription>(LISTEN_FOR_ECONOMICS);
  const data = useMemo(
    () => processMetrics(metricsSubscription.data?.metrics),
    [metricsSubscription.data?.metrics]
  );

  const {
    accounts,
    activeValidatorCount,
    blocks,
    currentEra,
    nominatorCount,
    transfers,
    validatorSet
  } = data;

  const { inflationRate, totalIssuance } = economicsSubscription.data?.economics[0] ?? {};

  if (metricsSubscription.error || economicsSubscription.error) {
    return <Error type='data-unavailable' />;
  }

  return (
    <Box className='blockchain-component-chainInfo' mb={7}>
      <Typography variant='h3' gutterBottom>
        Chain data
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <ChainInfoCard title='Finalized Blocks' value={blocks} path='/blocks' />
        <ChainInfoCard title='Active Era' value={currentEra} />
        <ChainInfoCard title='Transfers' value={transfers} path='/transfers' />
        <ChainInfoCard title='Holders' value={accounts}  path='/accounts'/>
        <ChainInfoCard
          title='Total Issuance'
          value={totalIssuance && <FormatBalance value={totalIssuance} />}
        />
        <ChainInfoCard title='Nominators' value={nominatorCount} />
        <ChainInfoCard
          title='Validators'
          path='/staking'
          value={activeValidatorCount && validatorSet && `${activeValidatorCount}/${validatorSet}`}
        />
        <ChainInfoCard title='Inflation Rate' value={inflationRate && `${inflationRate}%`} />
      </Grid>
    </Box>
  );
};

export default ChainInfo;
