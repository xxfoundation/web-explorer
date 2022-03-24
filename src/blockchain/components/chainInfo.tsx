import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { Data, Item } from './chainInfo.styles';

const data = {
  items: [
    { title: 'FINALIZED BLOCKS', value: '8,657,975' },
    { title: 'ACTIVE ERA', value: '568' },
    { title: 'TRANSFERS', value: '524,609' },
    { title: 'HOLDERS', value: '866,441' },
    { title: 'TOTAL ISSUANCE', value: '1.006B' },
    { title: 'NOMINATORS', value: '53/53' },
    { title: 'VALIDATORS', value: '874,609' },
    { title: 'INFLATION RATE', value: '7.86%' }
  ]
};

const ChainInfoCard = (title: string, value: string) => {
  return (
    <Grid item xs={6} sm={3} md={3} key={title}>
      <Item>
        <Typography variant='body2'>{title}</Typography>
        <Data>{value}</Data>
      </Item>
    </Grid>
  );
};

const chainInfo = () => {
  return (
    <Box className="blockchain-component-chainInfo">
      <Typography variant="h3" gutterBottom>
        Chain data
      </Typography>
      <Grid container spacing={{ xs: 1 }}>
        {data.items.map(({ title, value }) => {
          const [statedTitle] = React.useState(title);
          const [statedValue] = React.useState(value);
          return ChainInfoCard(statedTitle, statedValue);
        })}
      </Grid>
    </Box>
  );
};

export default chainInfo;
