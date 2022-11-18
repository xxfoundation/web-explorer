import { useQuery } from '@apollo/client';
import { Skeleton } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GetBlockCounts, GET_BLOCK_COUNTS } from '../../schemas/blocks.schema';
import PaperStyled from '../Paper/PaperWrap.styled';
import { TableSkeleton } from '../Tables/TableSkeleton';
import TabsWithPanels, { TabText } from '../Tabs';
import EventsTable from './EventsTable';
import ExtrinsicsTable from './ExtrinsicsTable';

type Props = {
  blockNumber?: number;
  loading: boolean;
};

const BlockDetailedTabs: React.FC<Props> = ({ blockNumber, loading }) => {
  const { t } = useTranslation();
  const [extrinsicsCount, setExtrinsicsCount] = useState<number>();
  const [eventCount, setEventCount] = useState<number>();
  const query = useQuery<GetBlockCounts>(GET_BLOCK_COUNTS, { variables: { blockNumber } });

  useEffect(() => {
    setExtrinsicsCount(query.data?.extrinsics.aggregate.count);
    setEventCount(query.data?.events.aggregate.count);
  }, [query.data?.extrinsics.aggregate.count, query.data?.events.aggregate.count]);

  const panels = useMemo(() => {
    const where = {
      block_number: {
        _eq: blockNumber
      }
    };

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
            label: <TabText message='extrinsics' count={extrinsicsCount} />,
            content: <ExtrinsicsTable blockNumber={blockNumber} />
          },
          {
            label: <TabText message='events' count={eventCount} />,
            content: <EventsTable where={where} />
          }
        ];
  }, [blockNumber, eventCount, extrinsicsCount, loading]);

  return (
    <PaperStyled>
      <TabsWithPanels panels={panels} tabsLabel={t('block event tabs')} />
    </PaperStyled>
  );
};

export default BlockDetailedTabs;
