import {
    Box, Grid, Link,
    Tooltip,
    Typography
} from "@mui/material";
import React from "react";
import PaperWithHeader from "./paperWithHeader";

const transferences = {
    items: [...Array(6).keys()].map((i) => {
        return {
            "instrinsicindex": "314658-5",  // TODO mask?
            "id": i,
            "from": "Oxacc15dc74899999", // TODO use just mask instead of manipulating the value
            "to": "Oxacc15dc748888",
            "duration": 30
        };
    })
};

const addMaskToTransactionTargets = (hash) => {
    if (hash.length > 15) {
        return <Tooltip title={hash} placement="top" arrow>
            <Link href={"#"} underline="hover">
                {hash.split("").slice(0, 12).join("") + "..."}
            </Link>
        </Tooltip>;
    }

    return <Link href={"#"} underline="hover">{hash}</Link>;
};

const listItemSecondaryText = (data) => {
    return (
        <Grid component={"span"} container maxWidth={200}>
            <Grid item component={"span"} xs={4}>
                <Typography variant="body3">FROM</Typography>
            </Grid>
            <Grid item component={"span"}>
                {addMaskToTransactionTargets(data.from)}
            </Grid>
            <Grid item component={"span"} xs={4}>
                <Typography variant="body3">TO</Typography>
            </Grid>
            <Grid item component={"span"}>
                {addMaskToTransactionTargets(data.to)}
            </Grid>
        </Grid>
    );
};

const ItemHandler = (currentData) => {
    return (
        <Box sx={{ mb: 4, }} key={currentData.id}>
            <Typography variant="body2" sx={{ mb: 1, }}>
                INSTRINSIC INDEX NO. <Link href={"#"} underline="hover">{currentData.id}</Link>
            </Typography>
            <Grid container>
                <Grid item xs>
                    <Typography variant="body3" sx={{ lineHeight: 1.75, }}>
                        {listItemSecondaryText(currentData)}
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="body3" sx={{ lineHeight: 1.75, }}>
                        {currentData.duration} sec
                    </Typography>
                </Grid>
            </Grid>
        </Box>);
};

const transfersList = () => {
    return(
        <PaperWithHeader
            header="TRANSFERS"
            linkName={ "SEE ALL" }
            linkAddress={ "##" }
            height={500}
        >
            {transferences.items.map(ItemHandler)}
        </PaperWithHeader>
    );
};

export default transfersList;
