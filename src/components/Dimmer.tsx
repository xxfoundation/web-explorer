import { styled } from '@mui/material';

const Dimmer = styled('div')<{ active: boolean }>(({ active }) => ({
  pointerEvents: 'none',
  transition: 'all 0.3s ease-in-out',
  background: '#000',
  opacity: 0,
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 5,
  ...(active && {
    pointerEvents: 'all',
    opacity: 0.5,
  })
}));

export default Dimmer;
