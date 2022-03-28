import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const TabPanel = ({ children, value, name })  => {
    return (
        <div
            role="tabpanel"
            id={`tabpanel-${value}`}
            aria-labelledby={`tab-${value}`}
        >
            {value === name && <Box sx={{ p: 3 }}>
                {children}
            </Box>}
        </div>
    );
};

const TabText = ({message, count}) => {
    return <Stack direction="row" divider={<Divider orientation="vertical" flexItem spacing={2} />}>
        <Typography>{message}</Typography>
        <Typography>{count}</Typography>
    </Stack>;
};

export { TabPanel, TabText };
