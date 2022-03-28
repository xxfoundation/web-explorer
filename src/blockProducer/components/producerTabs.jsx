import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { TabPanel, TabText } from "../../components/tabs";
import Eras from "./eras";
import NominatorsTable from "./nominatorsTable";

const ProducerTabs = ({nominators, eras}) => {
    const [value, setValue] = React.useState("nominators");

    const handleChange = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Box>
                <Tabs value={value} onChange={handleChange} aria-label="producers tables tabs">
                    <Tab label={<TabText message="nominators" count={nominators.length} />} value="nominators" id="simple-tab-1" aria-controls="tabpanel-nominators" />
                    <Tab label={<TabText message="eras" count={eras.length} />} value="eras" id="simple-tab-2" aria-controls="tabpanel-eras"/>
                </Tabs>
            </Box>
            <TabPanel value={value} name="nominators">
                <NominatorsTable />
            </TabPanel>
            <TabPanel value={value} name="eras">
                <Eras />
            </TabPanel>
        </Box>
    );
};
export default ProducerTabs;
