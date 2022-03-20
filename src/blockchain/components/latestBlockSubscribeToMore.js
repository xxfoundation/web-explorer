import { gql, useQuery } from "@apollo/client";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
    Box,
    Grid, Link,
    Typography
} from "@mui/material";
import React from "react";
import PaperWithHeader from "./paperWithHeader";

const GET_BLOCKS = gql`
query GetBlocks {
    Blocks(order_by: {updatedAt: desc}, limit: 4) {
        hash
        data
    }
}
`;

const ON_NEW_BLOCKS = gql`
subscription NewBlocks($limit: Int) {
    Blocks(order_by: {updatedAt: desc}, limit: $limit) {
        hash
        data
    }
}
`;

const ItemHandler = (block) => {
    return <Grid container sx={{ mb: 4 }} key={block.hash}>
        <Grid item xs>
            <Link href="" underline="hover" variant="body2">{block.hash}</Link>
            <Box sx={{ mt: 1, }}>
                <Link href="" underline="hover" variant="body3">{block.instrinsic} instrinsic</Link> <Typography variant="body3">|</Typography> <Link href="" underline="hover" variant="body3">{block.events} event</Link>
            </Box>
        </Grid>
        <Grid item xs="auto">
            <Box sx={{ textAlign: "right" }}>
                <Box aria-label="undefined"><QuestionMarkIcon color="bad" /></Box>
                <Box>
                    <Typography variant="body3">{block.duration}</Typography>
                </Box>
            </Box>
        </Grid>
    </Grid>;
};

const BlockChain = ({ data, loading, error, subscribeToNewBlocks }) => {
    if (loading) return [];
    if (error) return [];
    console.log("rendering the BlockChain");
    React.useEffect(() => {
        subscribeToNewBlocks(4);
    });
    return data.Blocks.map(ItemHandler);
};

const updateQuery = (prev, { subscriptionData }) => {
    if (!subscriptionData.data) {
        console.log("nothing arrived in the subscription");
        return prev;
    }
    const existingBlocks = {};
    prev.Blocks.forEach(({ hash, data }, index) => {
        existingBlocks[hash] = { data, index };
    });

    const newBlocks = subscriptionData.data.Blocks.filter((block) => {
        return !Object.keys(existingBlocks).includes(block.hash);
    });
    const oldBlocks = prev.Blocks.slice(0, prev.Blocks.length - newBlocks.length);
    // here we can add flag to changing the background of the new items
    const result = [...newBlocks, ...oldBlocks];
    return { Blocks: result };
};

const BlockChainRenderer = () => {
    const { subscribeToMore, ...result } = useQuery(GET_BLOCKS);
    return <PaperWithHeader
        header="LATEST BLOCKS"
        linkName={"SEE ALL"}
        linkAddress={"##"}
        height={500}
    >
        <BlockChain {...result}
            subscribeToNewBlocks={
                (limit) => {
                    console.log("creating an websocket connection");
                    subscribeToMore({
                        document: ON_NEW_BLOCKS,
                        variables: { limit },
                        updateQuery
                    });
                }} />
    </PaperWithHeader>;
};

export default BlockChainRenderer;
