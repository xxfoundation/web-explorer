import React from "react";

import { 
    Grid,
} from '@mui/material';

import {
    ListLink,
} from './Menu.styles';

const FooterMenu = () => {

    return (
        <Grid container spacing={3}>
            <Grid item xs>
                <ListLink href="">Home</ListLink>
                <ListLink href="">Mission</ListLink>
                <ListLink href="">xx messenger</ListLink>
                <ListLink href="">xx network</ListLink>
                <ListLink href="">xx coin</ListLink>
            </Grid>
            <Grid item xs>
                <ListLink href="">Node Runners</ListLink>
                <ListLink href="">Developers</ListLink>
                <ListLink href="">Explorer</ListLink>
                <ListLink href="">cMix Dashboard</ListLink>
                <ListLink href="">Technical Forum</ListLink>
            </Grid>
            <Grid item xs={12} md="auto">
                <ListLink href="">Overview</ListLink>
                <ListLink href="">Resources</ListLink>
                <ListLink href="">FAQ</ListLink>
                <ListLink href="">Team</ListLink>
                <ListLink href="">Contact Us</ListLink>
            </Grid>
        </Grid>    
    )

}

export default FooterMenu