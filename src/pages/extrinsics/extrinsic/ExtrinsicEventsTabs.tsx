import React, { FC, useMemo } from 'react';
import EventsTable from '../../../components/block/EventsTable';
import PaperWrapStyled from '../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../components/Tabs';

const ExtrinsicEventsTabs: FC<{ blockNumber: number }> = ({ blockNumber }) => {
  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='events' count={9} />,
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
  }, [blockNumber]);

  return (
    <PaperWrapStyled>
      <TabsWithPanels panels={panels} tabsLabel='extrinsic page events' />
    </PaperWrapStyled>
  );
};

export default ExtrinsicEventsTabs;
