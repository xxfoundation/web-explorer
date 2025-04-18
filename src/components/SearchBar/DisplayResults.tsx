import type { SearchResults } from '../../hooks/useSearch';
import CloseIcon from '@mui/icons-material/Close';

import React, { FC } from 'react';
import { styled, useTheme, Box, Button, Stack, Typography } from '@mui/material';
import Address from '../Hash/XXNetworkAddress';
import Hash from '../Hash';

import Link from '../Link';
import Error from '../Error';

type Props = {
  error?: string;
  results?: SearchResults;
  dismiss: () => void;
};

const ResultContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(-5),
  position: 'relative'
}));

const DisplaySearchResults: FC<Props> = ({ dismiss, error, results }) => {
  const theme = useTheme();
  const hasAccounts = !!results?.accounts?.length && results.accounts.length > 0;
  const hasBlocks = !!results?.blocks?.length && results.blocks.length > 0;
  const hasExtrinsics = !!results?.extrinsics?.length && results.extrinsics.length > 0;

  return (
    <ResultContainer>
      <Button
        sx={{
          color: theme.palette.mode === 'light' ? undefined : 'white',
          position: 'absolute',
          top: '1rem',
          right: '0rem'
        }}
        onClick={dismiss}
      >
        <CloseIcon />
      </Button>

      {error && <Error color='darkorange' message={error} />}

      {results && (
        <Box sx={{ pb: 2 }}>
          <Typography variant='h5' sx={{ fontSize: 26, fontWeight: 500, mb: 1.5 }}>
            Search Results
          </Typography>
          <Stack spacing={3} sx={{ overflowY: 'auto', maxHeight: '200px' }}>
            {hasAccounts && (
              <Stack spacing={2}>
                <Typography variant='h5' sx={{ fontSize: 22 }}>
                  Accounts
                </Typography>
                {results.accounts?.map((acct) => (
                  <Address
                    roles={acct}
                    truncated='mdDown'
                    key={acct.id}
                    onClick={dismiss}
                    value={acct.id}
                    name={acct.identity?.display}
                  />
                ))}
              </Stack>
            )}
            {hasBlocks && (
              <Stack spacing={2}>
                <Typography variant='h5' sx={{ fontSize: 22 }}>
                  Blocks
                </Typography>
                {results.blocks?.map((block) => (
                  <Link key={block.number} onClick={dismiss} to={`/blocks/${block.number}`}>
                    Block #{block.number}: <Hash truncated='mdDown' value={block.hash} />
                  </Link>
                ))}
              </Stack>
            )}
            {hasExtrinsics && (
              <Stack spacing={2}>
                <Typography variant='h5' sx={{ fontSize: 22 }}>
                  Extrinsics
                </Typography>
                {results.extrinsics?.map((e) => (
                  <Link key={e.hash} to={`/extrinsics/${e.hash}`}>
                    Extrinsic #{e.blockNumber}-{e.extrinsicIndex}: <Hash truncated='mdDown' value={e.hash} />
                  </Link>
                ))}
              </Stack>
            )}
          </Stack>
        </Box>
      )}
    </ResultContainer>
  );
};

export default DisplaySearchResults;
