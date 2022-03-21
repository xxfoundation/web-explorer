import { gql, useSubscription } from "@apollo/client";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Box,
    Grid, Link,
    Typography
} from "@mui/material";
import React from "react";
import PaperWithHeader from "./paperWithHeader";


const PAGE_LIMIT = 4; // TODO replace with 25

const ItemHandler = ({ block }) => {
    return <Grid container sx={{ mb: 4 }}>
        <Grid item xs>
            <Link href="" underline="hover" variant="body2">{block.hash}</Link>
            <Box sx={{ mt: 1, }}>
                <Link href="" underline="hover" variant="body3">
                    {block.instrinsic} instrinsic
                </Link>
                <Typography variant="body3">|</Typography>
                <Link href="" underline="hover" variant="body3">{block.events} event</Link>
                {block.newEntry ? "newBlock": "old"}
            </Box>
        </Grid>
        <Grid item xs="auto">
            <Box sx={{ textAlign: "right" }}>
                <Box aria-label={block.status || "undefined"}><AccessTimeIcon color="green" /></Box>
                <Box>
                    <Typography variant="body3">{block.duration}</Typography>
                </Box>
            </Box>
        </Grid>
    </Grid>;
};

const BlockChain = ({ newBlocks }) => {
    const [state, setState] = React.useState({ blocks: [] });
    React.useEffect(() => {
        const oldHashes = state.blocks.map((b) => b.hash);
        setState((prevState) => {
            return {
                ...prevState,
                blocks: newBlocks.map((block) => {
                    return {
                        ...block,
                        newEntry: oldHashes.length && !oldHashes.includes(block.hash) 
                    };
                })
            };
        });
    }, [newBlocks]);

    return <PaperWithHeader
        header="LATEST BLOCKS"
        linkName={"SEE ALL"}
        linkAddress={"##"}
        height={500}
    >
        {state.blocks.map((b) => {
            return <ItemHandler block={b} key={b.hash} />;
        })}
    </PaperWithHeader>;
};

const NEW_BLOCKS = gql`
subscription NewBlocks($limit: Int) {
    # TODO order by block number
    Blocks(order_by: {createdAt: desc}, limit: $limit) {
        hash
        data
        createdAt
        updatedAt
    }
}`;

const BlockChainRenderer = () => {
    const { data, error, loading } = useSubscription(NEW_BLOCKS, { variables: { limit: PAGE_LIMIT } });
    if (loading) return <></>;
    if (error) return <></>;
    return <BlockChain newBlocks={data.Blocks} />;
};

export default BlockChainRenderer;
