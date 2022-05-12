import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import {
  Box,
  Divider,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from '@mui/material';
import React, { FC } from 'react';
import { MetricProps } from '../pages/accounts/types';
import { theme } from '../themes/default';

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
    p: {
      letterSpacing: '8%'
    },
    ['> h5, > p']: {
      color: theme.palette.grey[200],
      paddingBottom: '15px'
    }
  }
});

const HeaderStack: FC<{ color?: string }> = ({ children, color }) => {
  return (
    <Stack direction={'row'} alignItems='center' color={color} spacing={1}>
      {children}
    </Stack>
  );
};

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
      letterSpacing={'8%'}
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

const ToolttipTitle: FC<MetricProps> = (props) => {
  return (
    <>
      <Typography variant='h5'>{props.title}</Typography>
      <Typography variant='h6' component={'p'}>
        {props.description}
      </Typography>
      {props.scores.veryGood && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <HeaderStack color={theme.palette.success.main}>
              <StarsOutlinedIcon />
              <Typography variant='h5'>very good</Typography>
            </HeaderStack>
            <ScoreTypography>{props.scores.veryGood}</ScoreTypography>
          </ScoreBox>
        </>
      )}
      <ScoreDivider />
      <ScoreBox>
        <HeaderStack color={theme.palette.primary.main}>
          <CheckCircleOutlineIcon />
          <Typography variant='h5'>good</Typography>
        </HeaderStack>
        <ScoreTypography>{props.scores.good}</ScoreTypography>
      </ScoreBox>
      <ScoreDivider />
      <ScoreBox>
        <HeaderStack>
          <RemoveCircleOutlineOutlinedIcon />
          <Typography variant='h5'>neutral</Typography>
        </HeaderStack>
        <ScoreTypography>{props.scores.neutral}</ScoreTypography>
      </ScoreBox>
      <ScoreDivider />
      <ScoreBox>
        <HeaderStack color={theme.palette.warning.main}>
          <RemoveCircleOutlineOutlinedIcon sx={{ transform: 'rotate(135deg)' }} />
          <Typography variant='h5'>bad</Typography>
        </HeaderStack>
        <ScoreTypography>{props.scores.bad}</ScoreTypography>
      </ScoreBox>
      {props.scores.veryBad && (
        <>
          <ScoreDivider />
          <ScoreBox>
            <HeaderStack color={theme.palette.error.main}>
              <CancelOutlinedIcon />
              <Typography variant='h5'>very bad</Typography>
            </HeaderStack>
            <ScoreTypography>{props.scores.veryBad}</ScoreTypography>
          </ScoreBox>
        </>
      )}
    </>
  );
};

const MetricTooltips: FC<TooltipProps & MetricProps> = ({
  children,
  description,
  scores,
  title,
  ...props
}) => {
  return (
    <CustomTooltip
      title={<ToolttipTitle title={title} description={description} scores={scores} />}
      arrow
      {...props}
    >
      {children}
    </CustomTooltip>
  );
};

export default MetricTooltips;
