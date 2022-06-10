import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Avatar, Stack, Tooltip, Typography, TypographyProps } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { shortString } from '../utils';
import { styles as ellipsis } from './Ellipsis';
import HashValidator from './HashValidator';
import isValidXXNetworkAddress from './IsValidXXNetworkAddress';
import Link from './Link';

type IdProperties = {
  link?: string;
  offset?: number;
  value: string;
} & TypographyProps;

const contentRenderer = (
  text: string,
  isValid: boolean,
  link?: IdProperties['link'],
  props?: TypographyProps
) => {
  return (
    <Typography style={ellipsis} fontWeight={300} {...props} fontFamily={'Roboto Mono'} color={isValid ? 'info' : 'red'}>
      {link ? <Link to={link}>{text}</Link> : text}
    </Typography>
  );
};

const Hash: FC<IdProperties & { showTooltip?: boolean }> = ({
  link,
  offset,
  showTooltip,
  value,
  ...props
}) => {
  const isValid = HashValidator(value);
  if (showTooltip) {
    return (
      <Tooltip
        title={
          <Typography style={ellipsis} fontSize={'10px'} fontWeight={300}>
            {value}
          </Typography>
        }
        placement='top'
        arrow
      >
        {contentRenderer(value, isValid, link, props)}
      </Tooltip>
    );
  }
  return contentRenderer(value, isValid, link, props);
};

const Address: FC<
  IdProperties & { name?: string; disableAvatar?: boolean; avatarUrl?: string }
> = ({ avatarUrl, disableAvatar, link, name, value, ...props }) => {
  const avatar = useMemo(() => {
    return name ? (
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
    ) : (
      <Avatar sx={{ width: 25, height: 25, mr: 1 }} src={avatarUrl} alt={name} />
    );
  }, [name, avatarUrl]);

  const content = useMemo(() => {
    const isValid = isValidXXNetworkAddress(value);
    if (name) {
      return (
        <Tooltip
          title={
            <Typography style={ellipsis} fontSize={'10px'} fontWeight={400}>
              {value}
            </Typography>
          }
          arrow
        >
          {contentRenderer(name, isValid, link, props)}
        </Tooltip>
      );
    } else {
      return (
        <Tooltip
          title={
            <Typography fontSize={'10px'} fontWeight={400}>
              {value}
            </Typography>
          }
          arrow
        >
          {contentRenderer(value, isValid, link, props)}
        </Tooltip>
      );
    }
  }, [value, name, link, props]);

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
