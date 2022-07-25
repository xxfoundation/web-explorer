import React, { FC, useMemo, useState } from 'react';
import EventsTable from '../../../components/block/EventsTable';
import PaperWrapStyled from '../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../components/Tabs';

const ExtrinsicEventsTabs: FC<{ blockNumber: number; index: number }> = ({
  blockNumber,
  index
}) => {
  const [eventCount, setEventCount] = useState<number>();
  const panels = useMemo(() => {
    return [
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
      }
    ];
  }, [blockNumber, eventCount, index]);

  return (
    <PaperWrapStyled>
      <TabsWithPanels panels={panels} tabsLabel='extrinsic page events' />
    </PaperWrapStyled>
  );
};

export default ExtrinsicEventsTabs;
