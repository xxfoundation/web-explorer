import React, { FC } from 'react';
import { Typography, Stack } from '@mui/material';


type Props = {
  selected: string;
  onSelect: (addr: string) => void;
}

const WalletSelection: FC<Props> = () => {
  return (
    <>
      <Stack spacing={4}>
        <Typography variant='h2'>
          Select Wallet
        </Typography>
      </Stack>
    </>
  );
}

export default WalletSelection;

