import {
  Button,
  Container,
  Divider,
  linkClasses,
  styled,
  Typography, useMediaQuery
} from '@mui/material';
import React, { FC } from 'react';
import SlashStroke from '../assets/images/icons/SlashStroke.svg';
import Link from '../components/Link';
import PaperStyled from '../components/Paper/PaperWrap.styled';

const InfoTitle = styled(Typography)(({ theme: th }) => {
  return {
    fontSize: '49px',
    fontWeight: 500,
    background:
      '-webkit-linear-gradient(68.04deg, #4668BF 14.57%, #2581D6 41.33%, #019CB1 72.19%, #01ACAC 96.47%, #959595 112.54%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    [th.breakpoints.down('sm')]: {
      fontSize: '30px'
    }
  };
});

const ResponsiveDivider = styled(Divider)(({ theme: th }) => {
  return {
    maxWidth: useMediaQuery(th.breakpoints.down('sm')) ? '90%' : '60%',
    margin: '0 auto'
  };
});

const RoundedButton = styled(Button)(({}) => {
  return {
    borderRadius: '30px',
    width: '84px',
    height: '35px',
    marginTop: '30px',
    marginBottom: '50px',
    [`& .${linkClasses.root}`]: {
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: 1,
      color: 'white',
      '&:hover': {
        textDecoration: 'none'
      }
    }
  };
});

const NotFound: FC<{ message?: string }> = ({ message = 'Page Not Found'}) => {
  return (
    <Container sx={{ my: 6, textAlign: 'center' }} maxWidth='sm'>
      <PaperStyled sx={{ paddingY: '60px' }}>
        <Typography variant='subtitle2'>Hmmm...</Typography>
        <InfoTitle>{message}</InfoTitle>
        <RoundedButton variant='contained'>
          <Link to={'/'}>home</Link>
        </RoundedButton>
        <ResponsiveDivider flexItem orientation='horizontal' />
        <img src={SlashStroke} alt='not found icon' style={{ margin: '60px auto 20px' }} />
      </PaperStyled>
    </Container>
  );
};

export default NotFound;
