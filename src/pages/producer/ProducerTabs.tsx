import type { EraPointsHistory } from './types';

import React, { useMemo } from 'react';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import ErasTable from './ErasTable';
import NominatorsTable from './NominatorsTable';
import { Nominator } from '../../schemas/accounts.schema';

type Props = {
  producerId: string;
  eras: number;
  eraPointsHistory: EraPointsHistory;
  nominators: number;
  nominations:  Nominator[];
};

const ProducerTabs: React.FC<Props> = ({
  eraPointsHistory,
  eras,
  nominations,
  nominators,
  producerId
}) => {
  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='nominators' count={nominators} />,
        content: <NominatorsTable nominations={nominations} />
      },
      {
        label: <TabText message='eras' count={eras} />,
        content: <ErasTable producerId={producerId} eraPointsHistory={eraPointsHistory} />
      }
    ];
  }, [eras, nominations, nominators, producerId, eraPointsHistory]);
  return (
    <PaperStyled>
      <TabsWithPanels panels={panels} tabsLabel='producers tables tabs' />
    </PaperStyled>
  );
};
export default ProducerTabs;
