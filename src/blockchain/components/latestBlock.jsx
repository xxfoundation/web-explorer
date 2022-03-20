import { gql, useApolloClient, useSubscription } from "@apollo/client";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Box,
    Grid, Link,
    Typography
} from "@mui/material";
import React, { useCallback } from "react";
import PaperWithHeader from "./paperWithHeader";

const ON_NEW_BLOCKS = gql`
subscription NewBlocks {
    Blocks(order_by: {createdAt: desc}, limit: 1) {
        hash
        data
        createdAt
        updatedAt
    }
}
`;

const PAGE_LIMIT = 4;

const GET_OLDER_BLOCKS = gql`
query MyQuery($createdAt: timestamptz, $limit: Int) {
  Blocks(where: {createdAt: {_lt: $createdAt}}, limit: $limit, order_by: {createdAt: desc}) {
    data
    hash
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
                <Link href="" underline="hover" variant="body3">
                    {block.instrinsic} instrinsic
                </Link>
                <Typography variant="body3">|</Typography>
                <Link href="" underline="hover" variant="body3">{block.events} event</Link>
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

const BlockChain = (props) => {
    const client = useApolloClient();
    const [state, setState] = React.useState({
        blocks: [],
    });

    const loadOlder = useCallback(async (block) => {
        const { data } = await client.query({
            query: GET_OLDER_BLOCKS,
            variables: { createdAt: block.createdAt, limit: PAGE_LIMIT - 1 }
        });
        // TODO handle error and loading
        if (data) {
            setState((prevState) => {
                return { ...prevState, blocks: [block, ...data.Blocks] };
            });
        }
    }, []);

    React.useEffect(() => {
        if (!(state.blocks && state.blocks.length)) {
            loadOlder(props.newBlocks[0]);
        } else {
            setState((prevState) => {
                const olderBlocks = prevState.blocks.length === PAGE_LIMIT
                    ? prevState.blocks.slice(props.newBlocks.length)
                    : [...prevState.blocks];
                return { ...prevState, blocks: [...props.newBlocks, ...olderBlocks] };
            });
        }
    }, [props.newBlocks]);

    // TODO receive the new block and 
    return <PaperWithHeader
        header="LATEST BLOCKS"
        linkName={"SEE ALL"}
        linkAddress={"##"}
        height={500}
    >
        {state.blocks.map(ItemHandler)}
    </PaperWithHeader>;
};

const BlockChainRenderer = () => {
    const { data, error, loading } = useSubscription(ON_NEW_BLOCKS);
    if (loading) return <></>;
    if (error) return <></>;
    return <BlockChain newBlocks={data.Blocks} />;
};

export default BlockChainRenderer;
