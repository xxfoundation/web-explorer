import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import { default as React, FC, useMemo } from 'react';
import FormatBalance from '../FormatBalance';
import { LegendTypographyHeader, LegendTypographySubHeaders  } from '../typographies';

const SeriesInfoLine: FC<any> = (props) => {
  const LegendEl = useMemo(
    () => (props.title ? LegendTypographySubHeaders : Typography),
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
          <FormatBalance value={`${props.value}`} precision={3} />
        </LegendEl>
      </Grid>
      <Grid item xs={2} marginTop={margin.top}>
        <LegendEl>{`${props.percentage}%`}</LegendEl>
      </Grid>
    </Grid>
  );
};

const SeriesDetailedInfo: FC<
  any & {
    onClose?: () => void;
  }
> = ({ custom, name, onClose }) => {
  const content = useMemo(() => {
    return custom.data?.map((item: any) => {
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
