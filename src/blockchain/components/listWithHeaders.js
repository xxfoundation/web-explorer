import { Box, Divider, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { FixedSizeList } from 'react-window';

const PaperWrap = styled(Paper)(({ theme }) => ({
  boxShadow: theme.shadows.box,
  border: '1px solid #EAEAEA'
}));

const VirtualizedList = ({ header, height = 570, itemHandler, itemSize = 46, items }) => {
  return (
    <PaperWrap className="blockchain-component-transfers" sx={{ py: 6, px: { xs: 3, md: 6 } }}>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mb: 8 }}
        >
          {header}
        </Stack>
        <Divider />
        <Box sx={{ mt: 3, overflow: 'auto' }}>
          <FixedSizeList
            height={height}
            itemSize={itemSize}
            itemCount={items.length}
            itemData={items}
          >
            {itemHandler}
          </FixedSizeList>
        </Box>
      </Stack>
    </PaperWrap>
  );
};

export default VirtualizedList;
