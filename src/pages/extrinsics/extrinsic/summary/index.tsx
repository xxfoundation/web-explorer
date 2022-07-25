import type { Extrinsic } from '../../../../schemas/extrinsics.schema';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import BlockStatusIcon from '../../../../components/block/BlockStatusIcon';
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
import TransferFragment from './TransferFragment';

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
              <CheckCircleOutlineOutlinedIcon color='success' />
              &nbsp;{extrinsic.blockNumber}
            </Stack>
          </Link>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>LifeTime</SummaryHeader>
        <SummaryValue>{extrinsic.lifetime || 'Immortal'}</SummaryValue>
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
      <TransferFragment {...extrinsic} />
      <SummaryEntry>
        <SummaryHeader>Result</SummaryHeader>
        <SummaryValue>
          <Stack direction='row' spacing={1} alignItems='center'>
            <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />
            &nbsp;&nbsp;{extrinsic.success ? 'Success' : 'Failure'}
          </Stack>
        </SummaryValue>
      </SummaryEntry>
      {!extrinsic.success && (
        <SummaryEntry>
          <SummaryHeader>Failure Message</SummaryHeader>
          <SummaryValue>
            <WithCopy tooltip value={extrinsic.errorMsg}>
              <Typography variant='code' sx={{ fontSize: 18 }} color='red'>
                {extrinsic.errorMsg}
              </Typography>
            </WithCopy>
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
            <Address value={extrinsic.signer} />
          </SummaryValue>
        </SummaryEntry>
      )}
    </SummaryContainer>
  );
};

export default Summary;
