import React from "react";

import { 
    Grid,
} from '@mui/material';

import {
    ListLink,
} from './menu.styles';

const FooterMenu = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs>
                <ListLink href="" underline="hover">Home</ListLink>
                <ListLink href="" underline="hover">Mission</ListLink>
                <ListLink href="" underline="hover">xx messenger</ListLink>
                <ListLink href="" underline="hover">xx network</ListLink>
                <ListLink href="" underline="hover">xx coin</ListLink>
            </Grid>
            <Grid item xs>
                <ListLink href="" underline="hover">Node Runners</ListLink>
                <ListLink href="" underline="hover">Developers</ListLink>
                <ListLink href="" underline="hover">Explorer</ListLink>
                <ListLink href="" underline="hover">cMix Dashboard</ListLink>
                <ListLink href="" underline="hover">Technical Forum</ListLink>
            </Grid>
            <Grid item xs={12} md="auto">
                <ListLink href="" underline="hover">Overview</ListLink>
                <ListLink href="" underline="hover">Resources</ListLink>
                <ListLink href="" underline="hover">FAQ</ListLink>
                <ListLink href="" underline="hover">Team</ListLink>
                <ListLink href="" underline="hover">Contact Us</ListLink>
            </Grid>
        </Grid>    
    )

}

export default FooterMenu