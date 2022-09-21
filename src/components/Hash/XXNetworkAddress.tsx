import { AccountRoles, Roles } from '../../schemas/accounts.schema';

import { HowToVote } from '@mui/icons-material';
import { styled, Avatar, Stack } from '@mui/material';

import Hash, { Props as HashProps } from '.';
import React, { FC, useMemo } from 'react';
import { isValidXXNetworkAddress } from '../../utils';
import Link from '../Link';
import node from '../../assets/images/icons/icon_node.svg'
import Tooltip from '../Tooltip';

type Props = HashProps & {
  roles: Partial<AccountRoles>; 
  name?: string;
  avatar?: string;
  disableAvatar?: boolean;
  disableUrl?: boolean;
  targetBlank?: boolean;
};

const CustomAvatar = styled(Avatar)(() => ({
  color: 'white'
}));

const Address: FC<Props> = ({ avatar, disableAvatar, disableUrl, name, roles, targetBlank = false,  ...hashProps }) => {
  const role = useMemo<Roles | 'other'>(() => 
    (roles?.validator && 'validator')
    || (roles?.nominator && 'nominator')
    || 'other',
    [roles?.nominator, roles?.validator]
  );
  const avatarIcon = useMemo(() => {
    return  (
      <Tooltip title={role}>
        <div>
          {role === 'nominator' && <HowToVote sx={{ mr: 1 }} /> }
          {role === 'validator' && <Avatar src={node} alt='avatar placeholder' sx={{ bgcolor: 'grey.400', width: 14, height: 14, padding: 0.7, mr: 1 }} />}
          {role === 'other' && <CustomAvatar sx={{ width: 25, height: 25, mr: 1 }} src={avatar} alt={name} />}
        </div>
      </Tooltip>
    );
  }, [role, avatar, name]);

  const isValid = isValidXXNetworkAddress(hashProps.value);
  const url = !disableUrl ? hashProps.url || `/accounts/${hashProps.value}` : undefined;

  return (
    <Stack direction={'row'} alignItems='center'>
      {!disableAvatar && avatarIcon}
      {name ? (
        targetBlank ? 
        <Link target='__blank' rel='noopener noreferrer' to={url}>{name}</Link>
        : <Link to={url}>{name}</Link>
      ) : (
        <Hash
          {...hashProps}
          targetBlank={targetBlank}
          url={url}
          valid={hashProps.valid === undefined ? isValid : hashProps.valid}
        />
      )}
    </Stack>
  );
};

export default Address;
