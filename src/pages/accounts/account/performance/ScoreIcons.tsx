import type { WithChildren } from '../../../../types';

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { FC } from 'react';

import { theme } from '../../../../themes/default';
import { MetricScores } from '../../types';

type HeaderStackProps = WithChildren & { color? : string };

const HeaderStack: FC<HeaderStackProps> = ({ children, color }) => {
  return (
    <Stack direction={'row'} alignItems='center' color={color} spacing={1}>
      {children}
    </Stack>
  );
};

export const VeryGoodScore: FC = () => {
  const { t } = useTranslation();
  return (
    <HeaderStack color={theme.palette.success.main}>
      <StarsOutlinedIcon fontSize='small' />
      <Typography variant='h5'>{t('very good')}</Typography>
    </HeaderStack>
  );
};

export const GoodScore: FC = () => {
  const { t } = useTranslation();
  return (
    <HeaderStack color={theme.palette.primary.main}>
      <CheckCircleOutlineIcon fontSize='small' />
      <Typography variant='h5'>{t('good')}</Typography>
    </HeaderStack>
  );
};

export const NeutralScore: FC = () => {
  const { t } = useTranslation();
  return (
    <HeaderStack>
      <RemoveCircleOutlineOutlinedIcon fontSize='small' />
      <Typography variant='h5'>{t('neutral')}</Typography>
    </HeaderStack>
  );
};

export const BadScore: FC = () => {
  const { t } = useTranslation();
  return (
    <HeaderStack color={theme.palette.warning.main}>
      <RemoveCircleOutlineOutlinedIcon sx={{ transform: 'rotate(135deg)' }} fontSize='small' />
      <Typography variant='h5'>{t('bad')}</Typography>
    </HeaderStack>
  );
};

export const VeryBadScore: FC = () => {
  const { t } = useTranslation();
  return (
    <HeaderStack color={theme.palette.error.main}>
      <CancelOutlinedIcon fontSize='small' />
      <Typography variant='h5'>{t('very bad')}</Typography>
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

const ScoreIcon: FC<{ value?: MetricScores }> = ({ value }) => {
  const ScoreIconElement = value ? scoreIconsMap[value] : scoreIconsMap.neutral;
  return <ScoreIconElement />;
};

export default ScoreIcon;
