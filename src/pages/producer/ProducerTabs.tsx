import React from 'react';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import ErasTable from './ErasTable';
import NominatorsTable from './NominatorsTable';

const ProducerTabs: React.FC<{ eras: string[]; nominators: string[] }> = ({ eras, nominators }) => {
  return (
    <TabsWithPanels
      panels={[
        {
          label: <TabText message='nominators' count={nominators.length} />,
          content: <NominatorsTable />
        },
        { label: <TabText message='eras' count={eras.length} />, content: <ErasTable /> }
      ]}
      tabsLabel='producers tables tabs'
    />
  );
};
export default ProducerTabs;
