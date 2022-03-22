import React, { useState } from "react";

import { 
    IconButton,
    Box,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import {
    MobileTitle,
    MobileListLink,
    MobileTitleLink
} from "./menu.styles";

import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";

export default function MobileNav() {
    const [open, setState] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        
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
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                variant="temporary"
                sx={{ ".MuiDrawer-paper": { width: "100%", } }}
            >
                <Box sx={{
                    height: 1,
                    backgroundColor: "#4F4F4F",
                }}>
                    <IconButton sx={{ p: 0, ml: 3, mt: 3, mb: 4, }}>
                        <CloseIcon 
                            onClick={toggleDrawer(false)} 
                            sx={{color: "grey.A000"}}
                        />
                    </IconButton>
                    <Box sx={{ py: 2, px: 4, }}>
                        <Box sx={{pb: 2}}>
                            <MobileTitle>Blockchain</MobileTitle>
                            <MobileListLink href="" underline="none">Blocks</MobileListLink>
                            <MobileListLink href="" underline="none">Extrinsics</MobileListLink>
                            <MobileListLink href="" underline="none">Transfers</MobileListLink>
                            <MobileListLink href="" underline="none">Events</MobileListLink>
                        </Box>
                        
                        <Box sx={{pb: 2}}>
                            <MobileTitleLink underline="none">Staking</MobileTitleLink>
                        </Box>
                        
                        <Box sx={{pb: 2}}>
                            <MobileTitle>Governance</MobileTitle>
                            <MobileListLink href="" underline="none">Blocks</MobileListLink>
                            <MobileListLink href="" underline="none">Extrinsics</MobileListLink>
                            <MobileListLink href="" underline="none">Transfers</MobileListLink>
                            <MobileListLink href="" underline="none">Events</MobileListLink>
                        </Box>
                        
                        <Box>
                            <MobileTitleLink underline="none">Accounts</MobileTitleLink>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
}