import type { Option, u32 } from '@polkadot/types';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import { Account, GetStakingRewardCounts, GET_STAKING_REWARDS_COUNTS } from '../../../../schemas/accounts.schema';
import { StakingReward, ValidatorStats } from '../../../../schemas/staking.schema';
import { theme } from '../../../../themes/default';
import { MetricScores, MetricsType } from '../../types';
import MetricTooltip from './MetricTooltip';
import evaluateScore from './scoreEvaluator';
import ScoreIcon from './ScoreIcons';
import getTooltipConfiguration from './tooltipConfiguration';
import { useQuery } from '@apollo/client';
import { GetSlashes, GET_SLASHES_BY_ACCOUNT } from '../../../../schemas/slashes.schema';
import { ScoringContext } from './scoreEvaluator/types';
import useApi from '../../../../hooks/useApi';
import useCall from '../../../../hooks/useCall';

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


const MetricCards: FC<{ account: Account; stats: ValidatorStats[] }> = ({ account, stats }) => {
  const { api } = useApi();
  const currentEra = useCall<Option<u32>>(api?.query.staking.currentEra)?.unwrapOr(undefined)?.toNumber();
  const slashesQuery = useQuery<GetSlashes>(GET_SLASHES_BY_ACCOUNT, { variables: { accountId: account.id } });
  const stakingRewardsQuery = useQuery<GetStakingRewardCounts>(GET_STAKING_REWARDS_COUNTS, { variables: { accountId: account.id }} );
  const avgCommissionQuery = useQuery();

  const ctx = useMemo<ScoringContext | undefined>(
    () => (slashesQuery.data?.slashes && currentEra !== undefined)
      ? ({
        account,
        currentEra,
        nominatorCount: stats[0]?.nominators.length,
        slashes: slashesQuery.data.slashes,
        rewardFrequency: stats.filter((s) => !!s.reward).length,
        unclaimedRewards: stats[0]?.reward ?? 0,
        stats
      })
      : undefined, [account, currentEra, slashesQuery.data?.slashes, stats])

  const scoreTiles = useMemo(() => {
    return ctx && Object.entries(evaluateScore(ctx as ScoringContext)).map(([metric, [score, description]], index) => (
      <Grid item xs={12} md={6} key={index}>
        <ScoreTile metric={metric as MetricsType} score={score} description={description} />
      </Grid>
    ));
  }, [ctx]);
  return (
    <Grid container spacing={1}>
      {scoreTiles}
    </Grid>
  );
};

export default MetricCards;
