import base64url from 'base64url';
import React from 'react';

const toBase64Url = (addr: string) => base64url.fromBase64(addr);
const shortHash = (addr: string) => addr
  ? addr.slice(0, 4).concat('...', addr.slice(addr.length - 4, addr.length))
  : '';

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
      <code
        className={className}
        style={{ fontSize: '0.9rem' }}
      >
        <a
          href={toDashboardNodeUrl(nodeId)}
          rel='noreferrer noopener'
          target='__blank'
        >
          { shorten
            ? shortHash(nodeId)
            : nodeId
          }
        </a>
      </code>
    )
  );
};

export default CmixAddress;
