
import React, { useCallback, useMemo } from 'react';
import {Skeleton} from '@mui/material';
import { useTranslation } from 'react-i18next';

import {TableSkeleton} from '../../../../components/Tables/TableSkeleton';
import EventsTable from './EventsTable';
import {IModulesProps} from './index'
import TabsWithPanels, { TabText } from '../../../../components/Tabs';

interface IEventsTab {
  accountId: string,
  loading: boolean
  modules: IModulesProps[] | undefined
}

const EventsTab: React.FC<IEventsTab> = ({accountId, loading, modules}) => {
  const { t } = useTranslation();
  const labels = useMemo<Record<string, string>>(() => ({
    technicalCommittee: t('Tech Committee'),
    councilElections: t('Council'),
    democracy: t('Democracy'),
    treasury: t('Treasury'),
    tips: t('Tips'),
  }), [t]);

  const renderTabs = useCallback((data: IModulesProps[] | undefined) => {
    return !data ? [] : data.map(({count, key}: { count: number, key: string }) => {
      const label = labels[key];
      return {
        label: (
          <TabText
            message={label}
            count={count}
          />
        ),
        content: (
          <EventsTable accountId={accountId} entity={key}/>
        )
      }
    })
  }, [accountId, labels]);

  const myTabs = useMemo(() => 
    loading ? [
        {
          label: <Skeleton width={'90%'}/>,
          content: <TableSkeleton rows={2} cells={1}/>
        },
        {
          label: <Skeleton width={'90%'}/>,
          content: <TableSkeleton rows={2} cells={1}/>
        }
      ]
      : renderTabs(modules)
    ,
    [loading, modules, renderTabs]
  );

  return <TabsWithPanels panels={myTabs} tabsLabel={t('account governance card')}/>
}

export default EventsTab;