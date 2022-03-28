import { Avatar, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CopyButton from "./copyButton";

function textWithCopy(value, content) {
    return <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {content}
        <Divider orientation="vertical" flexItem />
        <CopyButton value={value} />
    </Stack>;
}

const AvatarLabel = ({src, srcAlt, text}) => {
    return <>
        <Avatar alt={srcAlt} src={src} />
        <Typography>{text}</Typography>
    </>;
};

const SummaryPaper = ({data}) => {
    return <Paper>
        <Grid container spacing={2} rowSpacing={2}>
            {data.map(([label, value]) => {
                return <>
                    <Grid item xs={12} sm={12} md={4}>
                        {label}
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        {value}
                    </Grid>
                </>;
            })}
        </Grid>
    </Paper>;
};

export { textWithCopy, AvatarLabel, SummaryPaper };
