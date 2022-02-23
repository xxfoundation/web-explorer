import { Container, Divider, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { FixedSizeList } from 'react-window'

const VirtualizedList = ({ items, height = 870, itemSize = 46, header, itemHandler }) => {
    return (
        <Container maxWidth={false} className='blockchain-component-transfers'>
            <Stack divider={<Divider orientation='vertical' flexItem />} maxWidth='561px'>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
                    {header}
                </Stack>
                <Box sx={{ width: '100%', height: 870 }}>
                    <FixedSizeList
                        height={height}
                        itemSize={itemSize}
                        itemCount={items.length}
                        itemData={items}>
                        {itemHandler}
                    </FixedSizeList>
                </Box>
            </Stack>
        </Container>
    )
}

export default VirtualizedList