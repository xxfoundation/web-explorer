import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import BlockEvents from "./blockEvents";

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

const BlockDetailedEvents = ({extrinsics, events}) => {
    const [value, setValue] = React.useState("extrinsics");

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="block event tabs">
                    <Tab label={`extrinsics ${extrinsics.length}`} value="extrinsics" id="simple-tab-1" aria-controls="tabpanel-extrinsics" />
                    <Tab label={`events ${events.length}`} value="events" id="simple-tab-2" aria-controls="tabpanel-events"/>
                </Tabs>
            </Box>
            <TabPanel value={value} name="extrinsics">
                lala
            </TabPanel>
            <TabPanel value={value} name="events">
                <BlockEvents hash={"123132"} number={"1231313"}  />
            </TabPanel>
        </Box>
    );
};

export default BlockDetailedEvents;
