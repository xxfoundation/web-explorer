import { Button, Container, Divider, dividerClasses, linkClasses, Typography } from '@mui/material';
import React from 'react';
import SlashStroke from '../assets/images/icons/SlashStroke.svg';
import Link from '../components/Link';
import { PaperStyled } from '../components/Paper/PaperWrap.styled';
import { theme } from '../themes/default';

const NotFound = () => {
  return (
    <Container sx={{ my: 6, textAlign: 'center' }} maxWidth='sm'>
      <PaperStyled sx={{ paddingY: '60px' }}>
        <Typography fontSize={'20px'} fontWeight={'400'} color={theme.palette.grey[500]}>
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
            marginY: '40px'
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
              [`& .${linkClasses.root}`]: {
                color: 'red',
                textDecoration: null
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
            [`& .${dividerClasses.root}`]: {
              color: 'red',
              borderColor: 'red'
            }
          }}
        />
        <img src={SlashStroke} alt='not found icon' style={{ margin: '60px auto 0' }} />
      </PaperStyled>
    </Container>
  );
};

export default NotFound;
