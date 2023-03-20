import type { Extrinsic } from '../../../../schemas/extrinsics.schema';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import Address from '../../../../components/Hash/XXNetworkAddress';
import Hash from '../../../../components/Hash';
import Link from '../../../../components/Link';
import {
  SummaryContainer,
  SummaryEntry,
  SummaryHeader,
  SummaryValue,
  WithCopy
} from '../../../../components/Summary';
import TimeAgo from '../../../../components/TimeAgo';
import ModuleCalls from './ModuleCalls';
import ParametersFragment from './ParametersFragment';
import FormatBalance from '../../../../components/FormatBalance';
import { BN_ZERO } from '@polkadot/util';
import CodeDisplay from '../../../../components/CodeDisplay';
import StatusMessage from '../../../../components/blockchain/StatusMessage';

type Props = {
  extrinsic: Extrinsic;
};

const Summary: FC<Props> = ({ extrinsic }) => {
  return (
    <SummaryContainer>
      <SummaryEntry>
        <SummaryHeader>Time</SummaryHeader>
        <SummaryValue>
          <TimeAgo date={extrinsic.timestamp} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Block</SummaryHeader>
        <SummaryValue>
          <Link to={`/blocks/${extrinsic.blockNumber}`}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <CheckCircleIcon color='success' />
              &nbsp;{extrinsic.blockNumber}
            </Stack>
          </Link>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Extrinsic Hash</SummaryHeader>
        <SummaryValue>
          <WithCopy value={extrinsic.hash}>
            <Hash truncated='lgDown' value={extrinsic.hash} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Module/Call</SummaryHeader>
        <SummaryValue>
          <ModuleCalls module={extrinsic.module} call={extrinsic.call} doc={extrinsic.doc} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Result</SummaryHeader>
        <SummaryValue>
          <Stack direction='row' spacing={1} alignItems='center'>
            <StatusMessage
              status={extrinsic.success ? 'successful' : 'failed'}
              message={extrinsic.errorMsg}
            />
          </Stack>
        </SummaryValue>
      </SummaryEntry>
      {extrinsic.fee !== null && (
        <SummaryEntry>
          <SummaryHeader>Fee</SummaryHeader>
          <SummaryValue>
            <Typography>
              <FormatBalance precision={4} value={extrinsic.fee.toString() ?? BN_ZERO.toString()} />
            </Typography>
          </SummaryValue>
        </SummaryEntry>
      )}
      {extrinsic.tip !== null && (
        <SummaryEntry>
          <SummaryHeader>Tip</SummaryHeader>
          <SummaryValue>
            <Typography>
              <FormatBalance precision={4} value={extrinsic.tip.toString() ?? BN_ZERO.toString()} />
            </Typography>
          </SummaryValue>
        </SummaryEntry>
      )}
      <SummaryEntry>
        <SummaryHeader>
          <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
        </SummaryHeader>
        <SummaryValue>
          <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
        </SummaryValue>
      </SummaryEntry>
      <ParametersFragment {...extrinsic} />
      {extrinsic.signer && extrinsic.isSigned && (
        <SummaryEntry>
          <SummaryHeader>Signer</SummaryHeader>
          <SummaryValue>
            <Address
              name={extrinsic.signerAccount?.identity?.display}
              roles={extrinsic.signerAccount ?? {}}
              value={extrinsic.signer}
            />
          </SummaryValue>
        </SummaryEntry>
      )}
      <SummaryEntry>
        <SummaryHeader>Dispatch Info</SummaryHeader>
        <SummaryValue>
          <CodeDisplay>{JSON.stringify(JSON.parse(extrinsic.dispatchInfo), null, 2)}</CodeDisplay>
        </SummaryValue>
      </SummaryEntry>
    </SummaryContainer>
  );
};

export default Summary;
