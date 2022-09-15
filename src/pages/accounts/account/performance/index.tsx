import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import AccountTile from '../../../../components/AccountTile';
import { Account } from '../../../../schemas/accounts.schema';
import { ValidatorStats } from '../../../../schemas/staking.schema';
import Charts from './charts';
import MetricCards from './MetricsCards';

const PerformanceCard: FC<{
  account: Account;
  stats: ValidatorStats[];
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
    <AccountTile panels={panels} tabsLabel='account performance card' title='Performance' />
  );
};

export default PerformanceCard;
