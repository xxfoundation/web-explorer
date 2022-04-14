import {
  Grid,
  Popover,
  PopoverOrigin,
  PopoverProps,
  Stack,
  styled,
  SxProps,
  Theme,
  Typography
} from '@mui/material';
import { default as React, FC, useMemo } from 'react';
import { theme } from '../../themes/default';
import { CustomPointOptions, PercentageValues, VestingStatePopup } from '../blockchain/types';

type StakeableInfoProps = {
  name: string;
  values: PercentageValues;
};

type ChartClickModalProps = {
  data: CustomPointOptions<VestingStatePopup>;
} & PopoverProps;

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
    textAlign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  };
});

const StateVesting: FC<StakeableInfoProps> = ({ name, values: { foundation, team } }) => {
  return (
    <Grid container marginY={1}>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographySubHeaders>{name}</LegendTypographySubHeaders>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographySubHeaders>{team.value + foundation.value}</LegendTypographySubHeaders>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographySubHeaders>
            {team.percentage + foundation.percentage}
          </LegendTypographySubHeaders>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>team</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>{team.value}</LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{team.percentage}</LegendTypographyBody>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>foundation</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>{foundation.value}</LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{foundation.percentage}</LegendTypographyBody>
        </Grid>
      </Grid>
    </Grid>
  );
};

const originConfig: PopoverOrigin = {
  vertical: 'center',
  horizontal: 'left'
};

const popooverProps: SxProps<Theme> = {
  boxShadow: theme.boxShadow,
  border: theme.borders?.light,
  borderRadius: '33px',
  padding: '40px',
  [theme.breakpoints.down('sm')]: {
    padding: '30px'
  },
  maxWidth: '318px'
};

const PiechartPopover: FC<ChartClickModalProps> = ({ data, ...props }) => {
  const stateData = useMemo(() => {
    return (
      <>
        <StateVesting name='stakeable' values={data.custom.stakeable} />
        <StateVesting name='unstakeable' values={data.custom.unstakeable} />
      </>
    );
  }, [data.custom]);
  return (
    <Popover
      {...props}
      anchorOrigin={originConfig}
      transformOrigin={originConfig}
      PaperProps={{ sx: popooverProps }}
    >
      <LegendTypographyHeader marginBottom={1}>{data.name}</LegendTypographyHeader>
      <Stack direction={'column'} spacing={1}>
        {stateData}
      </Stack>
    </Popover>
  );
};

export default PiechartPopover;
