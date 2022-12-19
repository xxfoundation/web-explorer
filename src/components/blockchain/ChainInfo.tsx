import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';
import React, { FC } from 'react';

import { ChainInfoLink, Data, Item } from './ChainInfo.styles';
import { InfoOutlined } from '@mui/icons-material';
import FormatBalance from '../FormatBalance';
import Error from '../Error';
import { CustomTooltip } from '../Tooltip';
import { GetChainMetrics, GET_CHAIN_METRICS, ListenFinalizedBlocks, ListenNumAccounts, ListenNumFakeAccounts, ListenNumTransfers, LISTEN_FINALIZED_BLOCKS, LISTEN_NUM_ACCOUNTS, LISTEN_NUM_FAKE_ACCOUNTS, LISTEN_NUM_TRANSFERS } from '../../schemas/chaindata.schema';

const ChainInfoCard: FC<{
  title: string;
  tooltip?: string;
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
  const metricsQuery = useQuery<GetChainMetrics>(GET_CHAIN_METRICS);
  // Subscriptions
  const finalizedBlocksSubscription = useSubscription<ListenFinalizedBlocks>(LISTEN_FINALIZED_BLOCKS);
  const numTransfersSubscription = useSubscription<ListenNumTransfers>(LISTEN_NUM_TRANSFERS);
  const numAccountsSubscription = useSubscription<ListenNumAccounts>(LISTEN_NUM_ACCOUNTS);
  const numFakeAccountsSubscription = useSubscription<ListenNumFakeAccounts>(LISTEN_NUM_FAKE_ACCOUNTS);
  

  if (metricsQuery.error || finalizedBlocksSubscription.error || numTransfersSubscription.error || numAccountsSubscription.error || numFakeAccountsSubscription.error) {
    return <Error type='data-unavailable' />;
  }

  const totalNumAcccounts = numAccountsSubscription.data && numFakeAccountsSubscription.data ? numAccountsSubscription.data?.numAccounts.aggregate.count - numFakeAccountsSubscription.data?.numFakeAccounts.aggregate.count : undefined

  return (
    <Box className='blockchain-component-chainInfo' mb={7}>
      <Typography variant='h3' gutterBottom>
        Chain data
      </Typography>
      <Grid container spacing={{ xs: 1, sm: 2 }}>
        <ChainInfoCard title='Finalized Blocks' value={finalizedBlocksSubscription.data?.finalizedBlocks.aggregate.count} path='/blocks' />
        <ChainInfoCard title='Active Era' value={metricsQuery.data?.activeEra[0].era} />
        <ChainInfoCard title='Transfers' value={numTransfersSubscription.data?.numTransfers.aggregate.count} path='/transfers' />
        <ChainInfoCard title='Account Holders' value={totalNumAcccounts} path='/accounts' />
        <ChainInfoCard
          title='Total Issuance'
          tooltip={
            'Defined by the Total Supply minus the xx issued as an ERC1404 and not claimed yet (Other > Claims).'
          }
          value={metricsQuery.data?.economics[0].totalIssuance && <FormatBalance value={metricsQuery.data?.economics[0].totalIssuance} />}
        />
        <ChainInfoCard title='Nominators' value={metricsQuery.data?.numNominators.aggregate.count} />
        <ChainInfoCard
          title='Validators'
          path='/staking'
          value={metricsQuery.data?.numActiveValidators.aggregate.count}
        />
        <ChainInfoCard
          title='Circulating AGR'
          tooltip={
            'Defined by the Annual Growth Rate of the circulating supply given by the distribution of staking rewards.'
          }
          value={metricsQuery.data?.economics[0].inflationRate && `${metricsQuery.data?.economics[0].inflationRate}%`}
        />
      </Grid>
    </Box>
  );
};

export default ChainInfo;
