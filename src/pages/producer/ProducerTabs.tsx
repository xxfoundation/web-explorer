import React, { useMemo } from 'react';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import ErasTable from './ErasTable';
import NominatorsTable from './NominatorsTable';

const ProducerTabs: React.FC<{
  blockHeight: number;
  eras: number;
  nominators: number;
  nominations: string;
}> = ({ eras, nominations, nominators }) => {
  const panels = useMemo(() => {
    return [
      {
        label: <TabText message='nominators' count={nominators} />,
        content: <NominatorsTable nominations={nominations} />
      },
      { label: <TabText message='eras' count={eras} />, content: <ErasTable /> }
    ];
  }, [eras, nominations, nominators]);
  return (
    <PaperStyled>
      <TabsWithPanels panels={panels} tabsLabel='producers tables tabs' />
    </PaperStyled>
  );
};
export default ProducerTabs;
