import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { PaperStyled } from '../../../../components/Paper/PaperWrap.styled';
import { theme } from '../../../../themes/default';
import { MetricPopupProps, Metrics } from '../../types';
import MetricTooltip from './MetricTooltip';
import ScoreIcon from './ScoreIcons';

const metrics: (Metrics & { tooltip?: MetricPopupProps })[] = [
  {
    name: 'identity',
    description: 'Validator has a verified identity but doesn\'t provide all possible information'
  },
  {
    name: 'address creation',
    description:
      'Stash address was created at block #444,722 and parent identity address was created at block #0'
  },
  {
    name: 'slashes',
    description: 'No slashes detected'
  },
  {
    name: 'subaccounts',
    description: 'Detected sub-identity, the validator is part of a cluster of 6 validators'
  },
  {
    name: 'subaccounts',
    description: 'Detected sub-identity, the validator is part of a cluster of 6 validators'
  },
  {
    name: 'era points',
    score: 'very good',
    description:
      'Above average! Validator got 0.34% of the total era points in the last 21 days while average was 0.32%',
    tooltip: {
      name: 'ERA POINTS',
      description:
        'Evaluate if the era points earned by the validator in the history are below or above average',
      scores: {
        veryGood: '> 90th percentile',
        good: '<= 90th percentile',
        neutral: '<= 90th percentile',
        bad: '<= 30th percentile',
        veryBad: '<=10th percentile'
      }
    }
  },
  {
    name: 'commission',
    description: 'Current commission is 1.00%'
  },
  {
    name: 'frequency of payouts',
    description: 'Very good, validator has 0 unclaimed era rewards'
  },
  {
    name: 'governance',
    description: 'The validator is backing a council member'
  },
  {
    name: 'validator time',
    description: 'The validator is backing a council member',
    tooltip: {
      name: 'VALIDATOR TIME',
      description:
        'Evaluate if the address was a validator for the majority of its time in the network (since first time as a validator)',
      scores: {
        good: 'No. Eras as validator / (CurrentEra - FirstValidatorEra) > 0.90',
        neutral: 'No. Eras as validator / (CurrentEra - FirstValidatorEra) < 0.90',
        bad: 'No. Eras as validator /  (CurrentEra - FirstValidatorEra) > 0.75'
      }
    }
  }
];

const ScoreTile: FC<Metrics & { tooltip?: MetricPopupProps }> = (props) => {
  // TODO fetch score for each metric
  return (
    <PaperStyled>
      <Grid container sx={{ height: '80px' }} height={'100%'}>
        <Grid item xs={4}>
          <ScoreIcon value={props.score} />
        </Grid>
        <Grid item xs={8}>
          <Stack direction={'row'}>
            <Typography
              fontSize={'18px'}
              lineHeight={'23px'}
              color={theme.palette.grey[600]}
              fontWeight={400}
              marginBottom={'12px'}
              width={'100%'}
              textTransform={'uppercase'}
            >
              {props.name}
            </Typography>
            {props.tooltip && (
              <MetricTooltip metrics={props.tooltip}>
                <InfoOutlinedIcon
                  fontSize='small'
                  color='primary'
                  sx={{ marginTop: '-23px', marginRight: '-23px' }}
                />
              </MetricTooltip>
            )}
          </Stack>
          <Typography
            component={'p'}
            variant='body3'
            lineHeight={'18.4px'}
            color={theme.palette.grey[500]}
          >
            {props.description}
          </Typography>
        </Grid>
      </Grid>
    </PaperStyled>
  );
};

const MetricCard: FC = ({}) => {
  const scoreTiles = useMemo(() => {
    return metrics.map((item, index) => (
      <Grid item xs={12} md={6} key={index}>
        <ScoreTile {...item} />
      </Grid>
    ));
  }, []);
  return (
    <Grid container spacing={1}>
      {scoreTiles}
    </Grid>
  );
};

export default MetricCard;
