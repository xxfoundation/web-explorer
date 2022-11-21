import TabsWithPanels, {TabText} from '../../components/Tabs';
import React from 'react';
import {Skeleton, Typography} from '@mui/material';
import {TableSkeleton} from '../../components/Tables/TableSkeleton';
import ValidatorTable from './NewValidatorsTable';
import {useQuery} from '@apollo/client';
import {ActiveCountsQuery, GET_ACTIVE_COUNTS, GET_LATEST_ERA, LatestEraQuery} from '../../schemas/staking.schema';

const ValidatorTabs = () => {
  const latestEraQuery = useQuery<LatestEraQuery>(GET_LATEST_ERA);
  const latestEra = latestEraQuery.data?.validatorStats?.[0].era;

  const {data, loading} = useQuery<ActiveCountsQuery>(GET_ACTIVE_COUNTS, {
    variables: { era: latestEra },
    skip: !latestEra
  });

  const activeCount = data?.active.aggregate.count;
  const waitingCount = data?.waiting.aggregate.count;

  const renderTabs = () => {
    return [
      {
        label: (
          <TabText
            message={'Current'}
            count={activeCount}
          />
        ),
        content: (
          <ValidatorTable latestEra={latestEra} isWaiting={false} />
        )
      },
      {
        label: (
          <TabText
            message='Waiting'
            count={waitingCount}
          />
        ),
        content: (
          <ValidatorTable latestEra={latestEra} isWaiting={true} />
        )
      }
    ]
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
      : renderTabs()
  }
  return (
    <>
      <Typography variant='h2' gutterBottom>
        Validator
      </Typography>
      <TabsWithPanels panels={myTabs()} tabsLabel='validator tabs'/>
    </>
  )
}

export default ValidatorTabs;