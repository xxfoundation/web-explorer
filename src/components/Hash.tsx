import {
  Alert,
  Divider,
  Link,
  Snackbar,
  Stack,
  Typography,
  TypographyTypeMap
} from '@mui/material';
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
    return [truncated, { replaceChar: '.....', start: 7, end: -5 }]; // default options for truncating a hash
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

const REGEX_HEX_PREFIXED = /^0x[\da-fA-F]+$/;
// const REGEX_HEX_NOPREFIX = /^[\da-fA-F]+$/;
const HASH_LENGTH = 256;
function isHex(value: string, bitLength = -1) {
  return (
    typeof value === 'string' &&
    (value === '0x' || REGEX_HEX_PREFIXED.test(value)) &&
    (bitLength === -1 ? value.length % 2 === 0 : value.length === 2 + Math.ceil(bitLength / 4))
  );
}

type CommonHashField = {
  copyable?: boolean;
  link?: string;
  variant: TypographyTypeMap['props']['variant'];
  alertMsg: string;
};

const CommonHash: React.FC<
  CommonHashField & { validate(value: string): boolean; value: string }
> = ({ alertMsg, children, copyable = false, link, validate, value, variant }) => {
  const [state, setState] = React.useState<{ color: string; open: boolean }>({
    open: false,
    color: 'normal'
  });

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setState(({}) => {
      return { open: false, color: 'info' };
    });
  };

  React.useMemo(() => {
    if (validate(value)) {
      setState({ open: true, color: 'red' });
    }
  }, [value, validate]);

  return (
    <>
      <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <CopyButtonWrapper value={value} enabled={copyable}>
        <LinkWrapper link={link}>
          <Typography variant={variant} color={state.color}>
            {children}
          </Typography>
        </LinkWrapper>
      </CopyButtonWrapper>
    </>
  );
};

const Hash: React.FC<CommonHashField & { value: string; truncated?: boolean | TruncateOpts }> = ({
  truncated = false,
  ...props
}) => {
  const validate = (value: string) => !isHex(value, HASH_LENGTH);
  const [isTruncated, options] = unwrapTruncateOpts(truncated);
  const renderValue = isTruncated ? truncateByOptions(props.value, options) : props.value;
  return (
    <CommonHash {...props} validate={validate}>
      {renderValue}
    </CommonHash>
  );
};

const Address: React.FC<
  CommonHashField & {
    value?: string;
    altValue: string;
  }
> = ({ ...props }) => {
  const validate = (value: string) => value[0] != '6' || value.length != 48;
  return (
    <CommonHash
      {...props}
      value={props.altValue}
      validate={validate}
    >
      {props.value || props.altValue}
    </CommonHash>
  );
};

export { Hash, Address };
