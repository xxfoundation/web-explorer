import { Link, Typography, TypographyTypeMap } from '@mui/material';
import { isHex } from '@polkadot/util';
import React from 'react';

type TruncateOpts = {
  start?: number;
  end?: number;
  replaceChar?: string;
};

const LinkWrapper: React.FC<{ link?: string }> = ({ children, link }) => {
  return link ? <Link href={link}>{children}</Link> : <>{children}</>;
};

type CommonHashFields = {
  link?: string;
  variant: TypographyTypeMap['props']['variant'];
  truncated?: boolean | TruncateOpts;
};

const ChainIdText: React.FC<
  CommonHashFields & { validate(value: string): boolean; value: string }
> = ({ children, link, validate, value, variant }) => {
  const invalid = validate(value);
  return (
    <LinkWrapper link={link}>
      <Typography variant={variant} color={invalid ? 'red' : 'info'}>
        {children}
      </Typography>
    </LinkWrapper>
  );
};

const unwrapTruncateOpts = (truncated: boolean | TruncateOpts): [boolean, TruncateOpts] => {
  if (typeof truncated === 'boolean') {
    return [truncated, { replaceChar: '.....', start: 7, end: -5 }];
  }
  return [!!(truncated && Object.keys(truncated).length), truncated];
};

const truncateText = (value: string, truncated: boolean | TruncateOpts = false) => {
  const [isTruncated, options] = unwrapTruncateOpts(truncated);
  if (isTruncated) {
    const truncatedString = value.slice(0, options.start) + options.replaceChar;
    return options.end ? truncatedString + value.slice(options.end) : truncatedString;
  }
  return value;
};

const Hash: React.FC<CommonHashFields & { value: string }> = (props) => {
  return (
    <ChainIdText {...props} validate={(value: string) => !isHex(value, 256)}>
      {truncateText(props.value, props.truncated)}
    </ChainIdText>
  );
};

const Address: React.FC<
  CommonHashFields & {
    name?: string;
    hash: string;
  }
> = (props) => {
  // TODO add icons of addresses??
  return (
    <ChainIdText
      {...props}
      value={props.hash}
      validate={(value: string) => value[0] != '6' || value.length != 48}
    >
      {props.name || truncateText(props.hash, props.truncated)}
    </ChainIdText>
  );
};

export { Hash, Address };
