import React, { FC, useMemo, useState } from 'react';
import EventsTable from '../../../components/block/EventsTable';
import PaperWrapStyled from '../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../components/Tabs';
import TransferTable from '../../transfers/TransfersTable';

const ExtrinsicTabs: FC<{ transferCount: number; blockNumber: number; index: number;}> = ({
  blockNumber,
  index,
  transferCount
}) => {
  const [eventCount, setEventCount] = useState<number>();
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
          <TransferTable
            where={{
              _and: [{ block_number: { _eq: blockNumber } }, { extrinsic_index: { _eq: index } }]
            }}
          />
        )
      }
    ];

    return tabs;
  }, [blockNumber, eventCount, index, transferCount]);

  return (
    <PaperWrapStyled>
      <TabsWithPanels panels={panels} tabsLabel='extrinsic page events' />
    </PaperWrapStyled>
  );
};

export default ExtrinsicTabs;
