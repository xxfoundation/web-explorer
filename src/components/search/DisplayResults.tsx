import type { SearchResults } from '../../hooks/useSearch';
import CloseIcon from '@mui/icons-material/Close';

import Address from '../Hash/XXNetworkAddress';
import React, { FC } from 'react';
import { styled, Box, Button, Typography } from '@mui/material';
import Link from '../Link';
import Error from '../Error';

type Props = {
  error?: string;
  results?: SearchResults;
  dismiss: () => void;
}

const ResultContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(-5),
  position: 'relative' 
}));

const DisplaySearchResults: FC<Props> = ({ dismiss, error,  results }) => {
  const hasAccounts = !!results?.accounts?.length && results.accounts.length > 0;
  const hasBlocks = !!results?.blocks?.length && results.blocks.length > 0;
  const hasExtrinsics = !!results?.extrinsics?.length && results.extrinsics.length > 0;

  return (
    <ResultContainer>
      <Button sx={{ position: 'absolute', top: '1rem', right: '1rem' }} onClick={dismiss}>
        <CloseIcon />
      </Button>

      {error && (
        <Error color='darkorange' message={error} />
      )}

      {results && (
        <>
          <Typography variant='h5' sx={{ fontSize: 26, fontWeight: 500, mb: 2 }}>
            Search Results
          </Typography>
          {hasAccounts && (
            <>
              <Typography variant='h5' sx={{ fontSize: 22, mb: 1 }}>
                Accounts
              </Typography>
              {results.accounts?.map((acct) => (
                <Address
                  key={acct.id}
                  onClick={dismiss}
                  value={acct.id}
                  name={acct.identity?.display} />
              ))}
            </>
          )}
          {hasBlocks && (
            <>
              <Typography variant='h5' sx={{ fontSize: 22, mb: 1 }}>
                Blocks
              </Typography>
              {results.blocks?.map((block) => (
                <Link
                  key={block.number}
                  onClick={dismiss}
                  to={`/blocks/${block.number}`}>
                    Block #{block.number}
                </Link>
              ))}
            </>
          )}
          {hasExtrinsics && (
            <>
              <Typography variant='h5' sx={{ fontSize: 22, mb: 1 }}>
                Extrinsics
              </Typography>
              {results.extrinsics?.map((e) => (
                <Link
                  key={e.hash}
                  to={`/extrinsics/${e.hash}`}>Extrinsic #{e.blockNumber}-{e.extrinsicIndex}</Link>
              ))}
            </>
          )}
        </>
      )}
      
    </ResultContainer>
  )
}

export default DisplaySearchResults;
