import { Box, Container, Divider, IconButton, Link, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import { FixedSizeList } from 'react-window';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';

const blocks = {
    "items": [...Array(9).keys()].map((i) => {
        return {
            "id": 8657975 + i,
            "instrinsic": 8,
            "events": 11,
            "status": "pending",
            "duration": "30"
        }
    })
};

const statusToIconMap = {
    // TODO replace with required fonts
    "pending": {
        "label": "pending",
        "icon": <AccessTimeIcon />
    }
}

const BlockStatusToIcon = (status, duration) => {
    const [statedStatus] = useState(status);
    const { label, icon } = statusToIconMap[statedStatus];
    return (
        <Stack style={{ "alignContent": "end" }}>
            <IconButton aria-label={label}>
                {icon}
            </IconButton>
            <span style={{ "textAlign": "center" }}>{duration}</span>
        </Stack>
    )
}

const blockInfoRenderer = ({ index, data }) => {
    const currentData = data[index];
    return (
        <ListItem alignItems='flex-start' key={currentData.id} component="div">
            <ListItemText primary={currentData.id} secondary={`${currentData.instrinsic} | ${currentData.events}`} />
            <ListItemAvatar>{BlockStatusToIcon(currentData.status, currentData.duration)}</ListItemAvatar>
        </ListItem>)
}

const blockchain = () => {
    return (
        <Container maxWidth={false} className="blockchain-component-latestBlocks">
            <Stack divider={<Divider orientation='vertical' flexItem />} maxWidth="561px">
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography gutterBottom>latest blocks</Typography>
                    <Link href="#" >see all</Link>
                </Stack>
                <Box sx={{ width: '100%', height: 870 }}>
                    {/* TODO aways display scrollbar */}
                    <FixedSizeList
                        height={300}
                        itemSize={46}
                        itemCount={blocks.items.length}
                        itemData={blocks.items}>
                        {blockInfoRenderer}
                    </FixedSizeList>
                </Box>
            </Stack>
        </Container>
    )
};

export default blockchain;
