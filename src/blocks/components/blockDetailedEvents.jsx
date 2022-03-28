import { Box, Divider, Stack, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import BlockEvents from "./blockEvents";
import BlockExtrinsics from "./blockExtrinsics";

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

const hash = "123123", number ="1231313";

const BlockDetailedEvents = ({extrinsics, events}) => {
    const [value, setValue] = React.useState("extrinsics");

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="block event tabs">
                    <Tab label={<TabText message="extrinsics" count={extrinsics.length} />} value="extrinsics" id="simple-tab-1" aria-controls="tabpanel-extrinsics" />
                    <Tab label={<TabText message="events" count={events.length} />} value="events" id="simple-tab-2" aria-controls="tabpanel-events"/>
                </Tabs>
            </Box>
            <TabPanel value={value} name="extrinsics">
                <BlockExtrinsics hash={hash} number={number}/>
            </TabPanel>
            <TabPanel value={value} name="events">
                <BlockEvents hash={hash} number={number}/>
            </TabPanel>
        </Box>
    );
};

export default BlockDetailedEvents;
