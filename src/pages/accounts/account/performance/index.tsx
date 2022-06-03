import { Box, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Account, Roles } from '../../../../schemas/accounts.schema';
import { CommonFieldsRankingFragment } from '../../../../schemas/ranking.schema';
import Charts from './charts';
import MetricCards from './MetricsCards';

const PerformanceCard: FC<{
  account: Account;
  ranking: CommonFieldsRankingFragment;
}> = (props) => {
  const incompatibleRole = useMemo(
    () =>
      !Object.entries(props.account.roles)
        .filter((entry) => entry[1])
        .map(([role]) => role as Roles)
        .includes('validator'),
    [props.account]
  );
  const panels = useMemo(() => {
    if (incompatibleRole) return [];
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
  }, [props, incompatibleRole]);
  if (incompatibleRole) return <></>;
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
