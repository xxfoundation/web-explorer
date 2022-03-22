import React from "react";
import { 
    Box,
    Grid,
    Menu,
    MenuItem,
} from "@mui/material";

import {  MenuButton } from "./menu.styles"; 

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

//export const DesktopNav = () => {
export default function DesktopNav() {
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (index, event) => {
        setAnchorEl({ [index]: event.currentTarget });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs key={100}>
                    <MenuButton
                        onClick={(e) => handleClick(100, e)}
                        endIcon = {<KeyboardArrowDownIcon />}
                    >
                        Blockchain
                    </MenuButton>
                    <Menu
                        anchorEl={anchorEl && anchorEl[100]}
                        keepMounted
                        open={anchorEl && Boolean(anchorEl[100])}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <MenuItem onClick={handleClose}>Blocks</MenuItem>
                        <MenuItem onClick={handleClose}>Extrinsics</MenuItem>
                        <MenuItem onClick={handleClose}>Transfers</MenuItem>
                        <MenuItem onClick={handleClose}>Events</MenuItem>
                    </Menu>
                </Grid>

                <Grid item xs>
                    <MenuButton id="staking-button" >
                        Staking
                    </MenuButton>
                </Grid>
                
                <Grid item xs key={200}>
                    <MenuButton
                        onClick={(e) => handleClick(200, e)}
                        endIcon = {<KeyboardArrowDownIcon />}
                    >
                        Governance
                    </MenuButton>
                    <Menu
                        anchorEl={anchorEl && anchorEl[200]}
                        keepMounted
                        open={anchorEl && Boolean(anchorEl[200])}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                    >
                        <MenuItem onClick={handleClose}>Democracy Proposal</MenuItem>
                        <MenuItem onClick={handleClose}>Referenda</MenuItem>
                        <MenuItem onClick={handleClose}>Motions</MenuItem>
                    </Menu>
                </Grid>

                <Grid item xs>
                    <MenuButton  id="accounts-button" >
                        Accounts
                    </MenuButton>
                </Grid>
            </Grid>
        </Box>
    );
}