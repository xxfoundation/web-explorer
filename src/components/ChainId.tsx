import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Avatar, Stack, Tooltip, Typography, TypographyTypeMap } from '@mui/material';
import React, { FC, useMemo } from 'react';
import HashValidator from './HashValidator';
import isValidXXNetworkAddress from './IsValidXXNetworkAddress';
import Link from './Link';

type IdProperties = {
  link?: string;
  truncated?: boolean;
  value: string;
  variant?: TypographyTypeMap['props']['variant'];
};

const shortString = (addr: string, offset = 5, replaceStr = '...') =>
  addr
    ? addr.slice(0, offset + 2).concat(replaceStr, addr.slice(addr.length - offset, addr.length))
    : '';

const contentRenderer = (
  text: string,
  isValid: boolean,
  variant?: TypographyTypeMap['props']['variant'],
  link?: IdProperties['link']
) => {
  return (
    <Typography variant={variant} color={isValid ? 'info' : 'red'}>
      {link ? <Link to={link}>{text}</Link> : text}
    </Typography>
  );
};

const Hash: FC<IdProperties> = ({ link, truncated, value, variant }) => {
  const isValid = HashValidator(value);
  return contentRenderer(truncated ? shortString(value) : value, isValid, variant, link);
};

const Address: FC<IdProperties & { name?: string; avatarUrl?: string }> = ({
  avatarUrl,
  link,
  name,
  truncated,
  value,
  variant
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
          {contentRenderer(name, isValid, variant, link)}
        </Tooltip>
      );
    } else {
      return truncated ? (
        <Tooltip title={value} placement='top' arrow>
          {contentRenderer(truncated ? shortString(value) : value, isValid, variant, link)}
        </Tooltip>
      ) : (
        contentRenderer(value, isValid, variant, link)
      );
    }
  }, [name, value, truncated, variant, link]);

  return (
    <Stack direction={'row'} alignItems='center'>
      {avatar}
      {content}
    </Stack>
  );
};

export { Hash, Address };
