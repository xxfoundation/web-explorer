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

type CommonHashFields = {
  copyable?: boolean;
  link?: string;
  variant: TypographyTypeMap['props']['variant'];
  alertMsg: string;
};

const CommonHash: React.FC<
  CommonHashFields & { validate(value: string): boolean; value: string }
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

const Hash: React.FC<CommonHashFields & { value: string; truncated?: boolean | TruncateOpts }> = ({
  truncated = false,
  ...props
}) => {
  const validate = (value: string) => !isHex(value, HASH_LENGTH);
  return (
    <CommonHash {...props} validate={validate}>
      {truncateText(props.value, truncated)}
    </CommonHash>
  );
};

const Address: React.FC<
  CommonHashFields & {
    name?: string;
    hash: string;
    truncated?: boolean | TruncateOpts;
  }
> = ({ truncated = false, ...props }) => {
  const validate = (value: string) => value[0] != '6' || value.length != 48;
  return (
    <CommonHash {...props} value={props.hash} validate={validate}>
      {props.name || truncateText(props.hash, truncated)}
    </CommonHash>
  );
};

export { Hash, Address };
