import { Button, Container, Divider, dividerClasses, Typography } from '@mui/material';
import React from 'react';
import SlashStroke from '../assets/images/icons/SlashStroke.svg';
import Link from '../components/Link';
import { PaperStyled } from '../components/Paper/PaperWrap.styled';
import { theme } from '../themes/default';

const NotFound = () => {
  return (
    <Container sx={{ my: 6, textAlign: 'center' }} maxWidth='sm'>
      <PaperStyled sx={{ paddingY: '60px' }}>
        <Typography variant='subtitle2'>
          Hmmm...
        </Typography>
        <Typography
          fontSize={'49px'}
          fontWeight={500}
          sx={{
            background:
              '-webkit-linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Page Not Found
        </Typography>
        <Button
          sx={{
            borderRadius: '30px',
            width: '84px',
            height: '35px',
            marginTop: '30px',
            marginBottom: '50px'
          }}
          variant='contained'
        >
          <Link
            to={'/'}
            sx={{
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: 1,
              color: 'white',
              '&:hover': {
                textDecoration: 'none'
              }
            }}
          >
            home
          </Link>
        </Button>
        <Divider
          flexItem
          orientation='horizontal'
          sx={{
            [`&.${dividerClasses.root}`]: {
              color: theme.palette.divider,
              borderColor: theme.palette.divider,
              maxWidth: '60%',
              margin: '0 auto'
            }
          }}
        />
        <img src={SlashStroke} alt='not found icon' style={{ margin: '60px auto 20px' }} />
      </PaperStyled>
    </Container>
  );
};

export default NotFound;
