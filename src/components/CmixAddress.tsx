import base64url from 'base64url';
import React from 'react';
import { Link } from '@mui/material';
import { shortString } from '../utils'

const toBase64Url = (addr: string) => base64url.fromBase64(addr);

const toDashboardNodeUrl = (addr: string) => {
  const basedAf = toBase64Url(addr);

  return `https://dashboard.xx.network/nodes/${basedAf}`;
};

const CmixAddress: React.FC<{ nodeId?: string, shorten?: boolean, className?: string }> = ({ className, nodeId, shorten }) => {
  return (
    !nodeId ? (
      <code
        className={className}
        style={{ fontSize: '0.9rem', textAlign: 'right' }}
      >
        <p>
          Offline
        </p>
      </code>
    ) : (
      <code>
        <Link
          href={toDashboardNodeUrl(nodeId)}
          rel='noreferrer noopener'
          target='__blank'
        >
          {shorten
            ? shortString(nodeId)
            : nodeId
          }
        </Link>
      </code>
    )
  );
};

export default CmixAddress;
