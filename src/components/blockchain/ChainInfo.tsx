import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { LISTEN_FOR_ERA_METRICS } from '../../schemas/chaindata.schema';
import { Data, Item, Wrap } from './ChainInfo.styles';
import FormatBalance from '../FormatBalance';
import { ChainData, EraMetrics, Metric } from './types';
import { BN } from '@polkadot/util';

const chainData: ChainData[] = [
  {
    header: 'Finalized Blocks',
    name: 'blocks',
    value: <Skeleton />
  },
  {
    header: 'Active Era',
    name: 'current_era',
    value: <Skeleton />
  },
  {
    header: 'Transfers',
    name: 'transfers',
    value: <Skeleton />
  },
  {
    header: 'Holders',
    name: 'accounts',
    value: <Skeleton />
  },
  {
    header: 'Total Issuance',
    name: 'total_issuance',
    value: <Skeleton />
  },
  {
    header: 'Nominators',
    name: 'nominator_count',
    value: <Skeleton />
  },
  {
    header: 'Validators',
    name: 'active_validator_count',
    value: <Skeleton />
  },
  {
    header: 'Inflation Rate',
    name: 'inflation_rate',
    value: <Skeleton />
  }
];

const ChainInfoCard: FC<{ title: string; value: string | BN | React.ReactNode }> = ({
  title,
  value
}) => {
  return (
    <Grid item xs={6} sm={3} md={3}>
      <Item>
        <Typography variant='body4'>{title}</Typography>
        <Data>{value}</Data>
      </Item>
    </Grid>
  );
};

const processData = (loading: boolean, data: Metric[] | undefined): JSX.Element[] => {
  let eraMetrics = chainData;
  if (data !== undefined && !loading) {
    const validatorSet = data.find(({ title }) => title === 'validator_set')?.value || '0';
    eraMetrics = chainData.map((item) => {
      const aux = data.find(({ title }) => title === item.name);
      if (aux) {
        if (item.header == 'Total Issuance') {
          return {
            ...item,
            value: <FormatBalance value={aux.value.toString()} />
          };
        }
        if (item.header == 'Validators') {
          return { ...item, value: `${aux.value}/${validatorSet}` };
        }
        if (item.header == 'Inflation Rate') {
          return { ...item, value: `${aux.value}%` };
        }
        return { ...item, value: aux.value };
      }
      return item;
    });
  }
  return eraMetrics.map(({ header, value }, index) => (
    <ChainInfoCard title={header} value={value} key={index} />
  ));
};

const ChainInfo = () => {
  const { data, loading } = useSubscription<EraMetrics>(LISTEN_FOR_ERA_METRICS);
  const content = useMemo(() => {
    return processData(loading, data?.metrics);
  }, [data, loading]);
  return (
    <Box className='blockchain-component-chainInfo' mb={7}>
      <Typography variant='h3' gutterBottom>
        Chain data
      </Typography>
      <Wrap container spacing={{ xs: 1 }}>
        {content}
      </Wrap>
    </Box>
  );
};

export default ChainInfo;
