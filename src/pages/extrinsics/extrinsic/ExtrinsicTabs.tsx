import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EventsTable from '../../../components/block/EventsTable';
import PaperWrapStyled from '../../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../../components/Tabs';
import { NestedCall } from '../../../schemas/extrinsics.schema';
import TransferTable from '../../transfers/TransfersTable';
import CallsTable from './CallsTable';

type Props = {
  blockNumber: number;
  index: number;
  nestedCalls: Array<NestedCall> | null;
  transferCount: number;
}

const ExtrinsicTabs: FC<Props> = ({
  blockNumber,
  index,
  nestedCalls,
  transferCount,
}) => {
  const { t } = useTranslation();
  const [eventCount, setEventCount] = useState<number>();
  const panels = useMemo(() => {
    const tabs = [
      {
        label: <TabText message={t('events')} count={eventCount === undefined ? '' : eventCount} />,
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
        label: <TabText message={t('transfers')} count={transferCount} />,
        content: (
          <TransferTable
            where={{
              _and: [{ block_number: { _eq: blockNumber } }, { extrinsic_index: { _eq: index } }]
            }}
          />
        )
      },
      {
        label: <TabText message='calls' count={nestedCalls?.length || 0} />,
        content: (
          <CallsTable data={nestedCalls} />
        )
      }
    ];

    return tabs;
  }, [t, blockNumber, eventCount, index, nestedCalls, transferCount]);

  return (
    <PaperWrapStyled>
      <TabsWithPanels panels={panels} tabsLabel={t('extrinsic page events')} />
    </PaperWrapStyled>
  );
};

export default ExtrinsicTabs;
