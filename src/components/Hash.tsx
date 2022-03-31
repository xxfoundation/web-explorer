import { Divider, Link, Stack, Typography, TypographyTypeMap } from '@mui/material';
import React from 'react';
import CopyButton from './CopyButton';

type TruncateOpts = {
  start?: number;
  end?: number;
  replaceChar?: string;
};

const truncateByOptions = (hash: string, opts: TruncateOpts) => {
  const truncatedString = hash.slice(0, opts.start) + opts.replaceChar;
  return opts.end ? truncatedString + hash.slice(opts.end) : truncatedString;
};

const unwrapTruncateOpts = (truncated: boolean | TruncateOpts): [boolean, TruncateOpts] => {
  if (typeof truncated === 'boolean') {
    return [truncated, { replaceChar: '.....', start: 7, end: -5 }]; // default for hash
  }
  return [!!(truncated && Object.keys(truncated).length), truncated];
};

const CopyButtonWrapper: React.FC<{ value: string; enabled: boolean }> = ({
  children,
  enabled,
  value
}) => {
  return enabled ? (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={2}
      divider={<Divider orientation='vertical' flexItem />}
    >
      {children}
      <CopyButton value={value} label='hash' />
    </Stack>
  ) : (
    <>{children}</>
  );
};

const LinkWrapper: React.FC<{ link?: string }> = ({ children, link }) => {
  return link ? <Link href={link}>{children}</Link> : <>{children}</>;
};

const Hash: React.FC<{
  copyable?: boolean;
  link?: string;
  value: string;
  truncated?: boolean | TruncateOpts;
  variant: TypographyTypeMap['props']['variant'];
}> = ({ copyable = false, link, truncated = false, value, variant }) => {
  // Inside component logic for hash will be checked.
  // Hash format: 64 chars start with '0x' - blake2_256
  const [isTruncated, options] = unwrapTruncateOpts(truncated);
  const text = isTruncated ? truncateByOptions(value, options) : value;
  return (
    <CopyButtonWrapper value={value} enabled={copyable}>
      <Typography variant={variant}>
        <LinkWrapper link={link}>{text}</LinkWrapper>
      </Typography>
    </CopyButtonWrapper>
  );
};

export { Hash };
