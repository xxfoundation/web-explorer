import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import Hash, { Props as HashProps } from '.';
import React, { FC, useMemo } from 'react';
import { isValidXXNetworkAddress } from '../../utils';

type Props = HashProps & {
  name?: string;
  avatar?: string;
};

const Address: FC<Props> = ({ avatar, name, ...hashProps }) => {
  const avatarIcon = useMemo(() => {
    return name ? (
      <Tooltip
        title={
          <Typography fontSize={'10px'} fontWeight={400}>
            Identity Level: No Judgement
          </Typography>
        }
        arrow
      >
        <RemoveCircleIcon sx={{ mr: 1 }} />
      </Tooltip>
    ) : (
      <Avatar sx={{ width: 25, height: 25, mr: 1 }} src={avatar} alt={name} />
    );
  }, [name, avatar]);

  const isValid = isValidXXNetworkAddress(hashProps.value);
  const url = hashProps.url || `/accounts/${hashProps.value}`;

  return (
    <Stack direction={'row'} alignItems='center'>
      {avatarIcon}
      <Hash {...hashProps} url={url} valid={isValid} />
    </Stack>
  )
};

export default Address;
