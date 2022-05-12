import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import PaperStyled from '../../../../components/Paper/PaperWrap.styled';
import { theme } from '../../../../themes/default';
import MetricTooltip from './MetricTooltip';
import ScoreIcon from './ScoreIcons';
import TooltipConfig from './tooltips.json';

type MetricsType = 'identity';

const metrics: [MetricsType] = ['identity'];
// TODO this should be I'm a json file
// descritiopn is dinamic too
// another different file for the tooltips

const ScoreTile: FC<{ metric: MetricsType }> = ({ metric }) => {
  // TODO fetch score for each metric
  const tooltip = { ...TooltipConfig[metric] };
  return (
    <PaperStyled>
      <Grid container sx={{ height: '80px' }} height={'100%'}>
        <Grid item xs={4}>
          <ScoreIcon value={undefined} />
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
            {tooltip && (
              <MetricTooltip metrics={tooltip}>
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
            {'nothing yet'}
          </Typography>
        </Grid>
      </Grid>
    </PaperStyled>
  );
};

const MetricCard: FC = ({}) => {
  const scoreTiles = useMemo(() => {
    return metrics.map((metric, index) => (
      <Grid item xs={12} md={6} key={index}>
        <ScoreTile metric={metric} />
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
