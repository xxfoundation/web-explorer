import CloseIcon from '@mui/icons-material/Close';
import { Grid, IconButton, Stack, styled, Typography } from '@mui/material';
import { default as React, FC, useMemo } from 'react';
import {
  CustomPointOptions,
  OthersStatePopup,
  PercentageValues,
  StatePopup,
  VestingStatePopup
} from '../blockchain/types';
import FormatBalance from '../FormatBalance';

type StakeableInfoProps = {
  name: string;
  values: PercentageValues;
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
    textAlign: 'left'
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
          <LegendTypographySubHeaders>
            <FormatBalance value={`${team.value + foundation.value}`} precision={3} />
          </LegendTypographySubHeaders>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>
            {`${team.percentage + foundation.percentage}%`}
          </LegendTypographyBody>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>team</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>
            <FormatBalance value={`${team.value}`} precision={3} />
          </LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{team.percentage + '%'}</LegendTypographyBody>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>foundation</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>
            <FormatBalance value={`${foundation.value}`} precision={3} />
          </LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{foundation.percentage + '%'}</LegendTypographyBody>
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
            <FormatBalance
              value={`${treasury.value + liquidityStaking.value + canaryNetReward.value}`}
              precision={3}
            />
          </LegendTypographySubHeaders>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographySubHeaders>
            {`${treasury.percentage + liquidityStaking.percentage + canaryNetReward.percentage}%`}
          </LegendTypographySubHeaders>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>Treasury</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>
            <FormatBalance value={`${treasury.value}`} precision={3} />
          </LegendTypographyBody>
        </Grid>
        <Grid item xs={2} sx={{ maxWidth: '30px' }}>
          <LegendTypographyBody>{`${treasury.percentage}%`}</LegendTypographyBody>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>CanaryNet Rewards</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>
            <FormatBalance value={`${canaryNetReward.value}`} precision={3} />
          </LegendTypographyBody>
        </Grid>
        <Grid item xs={2} sx={{ maxWidth: '30px' }}>
          <LegendTypographyBody>{`${canaryNetReward.percentage}%`}</LegendTypographyBody>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={7}>
          <LegendTypographyBody>Liquidity Staking</LegendTypographyBody>
        </Grid>
        <Grid item xs={3}>
          <LegendTypographyBody>
            <FormatBalance value={`${liquidityStaking.value}`} precision={3} />
          </LegendTypographyBody>
        </Grid>
        <Grid item xs={2}>
          <LegendTypographyBody>{`${liquidityStaking.percentage}%`}</LegendTypographyBody>
        </Grid>
      </Grid>
    </Grid>
  );
};

const SeriesDetailedInfo: FC<
  CustomPointOptions<StatePopup> & {
    onClose?: () => void;
  }
> = ({ custom, name, onClose }) => {
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
        {content}
      </Stack>
    </>
  );
};

export default SeriesDetailedInfo;
