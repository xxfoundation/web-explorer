import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Stack, Typography } from '@mui/material';
import BN from 'bn.js';
import { PointOptionsObject } from 'highcharts';
import React, { FC } from 'react';
import { theme } from '../../themes/default';
import { CustomPointOptions, OthersStatePopup, VestingStatePopup } from '../blockchain/types';
import FormatBalance from '../FormatBalance';

const LegendItems: FC<{ data: PointOptionsObject[] }> = ({ data }) => {
  return (
    <Stack direction={'column'} marginY={2}>
      {data.map(({ color, name, y }) => {
        return (
          <Stack direction={'row'} spacing={1} alignItems='center' key={name}>
            <SquareRoundedIcon
              sx={{ color: color as string, borderRadius: 1000 }}
              fontSize='small'
            />
            <Typography
              sx={{ fontSize: '12px', fontWeight: 400, color: '#7A7A7A' }}
            >{`${y}% ${name}`}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

const ChartsLegends: FC<{
  legends: CustomPointOptions<VestingStatePopup | OthersStatePopup>[];
  name: string;
  value: string | BN;
}> = ({ legends, name, value }) => {
  return (
    <>
      <Typography
        fontSize={12}
        fontWeight={500}
        textTransform={'uppercase'}
        color={theme.palette.grey[400]}
      >
        {name}
      </Typography>
      <Typography fontSize={20} fontWeight={400} color={theme.palette.grey[800]}>
        <FormatBalance value={value} />
      </Typography>
      <LegendItems data={legends} />
    </>
  );
};

export default ChartsLegends;
