import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Avatar, Link, Stack, Tooltip, Typography, TypographyTypeMap } from '@mui/material';
import { decodeAddress } from '@polkadot/keyring';
import { isHex } from '@polkadot/util';
import React, { FC } from 'react';

type IdProperties = {
  link?: string;
  variant: TypographyTypeMap['props']['variant'];
  truncated?: boolean;
  value: string;
};

const LinkWrapper: FC<{ link?: string }> = ({ children, link }) => {
  return link ? <Link href={link}>{children}</Link> : <>{children}</>;
};

const shortString = (addr: string, offset = 4, replaceStr = '...') =>
  addr
    ? addr.slice(0, offset).concat(replaceStr, addr.slice(addr.length - offset, addr.length))
    : '';

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

const ChainIdText: FC<IdProperties & { validate: (value: string) => boolean }> = ({
  children,
  link,
  validate,
  value,
  variant
}) => {
  const isValid = validate(value);
  return (
    <LinkWrapper link={link}>
      <Typography variant={variant} color={isValid ? 'info' : 'red'}>
        {children}
      </Typography>
    </LinkWrapper>
  );
};

const Hash: FC<IdProperties> = (props) => {
  return (
    <ChainIdText {...props} validate={(value: string) => isHex(value, 256)}>
      {props.truncated ? shortString(props.value) : props.value}
    </ChainIdText>
  );
};

const Address: FC<IdProperties & { name?: string; avatarUrl?: string }> = (props) => {
  return (
    <Stack direction={'row'} spacing={2} alignItems='center'>
      {props.name ? (
        <Avatar src={props.avatarUrl} alt={props.name} />
      ) : (
        <Tooltip title='Identity Level: No Judgement' placement='bottom' arrow>
          <RemoveCircleIcon />
        </Tooltip>
      )}
      <ChainIdText {...props} validate={isValidXXNetworkAddress}>
        {props.name || (props.truncated ? shortString(props.value) : props.value)}
      </ChainIdText>
    </Stack>
  );
};

export { Hash, Address };
