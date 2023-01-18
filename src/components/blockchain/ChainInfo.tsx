import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { useQuery, useSubscription } from '@apollo/client';
import React, { FC } from 'react';

import { ChainInfoLink, Data, Item } from './ChainInfo.styles';
import { InfoOutlined } from '@mui/icons-material';
import Error from '../Error';
import { CustomTooltip } from '../Tooltip';
import { GetChainMetrics, GET_CHAIN_METRICS, ListenFinalizedBlocks, ListenActiveAccounts, ListenNumTransfers, LISTEN_FINALIZED_BLOCKS, LISTEN_ACTIVE_ACCOUNTS, LISTEN_NUM_TRANSFERS } from '../../schemas/chaindata.schema';

const ChainInfoCard: FC<{
  title: string;
  tooltip?: string;
  value?: React.ReactNode;
  path?: string;
}> = ({ path, title, tooltip, value }) => {
  return (
    <Grid item xs={6} sm={6} md={2} lg={2}>
      <Item sx={{ position: 'relative', p: 2 }}> 
        {tooltip && (
          <CustomTooltip title={tooltip}>
            <InfoOutlined
              style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', zIndex: 2 }}
            />
          </CustomTooltip>
        )}
        {path && <ChainInfoLink style={{ zIndex: 1 }} to={path} />}
        <div style={{ position: 'relative', zIndex: 2 }}>
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
  const activeAccountsSubscription = useSubscription<ListenActiveAccounts>(LISTEN_ACTIVE_ACCOUNTS);

  if (metricsQuery.error || finalizedBlocksSubscription.error || numTransfersSubscription.error || activeAccountsSubscription.error) {
    return <Error type='data-unavailable' />;
  }
  const activeAccounts = activeAccountsSubscription.data && activeAccountsSubscription.data?.numAccounts.aggregate.count;

  return (
    <Box className='blockchain-component-chainInfo' mb={7}>
      <Typography variant='h3' gutterBottom>
        Chain data
      </Typography>
      <Grid container columns={12} spacing={{ xs: 1, sm: 2 }}>
          <ChainInfoCard title='Finalized Blocks' value={finalizedBlocksSubscription.data?.finalizedBlocks.aggregate.count} path='/blocks' />
          <ChainInfoCard title='Active Era' value={metricsQuery.data?.activeEra[0].era} />
          <ChainInfoCard title='Active Accounts' value={activeAccounts} path='/accounts' />
          <ChainInfoCard title='Nominators' value={metricsQuery.data?.numNominators.aggregate.count} />
          <ChainInfoCard
            title='Validators'
            path='/staking'
            value={metricsQuery.data?.numActiveValidators.aggregate.count}
          />
          <ChainInfoCard title='Transfers' value={numTransfersSubscription.data?.numTransfers.aggregate.count} path='/transfers' />
      </Grid>
    </Box>
  );
};

export default ChainInfo;
