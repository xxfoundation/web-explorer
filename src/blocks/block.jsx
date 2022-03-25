import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Avatar, ButtonGroup, Divider, Grid, IconButton, Link, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useParams } from "react-router-dom";

const data = {
    time: "2022-01-28 03:39:24 (+utc)",
    status: "finalized",
    era: 48,
    hash: "0x8fad1abb3c2d50e6c075c9c2764800ac41ea67bf40a874f9f04de990b7b74680",
    parentHash: "0x6b836d45a934c4a008e316159450f0b01470056aae34798ed16ef7d412912dff",
    stateRoot: "0xb63e96a5fabbb2644c13348dd0723c83963270557dfc04d341b76c4c55aa3895",
    extrinsicsRoot: "0x43f58a2e0d8c392ab8261a1b89a69fa4eeb2d1ce4332bae9fc734706eda49266",
    blockProducer: {},
    blockTime: 123131,
    specVersion: 102
};

const BackAndForwardArrows = () => {
    return <ButtonGroup>
        <IconButton aria-label="back">
            <ArrowBackIcon />
        </IconButton>
        <IconButton arial-label="forward">
            <ArrowForwardIcon />
        </IconButton>
    </ButtonGroup>;
};

const ProducerField = (props) => {
    return <Box>
        <Stack direction={"row"} spacing={3} justifyContent={"space-between"}>
            <Stack direction={"row"} spacing={1}>
                <RemoveCircleIcon />
                <Typography>{props.data.dunno || "dunno"}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
                <Avatar alt={props.data.name} src={props.data.icon || "??"} />
                <Typography>{props.data.hash || "hash"}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
                <Divider orientation="vertical"></Divider>
                <ContentCopyIcon />
            </Stack>
        </Stack>
    </Box>;
};

const BlockInfo = ({number, data}) => {
    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <Stack direction={"row"} justifyContent={"space-between"}>
                <Typography>Block No. {number}</Typography>
                <Stack direction={"row"} justifyContent={"space-around"} spacing={2} >
                    <Link>blocks</Link>
                    <Divider orientation="vertical" flexItem />
                    <BackAndForwardArrows />  
                </Stack>             
            </Stack>
        </Grid>
        <Grid item xs={12}>
            <Paper>
                <Grid container spacing={2} rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={4}>time</Grid>
                    <Grid item xs={12} sm={12} md={8}>{data.time}</Grid>

                    <Grid item xs={12} sm={12} md={4}>status</Grid>
                    <Grid item xs={12} sm={12} md={8}>{data.status}</Grid>

                    <Grid item xs={12} sm={12} md={4}>era</Grid>
                    <Grid item xs={12} sm={12} md={8}>{data.era}</Grid>
                
                    <Grid item xs={12} sm={12} md={4}>hash</Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Stack direction={"row"} spacing={1}>
                            <Typography>{data.hash}</Typography>
                            <Divider orientation="vertical" flexItem />
                            <ContentCopyIcon />
                        </Stack>
                    </Grid>
                
                    <Grid item xs={12} sm={12} md={4}>parent hash</Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Stack direction={"row"} spacing={1}>
                            <Typography>{data.parentHash}</Typography>
                            <Divider orientation="vertical" flexItem />
                            <BackAndForwardArrows />
                        </Stack>
                    </Grid>
                
                    <Grid item xs={12} sm={12} md={4}>state root</Grid>
                    <Grid item xs={12} sm={12} md={8}>{data.stateRoot}</Grid>
                
                    <Grid item xs={12} sm={12} md={4}>extrinsics root</Grid>
                    <Grid item xs={12} sm={12} md={8}>{data.extrinsicsRoot}</Grid>
                
                    <Grid item xs={12} sm={12} md={4}>block producer</Grid>
                    <Grid item xs={12} sm={12} md={8}><ProducerField data={data.blockProducer}/></Grid>
                
                    <Grid item xs={12} sm={12} md={4}>blockTime</Grid>
                    <Grid item xs={12} sm={12} md={8}>{data.blockTime}</Grid>
                
                    <Grid item xs={12} sm={12} md={4}>spec version</Grid>
                    <Grid item xs={12} sm={12} md={8}><Link href="#">{data.specVersion}</Link></Grid>
                </Grid>
            </Paper>
        </Grid>
        <Grid item></Grid>
    </Grid>;
};

const BlockDetailedEvents = () => {
    return <>
        <div>{"block details?"}</div>
    </>;
};

const Block = () => {
    const { number } = useParams();
    return <>
        <BlockInfo number={number} data={data} />

        <BlockDetailedEvents />
    </>;
};
export default Block;
