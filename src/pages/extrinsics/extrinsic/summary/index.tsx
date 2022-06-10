import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Divider, Stack } from '@mui/material';
import React, { FC } from 'react';
import BlockStatusIcon from '../../../../components/block/BlockStatusIcon';
import { Address, Hash } from '../../../../components/ChainId';
import Link from '../../../../components/Link';
import {
  SummaryContainer,
  SummaryEntry,
  SummaryHeader,
  SummaryValue,
  WithCopy
} from '../../../../components/Summary';
import TimeAgo from '../../../../components/TimeAgo';
import { GetExtrinsicByPK } from '../../../../schemas/extrinsics.schema';
import ModuleCalls from '../ModuleCalls';
import ParametersFragment from './ParametersFragment';
import SummaryFragment from './TransferFragment';

type Extrinsic = GetExtrinsicByPK['extrinsic'];

type Props = {
  extrinsic: Extrinsic;
  extrinsicId: { blockNumber: number; extrinsicIndex: number };
};

const Summary: FC<Props> = ({ extrinsic, extrinsicId }) => {
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
          <Link to={`/blocks/${extrinsicId.blockNumber}`}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <CheckCircleOutlineOutlinedIcon color='success' />
              &nbsp;{extrinsicId.blockNumber}
            </Stack>
          </Link>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>LifeTime</SummaryHeader>
        <SummaryValue>
          {extrinsic.lifetime || 'Immortal'}
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Extrinsic Hash</SummaryHeader>
        <SummaryValue>
          <WithCopy value={extrinsic.hash}>
            <Hash value={extrinsic.hash} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Module/Call</SummaryHeader>
        <SummaryValue>
          <ModuleCalls module={extrinsic.section} call={extrinsic.method} doc={extrinsic.doc} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryFragment {...extrinsicId} />
      <SummaryEntry>
        <SummaryHeader>Result</SummaryHeader>
        <SummaryValue>
          <Stack direction='row' spacing={1} alignItems='center'>
            <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />
            &nbsp;{extrinsic.success ? 'Success' : 'Failure'}
          </Stack>
        </SummaryValue>
      </SummaryEntry>
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
