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
import { GetCommissionAvg, GetPayoutFrequency, GET_COMMISSION_AVG, GET_PAYOUT_FREQUENCY } from '../../../../schemas/validator.schema';
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


const MetricCards: FC<{ account: Account; stats: ValidatorStats[] }> = ({ account, stats }) => {
  const currentEraQuery = useQuery<GetCurrentEra>(GET_CURRENT_ERA);
  const slashesQuery = useQuery<GetSlashes>(GET_SLASHES_BY_ACCOUNT, { variables: { accountId: account.id } });
  const payoutFrequencyQuery = useQuery<GetPayoutFrequency>(GET_PAYOUT_FREQUENCY, { variables: { accountId: account.id } });
  const avgCommissionQuery = useQuery<GetCommissionAvg>(GET_COMMISSION_AVG, { variables: { accountId: account.id } });

  const error = currentEraQuery.error || slashesQuery.error || payoutFrequencyQuery.error || avgCommissionQuery.error;
  const loading = currentEraQuery.loading || slashesQuery.loading || payoutFrequencyQuery.loading || avgCommissionQuery.loading;

  const ctx = useMemo<ScoringContext | undefined>(
    () => (slashesQuery.data && currentEraQuery.data && avgCommissionQuery.data && payoutFrequencyQuery.data)
      ? ({
        account,
        avgCommission: avgCommissionQuery.data.stats.aggregate.avg.commission,
        currentEra: currentEraQuery.data.block.aggregate.max.era,
        nominatorCount: stats[0]?.nominators.length,
        slashes: slashesQuery.data.slashes,
        rewardFrequency: payoutFrequencyQuery.data.extrinsic.aggregate.count,
        unclaimedRewards: stats[0]?.reward ?? 0,
        stats
      })
      : undefined,
    [account, avgCommissionQuery.data, currentEraQuery.data, payoutFrequencyQuery.data, slashesQuery.data, stats])
  

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
    <Grid container spacing={1}>
      {scoreTiles}
    </Grid>
  );
};

export default MetricCards;
