import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack, styled, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import FormatBalance from '../FormatBalance';
import type { CustomData, CustomPointOptions } from './types';

const LegendTypographyHeader = styled(Typography)(({ theme: th }) => {
  return {
    fontWeight: 700,
    fontSize: 14,
    color: th.palette.grey[800],
    textTransform: 'uppercase',
    letterSpacing: '.5px'
  };
});

export const LegendTypographySubHeaders = styled(Typography)(({ theme: th }) => {
  return {
    fontSize: 12,
    fontWeight: 500,
    color: th.palette.text.primary,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  };
});

const LegendTypographyBody = styled(Typography)(({}) => {
  return {
    fontWeight: 400,
    fontSize: 12,
    color: '#7A7A7A',
    textAlign: 'left'
  };
});

const SeriesInfoLine: FC<CustomData> = (props) => {
  const LegendEl = useMemo(
    () => (props.title ? LegendTypographySubHeaders : LegendTypographyBody),
    [props.title]
  );
  const margin = useMemo(() => {
    return {
      top: props.title ? 2 : 0.1,
      bottom: props.title ? 0.5 : 0.1
    };
  }, [props.title]);
  return (
    <Grid item container xs={12}>
      <Grid item xs={5} marginTop={margin.top} marginBottom={margin.bottom}>
        <LegendEl>{props.name}</LegendEl>
      </Grid>
      <Grid item xs={5} marginTop={margin.top}>
        <LegendEl>
          <FormatBalance value={props.value.toString()} />
        </LegendEl>
      </Grid>
      <Grid item xs={2} marginTop={margin.top}>
        <LegendEl>{`${props.percentage}%`}</LegendEl>
      </Grid>
    </Grid>
  );
};

const SeriesDetailedInfo: FC<
  CustomPointOptions & {
    onClose?: () => void;
  }
> = ({ custom, name, onClose }) => {
  const content = useMemo(() => {
    return custom.data?.map((item) => {
      return <SeriesInfoLine {...item} key={item.id} />;
    });
  }, [custom.data]);

  return (
    <>
      <Stack
        fontSize={'small'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <LegendTypographyHeader>{name}</LegendTypographyHeader>
        {onClose && (
          <IconButton aria-label='close-popup' sx={{ mt: '-35px', mr: '-22px' }} onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        )}
      </Stack>
      <Stack direction={'column'}>
        <Grid container>{content}</Grid>
      </Stack>
    </>
  );
};

export default SeriesDetailedInfo;
