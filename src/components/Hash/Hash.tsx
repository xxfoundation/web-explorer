import type { FC } from 'react';
import { Hidden, styled, Breakpoint, TypographyProps } from '@mui/material';
import type { Theme } from '../../themes/types';

import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import { isHex } from '@polkadot/util';
import Link from '../Link';
import useBreakpoint from '../../hooks/useBreakpoints';

const DEFAULT_HASH_BITLENGTH = 256;
const SHORT_STRING_OFFSET = 6;

type Responsiveness =  'xlDown' | 'lgDown' | 'mdDown' | 'smDown' | 'xsDown' | 'xsUp' | 'smUp' | 'mdUp' | 'lgUp' | 'xlUp';

export type Props = TypographyProps & {
  bitlength?: number;
  url?: string;
  showTooltip?: boolean;
  truncated?: boolean | Responsiveness;
  offset?: number | Partial<Record<Breakpoint, number>>;
  valid?: boolean;
  value: string;
}

const breakpointToResponsiveness = (theme: Theme, res: Responsiveness) => ({
  xlDown: theme.breakpoints.down('xl'),
  lgDown: theme.breakpoints.down('lg'),
  mdDown: theme.breakpoints.down('md'),
  smDown: theme.breakpoints.down('sm'),
  xsDown: theme.breakpoints.down('xs'),
  xsUp: theme.breakpoints.up('xs'),
  smUp: theme.breakpoints.up('sm'),
  mdUp: theme.breakpoints.up('md'),
  lgUp: theme.breakpoints.up('lg'),
  xlUp: theme.breakpoints.up('xl'),
})[res];

const EllipsisOnEmpty = styled('span')<{ responsiveness: Responsiveness }>(({ responsiveness: res, theme }) => ({
  minWidth: '3ch',
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  [breakpointToResponsiveness(theme, res)]: {
    '&:before': {
      content: '"..."',
    }
  }
}));

export const ResponsiveHash: FC<Pick<Props, 'offset' | 'truncated' | 'value'>> = ({
  offset = SHORT_STRING_OFFSET,
  truncated,
  value
}) => {
  const breakpoint = useBreakpoint();
  const currentOffset = typeof offset === 'number'
    ? offset
    : ((breakpoint && offset[breakpoint]) ? offset[breakpoint] : SHORT_STRING_OFFSET) as number;

  const start = value.slice(0, currentOffset);
  const middle = value.slice(currentOffset, value.length - currentOffset);
  const end = value.slice(value.length - currentOffset);

  if (typeof truncated === 'string') {
    const hiddenProps = { [truncated]: true };
    
    return (<>
      {start}
      <EllipsisOnEmpty responsiveness={truncated}>
        <Hidden {...hiddenProps}>{middle}</Hidden>
      </EllipsisOnEmpty>
      {end}
    </>
    )
  }

  return <>
    {truncated === true ? `${start}...${end}`: value}
  </>
}

const Hash: FC<Props> = ({
  bitlength = DEFAULT_HASH_BITLENGTH,
  valid,
  url,
  offset = SHORT_STRING_OFFSET,
  showTooltip = true,
  truncated,
  value,
  ...props
}) => {
  const isValid = valid === undefined ? isHex(value, bitlength) : valid;
  const tooltip = !!showTooltip ? (
    <Typography fontSize={'10px'} fontWeight={400}>
      {value}
    </Typography>
  ) : '';

  const hash = <ResponsiveHash offset={offset} truncated={truncated} value={value} />;

  return (
    <Tooltip
      title={tooltip}
      placement='top'
      arrow
    >
      <Typography
        fontFamily={'Roboto Mono'}
        color={isValid ? 'info' : 'red'}
        sx={{ fontWeight: 400, wordBreak: 'break-all' }}
        {...props}
      >
        {url ? <Link to={url}>{hash}</Link> : hash}
      </Typography>
    </Tooltip>
  );
};

export default Hash;
