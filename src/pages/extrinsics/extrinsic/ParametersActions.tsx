import { Button, styled } from '@mui/material';
import React, { FC } from 'react';
import { callbackCopyMessage } from '../../../components/buttons/CopyButton';
import useCopyClipboard from '../../../hooks/useCopyToClibboard';

const RoundedButton = styled(Button)(({}) => {
  return {
    borderRadius: '30px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: 1,
    color: 'white'
  };
});

const ParametersActions: FC<{ data: unknown }> = ({ data }) => {
  const staticCopy = useCopyClipboard()[1];
  return (
    <>
      <RoundedButton
        variant='contained'
        onClick={() => staticCopy(JSON.stringify(data), callbackCopyMessage)}
      >
        copy
      </RoundedButton>
      <RoundedButton variant='contained' disabled sx={{ marginLeft: '24px' }}>
        view code
      </RoundedButton>
    </>
  );
};

export default ParametersActions;
