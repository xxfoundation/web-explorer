import type { Performance } from './types';

import { CheckCircleOutline, RemoveCircleOutline, HighlightOff } from '@mui/icons-material';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperWrapStyled from '../../components/Paper/PaperWrap.styled';
import star from '../../assets/images/icons/StarStroke.svg';

import Tabs, { TabType } from '../../components/Tabs';
import { Identity } from '../../schemas/accounts.schema';

type Props = { 
  accountId?: string;
}

type PerformanceCardProps = {
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

const PerformanceCard: FC<PerformanceCardProps> = ({ description, performance, title  }) => (
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

const IdentityScore: FC<{identity: Identity }> = ({ identity }) => {
  
  (
    <PerformanceCard
  )
}


const ValidatorPerformance: FC<Props> = ({ accountId }) => {
  const panels = useMemo<TabType[]>(() => [
    {
      label: 'Metrics',
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Very Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Neutral'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PerformanceCard
              performance='Good'
              title='Identity'
              description={'Validator has a verified identity but doesn\'t provide all possible information'}
            />
          </Grid>
        </Grid>
      )
    },
    {
      label: 'Charts',
      content: (
        <>
          Charts be here
        </>
      )
    }
  ], []);
  return (
    <Container sx={{ my: 5 }}>
      <Typography sx={{
        fontSize: 26,
        fontWeight: 500,
        color: 'grey.800'
      }}>
        Performance
      </Typography>
      <Tabs panels={panels} />
    </Container>
  )
};

export default ValidatorPerformance;
