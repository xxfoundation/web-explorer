import { Skeleton } from '@mui/material';
import React, { useMemo } from 'react';
import PaperStyled from '../Paper/PaperWrap.styled';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../Tabs';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

const BlockDetailedEventsTabs: React.FC<{
  events?: number;
  extrinsics?: number;
  blockNumber?: number;
  loading: boolean;
}> = ({ blockNumber, events, loading }) => {
  const panels = useMemo(() => {
    return loading
      ? [
          {
            label: <Skeleton width={'90%'} />,
            content: <TableSkeleton rows={2} cells={1} />
          },
          {
            label: <Skeleton width={'90%'} />,
            content: <TableSkeleton rows={2} cells={1} />
          }
        ]
      : [
          {
            label: <TabText message='extrinsics' count={1} />,
            content: <ExtrinsicsTable />
          },
          {
            label: <TabText message='events' count={events} />,
            content: (
              <EventsTable
                where={{
                  block_number: {
                    _eq: blockNumber
                  }
                }}
              />
            )
          }
        ];
  }, [blockNumber, events, loading]);
  return (
    <PaperStyled>
      <TabsWithPanels panels={panels} tabsLabel='block event tabs' />
    </PaperStyled>
  );
};

export default BlockDetailedEventsTabs;
