import { Link, Stack, styled } from '@mui/material';
import React from 'react';

const images = require.context('../assets/images/socials/', true);

const SocialLink = styled(Link)({
  display: 'inline-block',
  position: 'relative',
  width: '1.25rem',
  height: '1.25rem'
});

const SocialsLogo = styled('span')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%'
}));

const SocialsImage = styled('img')({
  width: '0.75rem'
});

type Props = {
  socials: Record<string, string | undefined>;
};

const urlMappers: Record<string, (a: string) => string> = {
  twitter: (username: string) => `https://twitter.com/${username}`,
  email: (email: string) => `mailto:${email}`,
  github: (username: string) => `https://github.com/${username}`,
}

const Socials: React.FC<Props> = ({ socials }) => {
  return (
    <Stack direction='row' sx={{ mt: 2, mb: 2 }} spacing={1}>
      {Object.entries(socials).filter(([,username]) => !!username).map(
        ([social, username]) =>
          images(`./${social}.svg`) && username && (
            <SocialLink
              key={`${social}-${username}`}
              href={urlMappers[social]?.(username)}
              target='_blank'>
              <SocialsLogo>
                <SocialsImage src={images(`./${social}.svg`)} />
              </SocialsLogo>
            </SocialLink>
          )
      )}
    </Stack>
  );
};

export default Socials;
