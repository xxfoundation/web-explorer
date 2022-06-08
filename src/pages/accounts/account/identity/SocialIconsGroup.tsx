import { Grid } from '@mui/material';
import React, { FC } from 'react';
import Socials from '../../../../components/Socials';
import { Identity } from '../../../../schemas/accounts.schema';

const SocialIconsGroup: FC<{ identity: Identity }> = ({ identity }) => {
  const { email, twitter } = identity;

  if (twitter || email) {
    return (
      <Grid item>
        <Socials socials={{ email, twitter }} />
      </Grid>
    );
  }

  return <></>;
};

export default SocialIconsGroup;
