import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

//export const MainNavigation = () => (
export default function MobileNav() {

    /*
    react useState hook to save the current open/close state of the drawer,
    normally variables dissapear afte the function was executed
    */
    const [open, setState] = useState(false);


    /*
    function that is being called every time the drawer should open or close,
    the keys tab and shift are excluded so the user can focus between
    the elements with the keys
    */
    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        //changes the function state according to the value of open
        setState(open);
    };

    return (

        <Box>

            <IconButton 
                edge="start" 
                color="inherit" 
                aria-label="open drawer" 
                onClick={toggleDrawer(true)}
                sx={{ 
                    m: 0,
                    mr: 2,
                    p: 0,
                    display: {
                        xs: "block",
                        sm: "none",
                    }
                }}
            >
                <MenuIcon />
            </IconButton>

            {/* The outside of the drawer */}
            <Drawer
                //from which side the drawer slides in
                anchor="left"
                //if open is true --> drawer is shown
                open={open}
                //function that is called when the drawer should close
                onClose={toggleDrawer(false)}
                //function that is called when the drawer should open
                onOpen={toggleDrawer(true)}
                // only show on small devices
                variant="temporary"
            >
                {/* The inside of the drawer */}
                <Box sx={{
                    p: 2,
                    height: 1,
                    backgroundColor: "#4F4F4F",
                    color: "#ffffff",
                    width: "100%",
                }}>

                    {/* 
                    when clicking the icon it calls the function toggleDrawer 
                    and closes the drawer by setting the variable open to false
                    */}
                    <IconButton sx={{mb: 2}}>
                        <CloseIcon 
                            onClick={toggleDrawer(false)} 
                            sx={{color: "primary.contrastText"}}
                        />
                    </IconButton>

                    <Divider sx={{mb: 2}} />

                    <Box sx={{mb: 2}}>
                        <ListItemButton>
                            <ListItemText primary="Blockchain" />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText primary="Staking" />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText primary="Governance" />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText primary="Accounts" />
                        </ListItemButton>
                    </Box>

                </Box>
            
            </Drawer>
        </Box>

    );
}