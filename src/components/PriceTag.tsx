import { Grid } from '@mui/material';
import PaidIcon from '@mui/icons-material/Paid';
import React, { FC } from 'react';
import CustomTooltip from './Tooltip';

type Props = {
  value: React.ReactNode;
}

const price = (value: React.ReactNode) => (
  <span className='ui--FormatBalance-value' style={{fontSize: 'inherit', fontWeight: '400', marginLeft: '0.5em'}}>
    {value ? value : <i>unavailable</i>}
  </span>
)

const PriceTag: FC<Props> = ({ value }) => {
  return (
    <Grid container sx={{width: 'inherit', scale: '85%'}}>
      <Grid item xs='auto' sx={{ display: { lg: 'block', xs: 'none' } }}>
        {price(value)}
      </Grid>
      <Grid item xs='auto' sx={{ display: { lg: 'none', xs: 'block' } }}>
        <CustomTooltip title={price(value)} sx={{alignSelf: 'end'}}><PaidIcon sx={{scale: '75%'}}/></CustomTooltip>
      </Grid>
    </Grid>
  );
};

export default PriceTag;
