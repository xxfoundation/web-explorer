import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Account } from '../../../../schemas/accounts.schema';
import { CommonFieldsRankingFragment } from '../../../../schemas/staking.schema';
import Charts from './charts';
import MetricCards from './MetricsCards';

const PerformanceCard: FC<{
  account: Account;
  ranking: CommonFieldsRankingFragment;
}> = (props) => {
  const panels = useMemo(() => {
    if (!props.account.roles.validator) return [];
    return [
      {
        label: <Typography>metrics</Typography>,
        content: <MetricCards {...props} />
      },
      {
        label: <Typography>charts</Typography>,
        content: <Charts {...props} />
      }
    ];
  }, [props]);
  if (!props.account.roles.validator) return <></>;
  return (
    <Box padding={'40px'}>
      <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
        Performance
      </Typography>
      <TabsWithPanels panels={panels} tabsLabel='account performance card' tabMarginBottom={'1'} />
    </Box>
  );
};

export default PerformanceCard;
