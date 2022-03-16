import { gql, useSubscription } from "@apollo/client";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Box,
    Grid, Link,
    Typography
} from "@mui/material";
import React from "react";
import PaperWithHeader from "./paperWithHeader";

const ON_NEW_BLOCKS = gql`
subscription NewBlocks {
    Blocks(order_by: {createdAt: desc}, limit: 4) {
        hash
        data
    }
}
`;

const statusToIconMap = (status) => {
    switch (status) {
    case "pending":
        return {
            "label": "pending",
            "icon": <AccessTimeIcon color="bad" />
        };
    default:
        return {
            "label": "undefinded",
            "icon": <AccessTimeIcon color="green" />
        };
    }
};

const ItemHandler = (block) => {
    const { label, icon } = statusToIconMap(block.status);
    return <Grid container sx={{ mb: 4 }} key={block.hash}>
        <Grid item xs>
            <Link href="" underline="hover" variant="body2">{block.hash}</Link>
            <Box sx={{ mt: 1, }}>
                <Link href="" underline="hover" variant="body3">{block.instrinsic} instrinsic</Link> <Typography variant="body3">|</Typography> <Link href="" underline="hover" variant="body3">{block.events} event</Link>
            </Box>
        </Grid>
        <Grid item xs="auto">
            <Box sx={{ textAlign: "right" }}>
                <Box aria-label={label}>{icon}</Box>
                <Box>
                    <Typography variant="body3">{block.duration}</Typography>
                </Box>
            </Box>
        </Grid>
    </Grid>;
};

const BlockChainRenderer = () => {
    const { data, error, loading } = useSubscription(ON_NEW_BLOCKS);
    if (loading) return <></>;
    if (error) return <></>;
    return <PaperWithHeader
        header="LATEST BLOCKS"
        linkName={"SEE ALL"}
        linkAddress={"##"}
        height={500}
    >
        {data.Blocks.map(ItemHandler)}
    </PaperWithHeader>;
};

export default BlockChainRenderer;
