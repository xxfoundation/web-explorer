import React, { useState } from "react";

import { 
    IconButton,
    Box,
} from "@mui/material";

import {
    MobileTitle,
    MobileListLink,
    MobileTitleLink,
} from "./menu.styles";

import { theme } from "../../themes/default";
import MenuIcon from "@mui/icons-material/Menu";
import { CloseIcon } from "../icons/sfIcons.js";

import Drawer from "@mui/material/Drawer";

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
                    <IconButton 
                        onClick={toggleDrawer(false)}
                        sx={{ p: 0, ml: 4, mt: 4, mb: 4, }} 
                    >
                        <CloseIcon
                            color={theme.palette.primary.contrastText}
                            width="14px"
                            
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