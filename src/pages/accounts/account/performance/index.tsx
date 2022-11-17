import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import Charts from './charts';
import MetricCards from './MetricsCards';
import TabsWithPanels from '../../../../components/Tabs';
import { Account } from '../../../../schemas/accounts.schema';
import { ValidatorStats } from '../../../../schemas/staking.schema';


const PerformanceCard: FC<{
  account: Account;
  stats: ValidatorStats[];
}> = (props) => {
  const panels = useMemo(() => {
    if (!props.account.validator) return [];
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
  if (!props.account.validator) return <></>;

  return (
    <TabsWithPanels panels={panels} tabsLabel='account performance card' />
  );
};

export default PerformanceCard;
