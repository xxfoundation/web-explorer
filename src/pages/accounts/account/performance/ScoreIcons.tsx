import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { theme } from '../../../../themes/default';
import { Metrics, MetricScores } from '../../types';

const HeaderStack: FC<{ color?: string }> = ({ children, color }) => {
  return (
    <Stack direction={'row'} alignItems='center' color={color} spacing={1}>
      {children}
    </Stack>
  );
};

export const VeryGoodScore: FC = () => {
  return (
    <HeaderStack color={theme.palette.success.main}>
      <StarsOutlinedIcon fontSize='small' />
      <Typography variant='h5'>very good</Typography>
    </HeaderStack>
  );
};

export const GoodScore: FC = () => {
  return (
    <HeaderStack color={theme.palette.primary.main}>
      <CheckCircleOutlineIcon fontSize='small' />
      <Typography variant='h5'>good</Typography>
    </HeaderStack>
  );
};

export const NeutralScore: FC = () => {
  return (
    <HeaderStack>
      <RemoveCircleOutlineOutlinedIcon fontSize='small' />
      <Typography variant='h5'>neutral</Typography>
    </HeaderStack>
  );
};

export const BadScore: FC = () => {
  return (
    <HeaderStack color={theme.palette.warning.main}>
      <RemoveCircleOutlineOutlinedIcon sx={{ transform: 'rotate(135deg)' }} fontSize='small' />
      <Typography variant='h5'>bad</Typography>
    </HeaderStack>
  );
};

export const VeryBadScore: FC = () => {
  return (
    <HeaderStack color={theme.palette.error.main}>
      <CancelOutlinedIcon fontSize='small' />
      <Typography variant='h5'>very bad</Typography>
    </HeaderStack>
  );
};

const scoreIconsMap: Record<MetricScores, FC> = {
  'very good': VeryGoodScore,
  good: GoodScore,
  neutral: NeutralScore,
  bad: BadScore,
  'very bad': VeryBadScore
};

const ScoreIcon: FC<{ value?: Metrics['score'] }> = ({ value }) => {
  const ScoreIconElement = value ? scoreIconsMap[value] : scoreIconsMap.neutral;
  return <ScoreIconElement />;
};

export default ScoreIcon;
