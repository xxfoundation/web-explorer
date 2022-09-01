import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useToggle } from '../hooks';
import PaperStyled from './Paper/PaperWrap.styled';
import TabsWithPanels, { TabType } from './Tabs';

const AccountTile: React.FC<{
  panels: TabType[];
  tabsLabel: string;
  title: string;
}> = ({ panels, tabsLabel, title }) => {
  const [expandTile, tile] = useToggle();
  return (
    <PaperStyled sx={{ mt: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={26} fontWeight={500} marginBottom={'10px'}>
          {title}
        </Typography>
        <Button sx={{ minWidth: 0 }} size='small' onClick={tile.toggle}>
          {tile.icon}
        </Button>
      </Box>
      {expandTile && (
          <TabsWithPanels panels={panels} tabsLabel={tabsLabel} />
        )}
    </PaperStyled>
  );
};

export default AccountTile;