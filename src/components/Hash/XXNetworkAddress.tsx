import { AccountRoles, Roles } from '../../schemas/accounts.schema';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import PanToolIcon from '@mui/icons-material/PanTool';
import StarsIcon from '@mui/icons-material/Stars';
import GavelIcon from '@mui/icons-material/Gavel';
import TerminalIcon from '@mui/icons-material/Terminal';
import { styled, Avatar, Stack } from '@mui/material';

import Hash, { Props as HashProps } from '.';
import React, { FC, useMemo } from 'react';
import { isValidXXNetworkAddress } from '../../utils';
import Link from '../Link';
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
    (roles?.techcommit && 'techcommit')
    || (roles?.council && 'council')
    || (roles?.validator && 'validator')
    || (roles?.nominator && 'nominator')
    || (roles?.special && 'special')
    || 'other',
    [roles?.council, roles?.nominator, roles?.special, roles?.techcommit, roles?.validator]
  );
  const avatarIcon = useMemo(() => {
    return  (
      <Tooltip title={role}>
        <div>
          {role === 'other' && <CustomAvatar sx={{ width: 25, height: 25, mr: 1 }} src={avatar} alt={name} />}
          {role === 'special' && <StarsIcon sx={{ mr: 1 }} /> }
          {role === 'nominator' && <PanToolIcon sx={{ mr: 1 }} /> }
          {role === 'validator' && <CloudDoneIcon sx={{ mr: 1 }} /> }
          {role === 'council' && <GavelIcon sx={{ mr: 1 }} /> }
          {role === 'techcommit' && <TerminalIcon sx={{ mr: 1 }} /> }
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
