import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ButtonGroup, IconButton, IconButtonProps } from '@mui/material';
import { default as React, FC } from 'react';

export const BackAndForwardArrows: FC<{ back: IconButtonProps; forward: IconButtonProps }> = ({
  back,
  forward
}) => {
  return (
    <ButtonGroup>
      <IconButton color={'primary'} aria-label='back' size='small' {...back}>
        <ArrowBackIcon fontSize='small' />
      </IconButton>
      <IconButton color={'primary'} arial-label='forward' size='small' {...forward}>
        <ArrowForwardIcon fontSize='small' />
      </IconButton>
    </ButtonGroup>
  );
};

export default BackAndForwardArrows;
