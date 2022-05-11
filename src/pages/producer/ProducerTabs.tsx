import React, { useMemo } from 'react';
import { PaperStyled } from '../../components/Paper/PaperWrap.styled';
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
  return (
    <PaperStyled>
      <TabsWithPanels panels={panels} tabsLabel='producers tables tabs' />
    </PaperStyled>
  );
};
export default ProducerTabs;
