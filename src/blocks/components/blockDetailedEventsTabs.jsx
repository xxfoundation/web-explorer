import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { TabPanel, TabText } from "../../components/tabs";
import EventsTable from "./eventsTable";
import ExtrinsicsTable from "./extrinsicsTable";

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
                <ExtrinsicsTable hash={hash} number={number} />
            </TabPanel>
            <TabPanel value={value} name="events">
                <EventsTable hash={hash} number={number} />
            </TabPanel>
        </Box>
    );
};

export default BlockDetailedEvents;
