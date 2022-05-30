import { Grid } from '@mui/material';
import React, { FC } from 'react';
import Socials from '../../../../components/Socials';
import { Identity } from '../../../../schemas/accounts.schema';

const SocialIconsGroup: FC<{ identity: Identity }> = ({ identity }) => {
  const socials: Record<string, string> = {};
  if (identity.email) {
    socials.email = identity.email;
  }
  if (identity.twitter) {
    socials.twitter = identity.twitter;
  }

  // github: '#hey',
  // telegram: '#yo',
  // discord: '#sup'
  if (socials.twitter || socials.email) {
    return (
      <Grid item>
        <Socials socials={socials} />
      </Grid>
    );
  }
  return <></>;
};

export default SocialIconsGroup;
