import { Alert, Link, Snackbar, Typography, TypographyTypeMap } from '@mui/material';
import { isHex } from '@polkadot/util';
import React from 'react';
import { useToggle } from '../hooks';

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
  alertMsg: string;
  truncated?: boolean;
};

const CommonHash: React.FC<
  CommonHashFields & { validate(value: string): boolean; value: string; label: string }
> = ({ alertMsg, children, link, validate, value, variant }) => {
  const [opened, { toggleOff, toggleOn }] = useToggle();

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    toggleOff();
  };

  React.useEffect(() => {
    if (validate(value)) {
      toggleOn();
    }
  }, [value, validate, toggleOn]);

  return (
    <>
      <Snackbar open={opened} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          {alertMsg}
        </Alert>
      </Snackbar>
      <LinkWrapper link={link}>
        <Typography variant={variant} color={opened ? 'red' : 'info'}>
          {children}
        </Typography>
      </LinkWrapper>
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

const validateHash = (value: string) => !isHex(value, 256);

const Hash: React.FC<CommonHashFields & { value: string; truncated?: boolean | TruncateOpts }> = (
  props
) => {
  return (
    <CommonHash {...props} label='hash' validate={validateHash}>
      {truncateText(props.value, props.truncated)}
    </CommonHash>
  );
};

const addressValidation = (value: string) => value[0] != '6' || value.length != 48;

const Address: React.FC<
  CommonHashFields & {
    // TODO chain id both are this
    name?: string;
    hash: string;
    truncated?: boolean | TruncateOpts;
  }
> = (props) => {
  // TODO add icons??
  return (
    <CommonHash {...props} label='address' value={props.hash} validate={addressValidation}>
      {props.name || truncateText(props.hash, props.truncated)}
    </CommonHash>
  );
};

export { Hash, Address }; // replace with chainIdentifier and both accept a validator field
