import { Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import TabsWithPanels from '../../../../components/Tabs';
import { Roles } from '../../types';

const Governance: FC<{ role: Roles }> = ({ role }) => {
  const panels = useMemo(() => {
    if (role === 'nominator') {
      return [];
    }
    if (role === 'validator') {
      return [];
    }
    if (role === 'council') {
      return [];
    }
    return [];
  }, [role]);
  return (
    <TabsWithPanels
      header={
        <Typography fontSize={26} fontWeight={500} letterSpacing={'3%'} marginBottom={'10px'}>
          Governance
        </Typography>
      }
      panels={panels}
      tabsLabel='account governance card'
    />
  );
};

export default Governance;
