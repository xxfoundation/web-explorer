import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import SlashStroke from '../assets/images/icons/SlashStroke.png';
import { PaperWrap } from '../components/Paper/PaperWrap';
import { theme } from '../themes/default';

const NotFound = () => {
  return (
    <Container sx={{ my: 5 }} maxWidth='sm'>
      <PaperWrap>
        <Stack spacing={2} alignItems={'center'}>
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
              height: '35px'
            }}
            variant='contained'
          >
            <Typography fontSize={'12px'} fontWeight={500} letterSpacing={1}>
              home
            </Typography>
          </Button>
          <Divider flexItem orientation='horizontal' />
          <img src={SlashStroke} alt='not found icon' style={{ margin: '40px auto' }} />
        </Stack>
      </PaperWrap>
    </Container>
  );
};

export default NotFound;
