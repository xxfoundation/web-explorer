import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { PaperWrap } from '../components/Paper/PaperWrap';

const NotFound = () => {
  return (
    <Container sx={{ my: 5 }}>
      <PaperWrap>
        <Stack spacing={2} alignItems={'center'}>
          <Typography>Hmmm...</Typography>
          <Typography>Page Not Found</Typography>
          <Button sx={{ borderRadius: '30px' }} variant='contained' size='large'>
            home
          </Button>
          <Divider variant='middle' flexItem orientation='vertical' />
          <DoDisturbIcon color='error' fontSize='large' />
        </Stack>
      </PaperWrap>
    </Container>
  );
};

export default NotFound;
