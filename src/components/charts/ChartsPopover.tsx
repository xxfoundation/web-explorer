import {
  Grid,
  Popover,
  PopoverProps,
  Stack,
  styled,
  SxProps,
  Theme,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import { default as React, FC, useMemo } from 'react';
import { theme } from '../../themes/default';
import {
  CustomPointOptions,
  OthersStatePopup,
  PercentageValues,
  StatePopup,
  VestingStatePopup
} from '../blockchain/types';

type StakeableInfoProps = {
  name: string;
  values: PercentageValues;
};

type ChartClickModalProps<T> = {
  data: CustomPointOptions<T>;
};

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

const SeriesVesting: FC<VestingStatePopup> = ({ stakeable, unstakeable }) => {
  return (
    <>
      <StateVesting name='stakeable' values={stakeable} />
      <StateVesting name='unstakeable' values={unstakeable} />
    </>
  );
};

const SeriesOthers: FC<OthersStatePopup> = ({ canaryNetReward, liquidityStaking, treasury }) => {
  return (
    <Grid container marginY={1}>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographySubHeaders>total</LegendTypographySubHeaders>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographySubHeaders>
            {treasury.value + liquidityStaking.value + canaryNetReward.value}
          </LegendTypographySubHeaders>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographySubHeaders>
            {treasury.percentage + liquidityStaking.percentage + canaryNetReward.percentage}
          </LegendTypographySubHeaders>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>Treasury</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>{treasury.value}</LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{treasury.percentage}</LegendTypographyBody>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>CanaryNet Rewards</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>{canaryNetReward.value}</LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{canaryNetReward.percentage}</LegendTypographyBody>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>Liquidity Staking</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>{liquidityStaking.value}</LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{liquidityStaking.percentage}</LegendTypographyBody>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const SeriesContent: FC<CustomPointOptions<StatePopup>> = ({ custom, name }) => {
  const content = useMemo(() => {
    if (custom.type === 'vesting') {
      return <SeriesVesting {...(custom as VestingStatePopup)} />;
    }
    if (custom.type === 'others') {
      return <SeriesOthers {...(custom as OthersStatePopup)} />;
    }
    return <></>;
  }, [custom]);

  return (
    <>
      <LegendTypographyHeader marginBottom={1}>{name}</LegendTypographyHeader>
      <Stack direction={'column'} spacing={1}>
        {content}
      </Stack>
    </>
  );
};

export const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme: th }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: th.palette.background.paper,
    boxShadow: th.boxShadow,
    border: th.borders?.light,
    borderRadius: '33px',
    padding: '40px',
    [th.breakpoints.down('sm')]: {
      padding: '30px'
    },
    maxWidth: '318px'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: th.palette.background.paper
  }
}));

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

export const SeriesPopover: FC<ChartClickModalProps<StatePopup> & PopoverProps> = ({
  data,
  ...props
}) => {
  return (
    <Popover
      {...props}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }}
      PaperProps={{ sx: popooverProps }}
    >
      <SeriesContent name={data.name} custom={data.custom} />
    </Popover>
  );
};

export default SeriesPopover;
