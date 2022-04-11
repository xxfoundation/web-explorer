import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import { decodeAddress } from '@polkadot/keyring';
import { isHex } from '@polkadot/util';
import React, { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

type IdProperties = {
  link?: string;
  truncated?: boolean;
  value: string;
};

const shortString = (addr: string, offset = 5, replaceStr = '...') =>
  addr
    ? addr.slice(0, offset + 2).concat(replaceStr, addr.slice(addr.length - offset, addr.length))
    : '';

const contentRenderer = (
  text: string,
  isValid: boolean,
  link?: IdProperties['link']
) => {
  return (
    <Typography color={isValid ? 'info' : 'red'}>
      {link ? <Link to={link}>{text}</Link> : text}
    </Typography>
  );
};

const Hash: FC<IdProperties> = ({ link, truncated, value }) => {
  const isValid = isHex(value, 256);
  return contentRenderer(truncated ? shortString(value) : value, isValid, link);
};

// Check if an address is a valid xx network address
// Use ss58 format 55, which is registered for xx network
const isValidXXNetworkAddress = (address: string): boolean => {
  try {
    decodeAddress(address, false, 55);
    return true;
  } catch (error) {
    return false;
  }
};

const Address: FC<IdProperties & { name?: string; avatarUrl?: string }> = ({
  avatarUrl,
  link,
  name,
  truncated,
  value
}) => {
  const avatar = useMemo(() => {
    return name ? (
      <Avatar sx={{ width: 25, height: 25, mr: 1 }} src={avatarUrl} alt={name} />
    ) : (
      <Tooltip title='Identity Level: No Judgement' placement='bottom' arrow>
        <RemoveCircleIcon sx={{ mr: 1 }} />
      </Tooltip>
    );
  }, [name, avatarUrl]);

  const content = useMemo(() => {
    const isValid = isValidXXNetworkAddress(value);
    if (name) {
      return (
        <Tooltip title={value} placement='top' arrow>
          {contentRenderer(name, isValid, link)}
        </Tooltip>
      );
    } else {
      return truncated ? (
        <Tooltip title={value} placement='top' arrow>
          {contentRenderer(truncated ? shortString(value) : value, isValid, link)}
        </Tooltip>
      ) : (
        contentRenderer(value, isValid, link)
      );
    }
  }, [name, value, truncated, link]);

  return (
    <Stack direction={'row'} alignItems='center'>
      {avatar}
      {content}
    </Stack>
  );
};

export { Hash, Address };
