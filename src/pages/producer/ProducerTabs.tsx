import React, { useMemo } from 'react';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import ErasTable from './ErasTable';
import NominatorsTable from './NominatorsTable';

const ProducerTabs: React.FC<{
  addressStash: string;
  blockHeight: number;
  eras: number;
  nominators: number;
}> = ({ addressStash, eras, nominators }) => {
  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='nominators' count={nominators} />,
        content: <NominatorsTable stashAddress={addressStash} />
      },
      { label: <TabText message='eras' count={eras} />, content: <ErasTable /> }
    ];
  }, [addressStash, eras, nominators]);
  return (
    <PaperStyled>
      <TabsWithPanels panels={panels} tabsLabel='producers tables tabs' />
    </PaperStyled>
  );
};
export default ProducerTabs;
