import { 
    Divider, 
    Stack, 
    Paper, 
    Box 
} from "@mui/material";

import { FixedSizeList } from "react-window";

const VirtualizedList = ({ items, height = 570, itemSize = 46, header, itemHandler }) => {
    return (
        <Paper className="blockchain-component-transfers" sx={{ py: 6, px: 6, }}>
            <Stack>
                <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    spacing={2}
                    sx={{ mb: 8, }}
                >
                    {header}
                </Stack>
                <Divider />
                <Box sx={{ mt: 3, }}>
                    <FixedSizeList
                        height={height}
                        itemSize={itemSize}
                        itemCount={items.length}
                        itemData={items}>
                        {itemHandler}
                    </FixedSizeList>
                </Box>
            </Stack>
        </Paper>
    )
}

export default VirtualizedList;