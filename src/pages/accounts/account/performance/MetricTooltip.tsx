
import {
  Box,
  Divider,
  styled,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../themes/default';
import { WithChildren } from '../../../../types';
import { MetricPopupProps } from '../../types';
import { BadScore, GoodScore, NeutralScore, VeryBadScore, VeryGoodScore } from './ScoreIcons';
import { ClickableTooltip } from '../../../../components/Tooltip';

const CustomTooltip = styled(ClickableTooltip)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '282px',
    padding: '2rem',
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

const ScoreTypography: FC<WithChildren> = ({ children }) => {
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

const ScoreBox: FC<WithChildren> = ({ children }) => {
  return (
    <Box mx={'3px'} my={'15px'}>
      {children}
    </Box>
  );
};

const TooltipTitle: FC<MetricPopupProps> = (props) => {
  return (
    <>
      <Typography variant='h5'>{props.name}</Typography>
      <Typography fontSize={'12px'} fontWeight={400} component={'p'}>
        {props.description}
      </Typography>
      {props.scores['very good'] && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <VeryGoodScore />
            <ScoreTypography>{props.scores['very good']}</ScoreTypography>
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
      {props.scores['very bad'] && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <VeryBadScore />
            <ScoreTypography>{props.scores['very bad']}</ScoreTypography>
          </ScoreBox>
        </>
      )}
    </>
  );
};

const MetricTooltip: FC<Omit<TooltipProps, 'title'> & { metrics: MetricPopupProps }> = ({
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
        <TooltipTitle
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
