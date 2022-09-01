import type { Performance, PerformanceData } from './types';
import React, { FC } from 'react';
import { CheckCircleOutline, RemoveCircleOutline, HighlightOff } from '@mui/icons-material';
import { Box, Typography, Stack } from '@mui/material';

import star from '../../assets/images/icons/StarStroke.svg';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import { useScoringContext } from './ScoringContext';

type Props = {
  performance: Performance;
  title: string;
  description: string;
}

const icons: Record<Performance, React.ReactNode> = {
  'Very Good': <img style={{ width: '20px', verticalAlign: 'middle'  }} src={star} />,
  'Good': <CheckCircleOutline sx={{ color: 'info.main', verticalAlign: 'middle'  }} />,
  'Neutral': <RemoveCircleOutline  sx={{ color: 'grey.500', verticalAlign: 'middle'  }} />,
  'Bad':  <RemoveCircleOutline  sx={{ color: 'warning.main', transform: 'rotate(45deg)', verticalAlign: 'middle'  }} />,
  'Very Bad': <HighlightOff sx={{ color: 'error.main', verticalAlign: 'middle'  }} />
}

const PerformanceCard: FC<Props> = ({ description, performance, title  }) => (
  <PaperWrapStyled>
    <Stack direction='row'>
      <Typography variant='h4' sx={{ whiteSpace: 'nowrap', pr: 4 }}>
        {icons[performance]} {performance}
      </Typography>
      <Box flexGrow={1}>
        <Typography variant='h3' sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography sx={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: 14, lineHeight: '1.2rem' }}>
          {description}
        </Typography>
      </Box>
    </Stack>
  </PaperWrapStyled>
);

export const processScore =  (scoring: PerformanceData): Props => {
  const title = scoring.label;
  const description = scoring.descriptionTemplate?.replace('{{description}}')
}

export default PerformanceCard;