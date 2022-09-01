import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { styled, Avatar, Stack, Tooltip, Typography } from '@mui/material';
import Hash, { Props as HashProps } from '.';
import React, { FC, useMemo } from 'react';
import { isValidXXNetworkAddress } from '../../utils';
import Link from '../Link';

type Props = HashProps & {
  name?: string;
  avatar?: string;
  disableAvatar?: boolean;
  disableUrl?: boolean;
  targetBlank?: boolean;
};

const CustomAvatar = styled(Avatar)(() => ({
  color: 'white'
}));

const Address: FC<Props> = ({ avatar, disableAvatar, disableUrl, name, targetBlank = false,  ...hashProps }) => {
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
      <CustomAvatar
        sx={{ width: 25, height: 25, mr: 1 }}
        src={avatar} alt={name} />
    );
  }, [name, avatar]);

  const isValid = isValidXXNetworkAddress(hashProps.value);
  const url = !disableUrl ? hashProps.url || `/accounts/${hashProps.value}` : undefined;

  return (
    <Stack direction={'row'} alignItems='center'>
      {!disableAvatar && avatarIcon}
      {name ? (
        targetBlank ? 
        <Link target='__blank' rel='noopener noreferrer' to={url}>{name}</Link>
        : <Link to={url}>{name}</Link>
      ) : (
        <Hash
          {...hashProps}
          targetBlank={targetBlank}
          url={url}
          valid={hashProps.valid === undefined ? isValid : hashProps.valid}
        />
      )}
    </Stack>
  );
};

export default Address;
