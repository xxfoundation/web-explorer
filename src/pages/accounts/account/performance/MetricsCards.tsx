import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import { Account } from '../../../../schemas/accounts.schema';
import { ValidatorStats } from '../../../../schemas/staking.schema';
import { theme } from '../../../../themes/default';
import { MetricScores, MetricsType } from '../../types';
import MetricTooltip from './MetricTooltip';
import evaluateScore from './scoreEvaluator';
import ScoreIcon from './ScoreIcons';
import tooltips from './tooltipConfiguration';
import { useQuery } from '@apollo/client';
import { GetSlashes, GET_SLASHES_BY_ACCOUNT } from '../../../../schemas/slashes.schema';
import { ScoringContext } from './scoreEvaluator/types';
import { GetPayoutFrequency, GetValidatorCommission, GetAvgValidatorRelativePerformance, GET_PAYOUT_FREQUENCY, GET_VALIDATOR_COMMISSION, GET_AVG_VALIDATOR_RELATIVE_PERFOMANCE } from '../../../../schemas/validator.schema';
import Error from '../../../../components/Error';
import { GetCurrentEra, GET_CURRENT_ERA } from '../../../../schemas/blocks.schema';
import Loading from '../../../../components/Loading';

const ScoreTile: FC<{ metric: MetricsType; score: MetricScores; description: string }> = ({
  description,
  metric,
  score
}) => {
  const tooltipConfig = tooltips[metric];

  return (
    <PaperStyled>
      <Grid container>
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
                  sx={{ marginTop: {xs: '-5px', md: '-30px' }, marginRight: {xs: '-5px', md: '-30px' } }}
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


const MetricCards: FC<{ account: Account; stats: ValidatorStats[] }> = ({ account, stats }) => {
  const currentEraQuery = useQuery<GetCurrentEra>(GET_CURRENT_ERA);
  const currentEra = currentEraQuery.data?.block.aggregate.max.era || 99999;
  const slashesQuery = useQuery<GetSlashes>(GET_SLASHES_BY_ACCOUNT, { variables: { accountId: account.id } });
  const payoutFrequencyQuery = useQuery<GetPayoutFrequency>(GET_PAYOUT_FREQUENCY, { variables: { accountId: account.id, eraRange: currentEra - 84} });
  const commissionQuery = useQuery<GetValidatorCommission>(GET_VALIDATOR_COMMISSION, { variables: { accountId: account.id } });
  const networkEraPointsQuery = useQuery<GetAvgValidatorRelativePerformance>(GET_AVG_VALIDATOR_RELATIVE_PERFOMANCE, { variables: { accountId: account.id, eraRange: currentEra - 7} });

  const error = currentEraQuery.error || slashesQuery.error || payoutFrequencyQuery.error || commissionQuery.error;
  const loading = currentEraQuery.loading || slashesQuery.loading || payoutFrequencyQuery.loading || commissionQuery.loading;

  const ctx = useMemo<ScoringContext | undefined>(
    () => (slashesQuery.data && currentEraQuery.data && commissionQuery.data && payoutFrequencyQuery.data && networkEraPointsQuery.data)
      ? ({
        account,
        commission: commissionQuery.data?.validator[0].commission,
        currentEra: currentEraQuery.data.block.aggregate.max.era,
        nominatorCount: stats[0]?.nominators.length,
        slashes: slashesQuery.data.slashes,
        payoutTotalEras: payoutFrequencyQuery.data.stats.aggregate.count,
        payoutClaimedEras: payoutFrequencyQuery.data.rewards.aggregate.count,
        networkEraPoints: networkEraPointsQuery.data,
        stats
      })
      : undefined,
    [account, commissionQuery.data, currentEraQuery.data, networkEraPointsQuery, payoutFrequencyQuery.data, slashesQuery.data, stats])
  

  const scoreTiles = useMemo(() => {
    const scores = ctx && evaluateScore(ctx);
    return scores && Object.entries(scores).map(([metric, [score, description]], index) => (
      <Grid item xs={12} md={6} key={index}>
        <ScoreTile metric={metric as MetricsType} score={score} description={description} />
      </Grid>
    ));
  }, [ctx]);

  if (error) {
    return <Error />
  }

  if (loading) {
    return <Loading size='lg' />
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {scoreTiles}
    </Grid>
  );
};

export default MetricCards;
