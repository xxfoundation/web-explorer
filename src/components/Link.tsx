import { Link as MaterialLink } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const Link: React.FC<LinkRouterProps> = ({ children, ...props }) => {
  return (
    <MaterialLink component={RouterLink} {...props}>
      {children}
    </MaterialLink>
  );
};

export default Link;
