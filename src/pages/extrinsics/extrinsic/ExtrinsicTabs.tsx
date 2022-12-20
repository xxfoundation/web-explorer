import React, { FC, useMemo, useState } from 'react';
import EventsTable from '../../../components/block/EventsTable';
import PaperWrapStyled from '../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../components/Tabs';
import { NestedCall } from '../../../schemas/extrinsics.schema';
import TransferTable from '../../transfers/TransfersTable';
import CallsTable from './CallsTable';

const ExtrinsicTabs: FC<{ transferCount: number; blockNumber: number; index: number; nestedCalls: Array<NestedCall> | null; }> = ({
  blockNumber,
  index,
  nestedCalls,
  transferCount,
}) => {
  const [eventCount, setEventCount] = useState<number>();
  const callsCount = nestedCalls?.length || 0;
  const panels = useMemo(() => {
    const tabs = [
      {
        label: <TabText message='events' count={eventCount === undefined ? '' : eventCount} />,
        content: (
          <EventsTable
            where={{
              _and: [
                { block_number: { _eq: blockNumber } },
                { phase: { _like: `{\"applyExtrinsic\":${index}}` } }
              ]
            }}
            setCount={setEventCount}
          />
        )
      },
      {
        label: <TabText message='transfers' count={transferCount} />,
        content: (
          transferCount ? <TransferTable
            where={{
              _and: [{ block_number: { _eq: blockNumber } }, { extrinsic_index: { _eq: index } }]
            }}
          /> : <></>
        )
      },
      {
        label: <TabText message='calls' count={callsCount} />,
        content: (
          callsCount ? <CallsTable data={nestedCalls} /> : <></>
        )
      }
    ];

    return tabs;
  }, [blockNumber, callsCount, eventCount, index, nestedCalls, transferCount]);

  return (
    <PaperWrapStyled>
      <TabsWithPanels panels={panels} tabsLabel='extrinsic page events' />
    </PaperWrapStyled>
  );
};

export default ExtrinsicTabs;
