import type { CustomPointOptions } from './types';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import { Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { theme } from '../../themes/default';
import FormatBalance from '../FormatBalance';
import SeriesDetailedInfo, { LegendTypographySubHeaders } from './ChartSeriesDetailsInfo';
import { HtmlTooltip } from './ChartsPopover';

const LegendItem: FC<CustomPointOptions> = (props) => {
  const title = useMemo(() => {
    return <SeriesDetailedInfo custom={props.custom} name={props.name} />;
  }, [props.custom, props.name]);
  return (
    <Stack direction={'row'} spacing={1} alignItems='center' sx={{ marginY: '4px' }}>
      <HtmlTooltip title={title}>
        <SquareRoundedIcon
          sx={{ color: props.color as string, borderRadius: 1000 }}
          fontSize='small'
        />
      </HtmlTooltip>
      <Typography
        sx={{ fontSize: '12px', fontWeight: 400, color: '#7A7A7A' }}
      >{`${props.y}% ${props.name}`}</Typography>
    </Stack>
  );
};

const LegendItems: FC<{ data: CustomPointOptions[] }> = ({ data }) => {
  return (
    <Stack direction={'column'} marginY={3}>
      {data.map((props) => {
        return <LegendItem key={props.name} {...props} />;
      })}
    </Stack>
  );
};

const ChartsLegends: FC<{
  legends: CustomPointOptions[];
  name: string;
  value: string | number;
}> = ({ legends, name, value }) => {
  return (
    <>
      <LegendTypographySubHeaders>{name}</LegendTypographySubHeaders>
      <Typography fontSize={20} fontWeight={400} color={theme.palette.grey[800]}>
        <FormatBalance value={value} />
      </Typography>
      <LegendItems data={legends} />
    </>
  );
};

export default ChartsLegends;
