import React, { FC, useCallback, useState } from 'react';
import { Box, Button, Dialog, Stack, TextField, Typography } from '@mui/material';
import useInput from '../../../hooks/useInput';

type Props = {
  open: boolean;
  onClose: (value: unknown) => void;
}

const KeyfileDialog: FC<Props> = ({ onClose, open }) => {
  const [file, setFile] = useState('');
  const [password, setPassword] = useInput('');

  const handleClose = useCallback(() => {
    onClose(undefined);
  }, [onClose]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <Stack spacing={3} sx={{ p: { md: 5, sm: 3, xs: 2 } }}>
        <Typography variant='h3'>
          Upload Backup File
        </Typography>
        <Typography variant='body3'>
          Supply a backed-up JSON file, encrypted with
          your account-specific password
        </Typography>
        <Stack direction='row' justifyContent='center' spacing={2}>
          <Box>
            <Button
              variant='contained'
              component='label'
            >
              Upload File
              <input
                accept='application/JSON'
                id='json-import'
                type='file'
                hidden
              />
            </Button>
          </Box>
          <Box>
            <TextField
              type='password'
              label='Password'
              size='small'
              value={password}
              onChange={setPassword} />
          </Box>
        </Stack>
        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={handleClose} variant='contained'>
            Import
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
}

export default KeyfileDialog;
