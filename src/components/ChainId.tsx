import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Avatar, Stack, Tooltip, Typography, TypographyProps } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { shortString } from '../utils';
import HashValidator from './HashValidator';
import isValidXXNetworkAddress from './IsValidXXNetworkAddress';
import Link from './Link';

type IdProperties = {
  link?: string;
  truncated?: boolean;
  value: string;
} & TypographyProps;

const contentRenderer = (
  text: string,
  isvalid: boolean,
  link?: IdProperties['link'],
  props?: TypographyProps
) => {
  return (
    <Typography {...props} color={isvalid ? 'info' : 'red'}>
      {link ? <Link to={link}>{text}</Link> : text}
    </Typography>
  );
};

const Hash: FC<IdProperties & { showTooltip?: boolean }> = ({
  link,
  showTooltip,
  truncated,
  value,
  ...props
}) => {
  const isvalid = HashValidator(value);
  const displayValue = truncated ? shortString(value) : value;
  if (showTooltip && truncated) {
    return (
      <Tooltip
        title={
          <Typography fontSize={'10px'} fontWeight={400}>
            {value}
          </Typography>
        }
        placement='top'
        arrow
      >
        {contentRenderer(displayValue, isvalid, link, props)}
      </Tooltip>
    );
  }
  return contentRenderer(displayValue, isvalid, link, props);
};

const Address: FC<
  IdProperties & { name?: string; disableAvatar?: boolean; avatarUrl?: string }
> = ({ avatarUrl, disableAvatar, link, name, truncated, value, ...props }) => {
  const avatar = useMemo(() => {
    return name ? (
      <Avatar sx={{ width: 25, height: 25, mr: 1 }} src={avatarUrl} alt={name} />
    ) : (
      <Tooltip
        title={
          <Typography fontSize={'10px'} fontWeight={400}>
            Identity Level: No Judgement
          </Typography>
        }
        arrow
      >
        <RemoveCircleIcon sx={{ mr: 1 }} />
      </Tooltip>
    );
  }, [name, avatarUrl]);

  const content = useMemo(() => {
    const isvalid = isValidXXNetworkAddress(value);
    if (name) {
      return (
        <Tooltip
          title={
            <Typography fontSize={'10px'} fontWeight={400}>
              {value}
            </Typography>
          }
          arrow
        >
          {contentRenderer(name, isvalid, link, props)}
        </Tooltip>
      );
    } else {
      return truncated ? (
        <Tooltip
          title={
            <Typography fontSize={'10px'} fontWeight={400}>
              {value}
            </Typography>
          }
          arrow
        >
          {contentRenderer(truncated ? shortString(value) : value, isvalid, link, props)}
        </Tooltip>
      ) : (
        contentRenderer(value, isvalid, link, props)
      );
    }
  }, [value, name, link, props, truncated]);

  return disableAvatar ? (
    content
  ) : (
    <Stack direction={'row'} alignItems='center'>
      {avatar}
      {content}
    </Stack>
  );
};

export { Hash, Address };
