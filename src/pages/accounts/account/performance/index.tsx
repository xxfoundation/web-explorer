import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import Charts from './charts';
import MetricCards from './MetricsCards';
import TabsWithPanels from '../../../../components/Tabs';
import { Account } from '../../../../schemas/accounts.schema';
import { ValidatorStats } from '../../../../schemas/staking.schema';
import { useTranslation } from 'react-i18next';


const PerformanceCard: FC<{
  account: Account;
  stats: ValidatorStats[];
}> = (props) => {
  const { t } = useTranslation();
  
  const panels = useMemo(() => {
    if (!props.account.validator) return [];
    return [
      {
        label: <Typography>{t('metrics')}</Typography>,
        content: <MetricCards {...props} />
      },
      {
        label: <Typography>{t('charts')}</Typography>,
        content: <Charts {...props} />
      }
    ];
  }, [props, t]);

  if (!props.account.validator) return <></>;

  return (
    <TabsWithPanels
      panels={panels}
      tabsLabel={t('account performance card')} />
  );
};

export default PerformanceCard;
