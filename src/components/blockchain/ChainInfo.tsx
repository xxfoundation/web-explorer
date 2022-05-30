import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useSubscription } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { LISTEN_FOR_TOTALS } from '../../schemas/summary.schema';
import { Data, Item, Wrap } from './ChainInfo.styles';
import FormatBalance from '../FormatBalance';
import { Summary, Totals, Placeholder } from './types';

const placeholder: Placeholder[] = [
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

const ChainInfoCard: FC<{ title: string; value: string | React.ReactNode }> = ({
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

const processTotals = (loading: boolean, data: Totals[] | undefined): JSX.Element[] => {
  let summary = placeholder;
  if (data !== undefined && !loading) {
    const validatorSet = data.find(({ title }) => title === 'validator_set') || 0;
    summary = placeholder.map((item) => {
      const aux = data.find(({ title }) => title === item.name);
      if (aux) {
        if (item.header == 'Total Issuance') {
          return { ...item, value: <FormatBalance value={aux.value as string} /> };
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
  return summary.map(({ header, value }, index) => (
    <ChainInfoCard title={header} value={value} key={index} />
  ));
};

const ChainInfo = () => {
  const { data, loading } = useSubscription<Summary>(LISTEN_FOR_TOTALS);
  const content = useMemo(() => {
    return processTotals(loading, data?.totals);
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
