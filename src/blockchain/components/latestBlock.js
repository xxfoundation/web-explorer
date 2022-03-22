
import React from "react";
import {
    Box,
    Grid, Link,
    Typography
} from "@mui/material";

import { theme } from "../../themes/default";
import PaperWithHeader from "./paperWithHeader";
import { ClockIcon } from "../../site/icons/sfIcons.js";

const blocks = {
    "items": [...Array(9).keys()].map((i) => {
        return {
            "id": 8657975 + i,
            "instrinsic": 8,
            "events": 11,
            "status": "pending",
            "duration": "30 sec"
        };
    })
};

const statusToIconMap = {
    // TODO replace with required fonts
    "pending": {
        "label": "pending",
        "icon": <ClockIcon color={theme.palette.bad.main} />
    }
};

const BlockStatusToIcon = (status, duration) => {
    // const [statedStatus] = useState(status)
    const { label, icon } = statusToIconMap[status];
    return (
        <Box sx={{ textAlign: "right" }}>
            <Box aria-label={label}>{icon}</Box>
            <Box>
                <Typography variant="body3">{duration}</Typography>
            </Box>
        </Box>
    );
};

const ItemHandler = (currentData) => {
    // const [currentData] = useState(data[index])
    //const currentData = data[index]
    
    return (
        <Grid container sx={{ mb: 4 }}>
            <Grid item xs>
                <Link href="" underline="hover" variant="body2">{currentData.id}</Link>
                <Box sx={{ mt: 1, }}>
                    <Link href="" underline="hover" variant="body3">{currentData.instrinsic} instrinsic</Link> <Typography variant="body3">|</Typography> <Link href="" underline="hover" variant="body3">{currentData.events} event</Link>
                </Box>
            </Grid>
            <Grid item xs="auto">{BlockStatusToIcon(currentData.status, currentData.duration)}</Grid>
        </Grid>);
};

const blockchain = () => {
    return(
        <PaperWithHeader
            header="LATEST BLOCKS"
            linkName={ "SEE ALL" }
            linkAddress={ "##" }
            height={500}
        >
            {blocks.items.map(ItemHandler)}
        </PaperWithHeader>
    );
};

export default blockchain;
