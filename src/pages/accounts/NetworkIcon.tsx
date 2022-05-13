import React, { FC } from 'react';
import { Box, styled } from '@mui/material';
import xxnetworkCircleLogo from '../../assets/images/logos/xx-network-circle-logo.svg'

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '50%',
  position: 'relative',
  paddingBottom: '100%',
}));

const Center = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const Icon = styled('img')({
  width: '33%'
});

const AvatarIcon: FC = () => {
  return (
    <Container>
      <Center>
        <Icon
          src={xxnetworkCircleLogo}
          alt='xxnetwork logo'
        />
      </Center>
    </Container>
  );
};

export default AvatarIcon;