import React, { ComponentType, FC, ReactNode } from 'react';
import { Box, Divider, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ListChildComponentProps, FixedSizeList } from 'react-window';

const PaperWrap = styled(Paper)(() => ({
  // boxShadow: theme.shadows.box, // TODO investigate type issue
  border: '1px solid #EAEAEA'
}));

type Props = {
  width?: number;
  header?: string | React.ReactNode,
  height?: number;
  itemHandler: ComponentType<ListChildComponentProps<unknown>> & ReactNode,
  itemSize?: number,
  items: unknown[],
}

const VirtualizedList: FC<Props> = ({ header, height = 570, itemHandler, itemSize = 46, items }) => {
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
            width={600}
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
