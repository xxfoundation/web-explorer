import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack, styled, Typography } from '@mui/material';
import { default as React, FC, useMemo } from 'react';
import { CustomData, CustomPointOptions } from '../blockchain/types';
import FormatBalance from '../FormatBalance';

const LegendTypographyHeader = styled(Typography)(({ theme: th }) => {
  return {
    fontWeight: 700,
    fontSize: 14,
    color: th.palette.grey[800],
    textTransform: 'uppercase',
    letterSpacing: '.5px'
  };
});

const LegendTypographySubHeaders = styled(Typography)(({ theme: th }) => {
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
  return (
    <>
      <Grid item xs={7}>
        <LegendEl>{props.name}</LegendEl>
      </Grid>
      <Grid item xs={3}>
        <LegendEl>
          <FormatBalance value={`${props.value}`} precision={3} />
        </LegendEl>
      </Grid>
      <Grid item xs={2}>
        <LegendEl>{`${props.percentage}%`}</LegendEl>
      </Grid>
    </>
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
        <LegendTypographyHeader marginBottom={1}>{name}</LegendTypographyHeader>
        {onClose && (
          <IconButton aria-label='close-popup' sx={{ mt: '-35px', mr: '-20px' }} onClick={onClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        )}
      </Stack>
      <Stack direction={'column'} spacing={1}>
        <Grid container marginY={1}>
          {content}
        </Grid>
      </Stack>
    </>
  );
};

export default SeriesDetailedInfo;
