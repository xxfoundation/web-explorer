import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { Avatar, ButtonGroup, Divider, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { theme } from "../../themes/default";

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
const BlockSummary = ({number, data}) => {
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
                    <Grid item xs={12} sm={12} md={8}><CheckCircleOutlineIcon color={theme.palette.success.main}/>{data.status}</Grid>

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
                    <Grid item xs={12} sm={12} md={8}><CheckCircleOutlineIcon color={theme.palette.success.main} />{data.stateRoot}</Grid>
                
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
    </Grid>;
};

export default BlockSummary;
