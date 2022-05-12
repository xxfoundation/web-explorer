import {
  Box,
  Divider,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../themes/default';
import { MetricPopupProps as MetricTooltipProps } from '../../types';
import { BadScore, GoodScore, NeutralScore, VeryBadScore, VeryGoodScore } from './ScoreIcons';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '282px',
    width: '100%',
    padding: '30px',
    h5: {
      letterSpacing: '1px'
    },
    ['> h5, > p']: {
      color: theme.palette.grey[200],
      paddingBottom: '15px'
    }
  }
});

const ScoreDivider: FC = () => {
  return (
    <Divider
      orientation='horizontal'
      variant='fullWidth'
      flexItem
      color={theme.palette.grey['500']}
    />
  );
};

const ScoreTypography: FC = ({ children }) => {
  return (
    <Typography
      variant='body4'
      component={'p'}
      sx={{ marginLeft: '33px', marginTop: '3px' }}
      color={theme.palette.grey[300]}
    >
      {children}
    </Typography>
  );
};

const ScoreBox: FC = ({ children }) => {
  return (
    <Box mx={'3px'} my={'15px'}>
      {children}
    </Box>
  );
};

const ToolttipTitle: FC<MetricTooltipProps> = (props) => {
  return (
    <>
      <Typography variant='h5'>{props.name}</Typography>
      <Typography variant='h6' component={'p'}>
        {props.description}
      </Typography>
      {props.scores.veryGood && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <VeryGoodScore />
            <ScoreTypography>{props.scores.veryGood}</ScoreTypography>
          </ScoreBox>
        </>
      )}
      {props.scores.good && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <GoodScore />
            <ScoreTypography>{props.scores.good}</ScoreTypography>
          </ScoreBox>
        </>
      )}
      {props.scores.neutral && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <NeutralScore />
            <ScoreTypography>{props.scores.neutral}</ScoreTypography>
          </ScoreBox>
        </>
      )}
      {props.scores.bad && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <BadScore />
            <ScoreTypography>{props.scores.bad}</ScoreTypography>
          </ScoreBox>
        </>
      )}
      {props.scores.veryBad && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <VeryBadScore />
            <ScoreTypography>{props.scores.veryBad}</ScoreTypography>
          </ScoreBox>
        </>
      )}
    </>
  );
};

const MetricTooltip: FC<Omit<TooltipProps, 'title'> & { metrics: MetricTooltipProps }> = ({
  children,
  metrics,
  ...props
}) => {
  return (
    <CustomTooltip
      {...props}
      arrow
      placement='left'
      title={
        <ToolttipTitle
          name={metrics.name}
          description={metrics.description}
          scores={metrics.scores}
        />
      }
    >
      {children}
    </CustomTooltip>
  );
};

export default MetricTooltip;
