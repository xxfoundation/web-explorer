import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import { Account } from '../../../../schemas/accounts.schema';
import { CommonFieldsRankingFragment } from '../../../../schemas/ranking.schema';
import { theme } from '../../../../themes/default';
import { MetricScores, MetricsType } from '../../types';
import MetricTooltip from './MetricTooltip';
import scoreEvaluator from './scoreEvaluator';
import ScoreIcon from './ScoreIcons';
import getTooltipConfiguration from './tooltipConfiguration';

const ScoreTile: FC<{ metric: MetricsType; score: MetricScores; description: string }> = ({
  description,
  metric,
  score
}) => {
  const tooltipConfig = getTooltipConfiguration(metric);
  return (
    <PaperStyled>
      <Grid container sx={{ height: '80px' }} height={'100%'}>
        <Grid item xs={4}>
          <ScoreIcon value={score} />
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
              {metric}
            </Typography>
            {tooltipConfig && (
              <MetricTooltip metrics={tooltipConfig}>
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
            {description}
          </Typography>
        </Grid>
      </Grid>
    </PaperStyled>
  );
};

const MetricCards: FC<{ account: Account; ranking: CommonFieldsRankingFragment }> = (props) => {
  const scoreTiles = useMemo(() => {
    return Object.entries(scoreEvaluator(props)).map(([metric, [score, description]], index) => (
      <Grid item xs={12} md={6} key={index}>
        <ScoreTile metric={metric as MetricsType} score={score} description={description} />
      </Grid>
    ));
  }, [props]);
  return (
    <Grid container spacing={1}>
      {scoreTiles}
    </Grid>
  );
};

export default MetricCards;
