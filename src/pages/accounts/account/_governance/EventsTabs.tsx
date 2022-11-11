import TabsWithPanels, {TabText} from '../../../../components/Tabs';
import React from 'react';
import {Skeleton} from '@mui/material';
import {TableSkeleton} from '../../../../components/Tables/TableSkeleton';
import EventsTable from './EventsTable';
import {IModulesProps} from './index'

interface TLabels {
  [key: string]: string
}

const LABELS: TLabels = {
  technicalCommittee: 'Technical Committee',
  councilElections: 'Council / Elections',
  tips: 'Tips',
  democracy: 'Democracy',
  treasury: 'Treasury',
}

interface IEventsTab {
  accountId: string,
  loading: boolean
  modules: IModulesProps[] | undefined
}

const EventsTab: React.FC<IEventsTab> = ({accountId, loading, modules}) => {
  const renderTabs = (data: IModulesProps[] | undefined) => {
    return !data ? [] : data.map(({count, key}: { count: number, key: string }) => {
      const label = LABELS[key]
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
  }

  const myTabs = () => {
    return loading
      ? [
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
  }
  return <TabsWithPanels panels={myTabs()} tabsLabel='account governance card'/>
}

export default EventsTab;