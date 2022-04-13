import React, { useMemo } from 'react';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import ErasTable from './ErasTable';
import NominatorsTable from './NominatorsTable';

const ProducerTabs: React.FC<{ eras: string[]; nominators: string[] }> = ({ eras, nominators }) => {
  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='nominators' count={nominators.length} />,
        content: <NominatorsTable />
      },
      { label: <TabText message='eras' count={eras.length} />, content: <ErasTable /> }
    ];
  }, [eras, nominators]);
  return <TabsWithPanels panels={panels} tabsLabel='producers tables tabs' />;
};
export default ProducerTabs;
