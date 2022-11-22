import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ChainInfoLink, Data, Item } from './ChainInfo.styles';
import { InfoOutlined } from '@mui/icons-material';
import FormatBalance from '../FormatBalance';
import Error from '../Error';
import { CustomTooltip } from '../Tooltip';
import { ListenForMetrics, LISTEN_FOR_METRICS } from '../../schemas/chaindata.schema';

const ChainInfoCard: FC<{
  title: string;
  tooltip?: string | null;
  value?: React.ReactNode;
  path?: string;
}> = ({ path, title, tooltip, value }) => {
  return (
    <Grid item xs={6} sm={3} md={3}>
      <Item sx={{ position: 'relative' }}>
        {tooltip && (
          <CustomTooltip title={tooltip}>
            <InfoOutlined
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2 }}
            />
          </CustomTooltip>
        )}
        {path && <ChainInfoLink style={{ zIndex: 1 }} to={path} />}
        <div style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
          <Typography variant='body4'>{title}</Typography>
          <Data>{value === undefined ? <Skeleton /> : value}</Data>
        </div>
      </Item>
    </Grid>
  );
};

const ChainInfo = () => {
  const { t } = useTranslation();
  const metricsSubscription = useQuery<ListenForMetrics>(LISTEN_FOR_METRICS);

  const accountHoldersAmount = useMemo(
    () => metricsSubscription.data?.numAccounts.aggregate.count && (
      metricsSubscription.data?.numAccounts.aggregate.count - metricsSubscription.data?.numFakeAccounts.aggregate.count
    ),
    [metricsSubscription.data?.numAccounts.aggregate.count, metricsSubscription.data?.numFakeAccounts.aggregate.count]
  );

  const totalIssuance = useMemo(
    () => metricsSubscription.data?.economics[0].totalIssuance,
    [metricsSubscription.data]
  );

  if (metricsSubscription.error) {
    return <Error type='data-unavailable' />;
  }

  return (
    <Box className='blockchain-component-chainInfo' mb={7}>
      <Typography variant='h3' gutterBottom>
        {t('Chain data')}
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <ChainInfoCard
          title={t('Finalized Blocks')}
          value={metricsSubscription.data?.finalizedBlocks.aggregate.count}
          path='/blocks' />
        <ChainInfoCard
          title={t('Active Era')}
          value={metricsSubscription.data?.activeEra[0].era} />
        <ChainInfoCard
          title={t('Transfers')}
          value={metricsSubscription.data?.numTransfers.aggregate.count}
          path='/transfers' />
        <ChainInfoCard
          title={t('Account Holders')}
          value={accountHoldersAmount}
          path='/accounts' />
        <ChainInfoCard
          title={t('Total Issuance')}
          tooltip={
            t('Defined by the Total Supply minus the xx issued as an ERC1404 and not claimed yet (Other > Claims).')
          }
          value={totalIssuance && (<FormatBalance value={totalIssuance} />)} />
        <ChainInfoCard
          title={t('Nominators')}
          value={metricsSubscription.data?.numNominators.aggregate.count} />
        <ChainInfoCard
          title={t('Validators')}
          path='/staking'
          value={metricsSubscription.data?.numActiveValidators.aggregate.count}
        />
        <ChainInfoCard
          title={t('Circulating AGR')}
          tooltip={
            'Defined by the Annual Growth Rate of the circulating supply given by the distribution of staking rewards.'
          }
          value={metricsSubscription.data?.economics[0].inflationRate && `${metricsSubscription.data?.economics[0].inflationRate}%`}
        />
      </Grid>
    </Box>
  );
};

export default ChainInfo;
