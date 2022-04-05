import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Alert,
  Divider,
  IconButton,
  Link,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  TypographyTypeMap
} from '@mui/material';
import { isHex } from '@polkadot/util';
import React from 'react';
import useCopyClipboard from '../hooks/useCopyToClibboard';

type TruncateOpts = {
  start?: number;
  end?: number;
  replaceChar?: string;
};

const CopyButtonWrapper: React.FC<{ value: string; label: string; enabled: boolean }> = ({
  children,
  enabled,
  label,
  value
}) => {
  const staticCopy = useCopyClipboard()[1];
  return enabled ? (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={2}
      divider={<Divider orientation='vertical' flexItem />}
    >
      {children}
      <Tooltip title={`copy ${label}`} placement='top'>
        <IconButton
          arial-label='copy'
          onClick={() => {
            staticCopy(value);
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  ) : (
    <>{children}</>
  );
};

const LinkWrapper: React.FC<{ link?: string }> = ({ children, link }) => {
  return link ? <Link href={link}>{children}</Link> : <>{children}</>;
};

type CommonHashFields = {
  copyable?: boolean;
  link?: string;
  variant: TypographyTypeMap['props']['variant'];
  alertMsg: string;
};

const CommonHash: React.FC<
  CommonHashFields & { validate(value: string): boolean; value: string; label: string }
> = ({ alertMsg, children, copyable = false, label, link, validate, value, variant }) => {
  const [state, setState] = React.useState<{ color?: string; open: boolean }>({
    open: false
  });

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setState(({}) => {
      return { open: false };
    });
  };

  React.useEffect(() => {
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
      <CopyButtonWrapper value={value} label={label} enabled={copyable}>
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
  const validate = (value: string) => !isHex(value, 256);
  return (
    <CommonHash {...props} label='hash' validate={validate}>
      {truncateText(props.value, truncated)}
    </CommonHash>
  );
};

const Address: React.FC<
  CommonHashFields & {
    // TODO chain id both are this
    name?: string;
    hash: string;
    truncated?: boolean | TruncateOpts;
  }
> = ({ truncated = false, ...props }) => {
  const validate = (value: string) => value[0] != '6' || value.length != 48;
  return (
    <CommonHash {...props} label='address' value={props.hash} validate={validate}>
      {props.name || truncateText(props.hash, truncated)}
    </CommonHash>
  );
};

export { Hash, Address };
