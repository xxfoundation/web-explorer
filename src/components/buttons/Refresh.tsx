import type { OperationVariables, ApolloQueryResult } from '@apollo/client';
import React, { FC, useCallback, useState } from 'react';

import RefreshIcon from '@mui/icons-material/Refresh';
import { Badge, Button, ButtonProps } from '@mui/material';

type Props = ButtonProps & {
  loading?: boolean;
  countSince?: number;
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<unknown>>;
}

const spinning = {
  animation: 'spin 2s linear infinite',
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(360deg)',
    },
    '100%': {
      transform: 'rotate(0deg)',
    },
  },
};

const RefreshButton: FC<Props> = ({ countSince, refetch, ...rest }) => {
  const [refetching, setRefetching] = useState(false);

  const refetchItems = useCallback(async () => {
    setRefetching(true);
    refetch().finally(() => setRefetching(false));
  }, [refetch]);


  return (
    <Button {...rest} onClick={refetchItems} sx={{ minWidth: 0, padding: 0, ...rest.sx }}>
      <Badge badgeContent={countSince} color='primary' max={100}>
        <RefreshIcon sx={refetching ? spinning : {}} color='action' />
      </Badge>
    </Button>
  );
}

export default RefreshButton;
