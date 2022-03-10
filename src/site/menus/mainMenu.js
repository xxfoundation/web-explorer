import React from "react";
import { 
    Box,
    Grid,
    Menu,
    MenuItem,
} from '@mui/material';

import {
    MenuButton,
} from './menu.styles';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Nav = ({ mode }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
    <Box>
        <Grid container spacing={2}>
            <Grid item xs>
                <MenuButton
                    id="blockchain-button"
                    aria-controls={open ? 'blockchain-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon = {<KeyboardArrowDownIcon />}
                >
                    Blockchain
                </MenuButton>
                <Menu
                    id="blockchain-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'blockchain-button',
                    }}
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
            
            <Grid item xs>
                <MenuButton
                    id="governance-button"
                    aria-controls={open ? 'governance-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    endIcon = {<KeyboardArrowDownIcon />}
                >
                    Governance
                </MenuButton>
                <Menu
                    id="governance-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'governance-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Blocks</MenuItem>
                    <MenuItem onClick={handleClose}>Extrinsics</MenuItem>
                    <MenuItem onClick={handleClose}>Transfers</MenuItem>
                    <MenuItem onClick={handleClose}>Events</MenuItem>
                </Menu>
            </Grid>

            <Grid item xs>
                <MenuButton
                    id="accounts-button"
                >
                    Accounts
                </MenuButton>
            </Grid>
        </Grid>
    </Box>
    );
};

export const MobileNav = ({ isLoading, disabled, children, ...rest }) => (
    <div>mobile navigation</div>
);