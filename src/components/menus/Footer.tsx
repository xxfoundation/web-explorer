import { Grid } from '@mui/material';
import React from 'react';
import { ListLink } from './menu.styles';

const FooterMenu = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <ListLink to='/' underline='hover'>
          Home
        </ListLink>
        <ListLink to='' underline='hover'>
          Mission
        </ListLink>
        <ListLink to='' underline='hover'>
          xx messenger
        </ListLink>
        <ListLink to='' underline='hover'>
          xx network
        </ListLink>
        <ListLink to='' underline='hover'>
          xx coin
        </ListLink>
      </Grid>
      <Grid item xs>
        <ListLink to='' underline='hover'>
          Node Runners
        </ListLink>
        <ListLink to='' underline='hover'>
          Developers
        </ListLink>
        <ListLink to='' underline='hover'>
          Explorer
        </ListLink>
        <ListLink to='' underline='hover'>
          cMix Dashboard
        </ListLink>
        <ListLink to='' underline='hover'>
          Technical Forum
        </ListLink>
      </Grid>
      <Grid item xs={12} md='auto'>
        <ListLink to='' underline='hover'>
          Overview
        </ListLink>
        <ListLink to='' underline='hover'>
          Resources
        </ListLink>
        <ListLink to='' underline='hover'>
          FAQ
        </ListLink>
        <ListLink to='' underline='hover'>
          Team
        </ListLink>
        <ListLink to='' underline='hover'>
          Contact Us
        </ListLink>
      </Grid>
    </Grid>
  );
};

export default FooterMenu;
