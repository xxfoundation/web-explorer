import React, { FC, useMemo, useState } from 'react';
import EventsTable from '../../../components/block/EventsTable';
import PaperWrapStyled from '../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../components/Tabs';

const ExtrinsicEventsTabs: FC<{ blockNumber: number }> = ({ blockNumber }) => {
  const [eventCount, setEventCount] = useState<number>();
  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='events' count={eventCount === undefined ? '' : eventCount} />,
        content: (
          <EventsTable where={{ block_number: { _eq: blockNumber } }} setCount={setEventCount} />
        )
      }
    ];
  }, [blockNumber, eventCount]);

  return (
    <PaperWrapStyled>
      <TabsWithPanels panels={panels} tabsLabel='extrinsic page events' />
    </PaperWrapStyled>
  );
};

export default ExtrinsicEventsTabs;
