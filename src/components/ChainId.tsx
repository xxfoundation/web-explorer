import { Link, Typography, TypographyTypeMap } from '@mui/material';
import { isHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/keyring';
import React from 'react';

type IdProperties = {
  link?: string;
  variant: TypographyTypeMap['props']['variant'];
  truncated?: boolean;
  value: string;
  validate: (value: string) => boolean;
};

const LinkWrapper: React.FC<{ link?: string }> = ({ children, link }) => {
  return link ? <Link href={link}>{children}</Link> : <>{children}</>;
};

const shortString = (addr: string, offset = 4, replaceStr = '...') => addr
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
}

const ChainIdText: React.FC<IdProperties> = ({ children, link, validate, value, variant }) => {
  const invalid = validate(value);
  return (
    <LinkWrapper link={link}>
      <Typography variant={variant} color={invalid ? 'red' : 'info'}>
        {children}
      </Typography>
    </LinkWrapper>
  );
};

const Hash: React.FC<IdProperties> = (props) => {
  return (
    <ChainIdText {...props} validate={(value: string) => !isHex(value, 256)}>
      {props.truncated ? shortString(props.value) : props.value}
    </ChainIdText>
  );
};

const Address: React.FC<IdProperties & { name?: string }> = (props) => {
  return (
    // TODO add icons of addresses
    // name ? IdentityJudgement : Avatar
    <>
      <ChainIdText {...props} validate={isValidXXNetworkAddress}>
        {props.name || (props.truncated ? shortString(props.value) : props.value)}
      </ChainIdText>
    </>
  );
};

export { Hash, Address };
