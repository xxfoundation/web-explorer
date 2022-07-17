import React, { useMemo } from 'react';
import PaperStyled from '../../components/Paper/PaperWrap.styled';
import TabsWithPanels, { TabText } from '../../components/Tabs';
import NominatorsTable from './NominatorsTable';
import { ValidatorStats } from '../../schemas/staking.schema';
import ValidatorStatsTable from '../accounts/account/staking/ValidatorStatsTable';
import { ProducedBlocks } from '../../schemas/blocks.schema';

type Props = {
  producedBlocks?: ProducedBlocks;
  validatorStats?: ValidatorStats[];
  validatorStatsCount?: number;
  error: boolean;
};

const ProducerTabs: React.FC<Props> = ({
  error,
  producedBlocks,
  validatorStats,
  validatorStatsCount
}) => {
  const panels = useMemo(() => {
    return [
      {
        label: (
          <TabText
            message='nominators'
            count={validatorStats && validatorStats[0].nominators?.length}
          />
        ),
        content: <NominatorsTable nominators={validatorStats && validatorStats[0].nominators} />
      },
      {
        label: <TabText message='Validator Stats' count={validatorStatsCount} />,
        content: (
          <ValidatorStatsTable
            producedBlocks={producedBlocks}
            error={error}
            stats={validatorStats}
          />
        )
      }
    ];
  }, [validatorStatsCount, producedBlocks, error, validatorStats]);
  return (
    <PaperStyled>
      <TabsWithPanels panels={panels} tabsLabel='producers tables tabs' />
    </PaperStyled>
  );
};
export default ProducerTabs;
