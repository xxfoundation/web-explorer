import { Grid, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Summary from "./components/summary";

const BlockProducer = () => {
    const { nameOrId } = useParams();
    return <Grid container spacing={2}>
        <Grid item><Typography>breadcrumb</Typography></Grid>
        <Grid item xs={12}><Typography variant={"h1"}>{nameOrId}</Typography></Grid>
        <Grid item xs={12}><Summary nameOrId={nameOrId} /></Grid>
        <Grid item xs={12}>table</Grid>
    </Grid>;
};

export default BlockProducer;
