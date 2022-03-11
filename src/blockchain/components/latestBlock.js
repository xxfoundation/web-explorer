import { gql, useQuery } from '@apollo/client';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {
    Box,
    Grid, Link,
    Typography
} from '@mui/material';
import { useEffect } from 'react';
import PaperWithHeader from './paperWithHeader';

const LATEST_BLOCKS = gql`
query LastestBlocks {
    Blocks(order_by: {createdAt: desc}, limit: 2) {
        data
        hash
    }
}
`;

const ON_NEW_BLOCKS = gql`
subscription NewBlocks {
    Blocks(order_by: {createdAt: desc}, limit: 1) {
        hash
        data
    }
}
`

const statusToIconMap = (status) => {
    switch (status) {
        case "pending":

            return {
                "label": "pending",
                "icon": <AccessTimeIcon color="bad" />
            }

        default:
            return {
                "label": "undefinded",
                "icon": <AccessTimeIcon color="green" />
            }
    }
}

const ItemHandler = (block) => {
    const { label, icon } = statusToIconMap(block.status)
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
    </Grid>
}

const Blockchain = ({ data, loading, error, subscriptionUpdate }) => {
    useEffect(() => {
        subscriptionUpdate()
    })
    if (loading) return []
    if (error) return []
    return data.Blocks.map(ItemHandler)
}

const BlockChainRenderer = () => {
    const { subscribeToMore, ...result } = useQuery(LATEST_BLOCKS)
    return <PaperWithHeader
        header="LATEST BLOCKS"
        linkName={"SEE ALL"}
        linkAddress={"##"}
        height={500}
    >
        <Blockchain {...result} subscriptionUpdate={() => {
            subscribeToMore({
                document: ON_NEW_BLOCKS,
                updateQuery: (prev, { subscriptionData: { data } }) => {
                    console.log(`calling updates for ${JSON.stringify(data)}`)
                    if (!data) return prev
                    return { 'Blocks': data.Blocks }
                }
            })
        }} />
    </PaperWithHeader>
}

export default BlockChainRenderer
