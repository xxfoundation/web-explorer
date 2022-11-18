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
import FormatBalance from '../../../../components/FormatBalance';
import { BN_ZERO } from '@polkadot/util';
import CodeDisplay from '../../../../components/CodeDisplay';
import { useTranslation } from 'react-i18next';

type Props = {
  extrinsic: Extrinsic;
};

const Summary: FC<Props> = ({ extrinsic }) => {
  const { t } = useTranslation();

  return (
    <SummaryContainer>
      <SummaryEntry>
        <SummaryHeader>{t('Time')}</SummaryHeader>
        <SummaryValue>
          <TimeAgo date={extrinsic.timestamp} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>{t('Block')}</SummaryHeader>
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
        <SummaryHeader>{t('Extrinsic Hash')}</SummaryHeader>
        <SummaryValue>
          <WithCopy value={extrinsic.hash}>
            <Hash truncated='lgDown' value={extrinsic.hash} />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>{t('Module/Call')}</SummaryHeader>
        <SummaryValue>
          <ModuleCalls module={extrinsic.module} call={extrinsic.call} doc={extrinsic.doc} />
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>{t('Result')}</SummaryHeader>
        <SummaryValue>
          <Stack direction='row' spacing={1} alignItems='center'>
            <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />
            &nbsp;&nbsp;{extrinsic.success ? 'Success' : 'Failure'}
          </Stack>
        </SummaryValue>
      </SummaryEntry>
      {!extrinsic.success && (
        <SummaryEntry>
          <SummaryHeader>{t('Failure Message')}</SummaryHeader>
          <SummaryValue>
            <WithCopy tooltip value={extrinsic.errorMsg}>
              <Typography variant='code' sx={{ fontSize: 18 }} color='red'>
                {extrinsic.errorMsg}
              </Typography>
            </WithCopy>
          </SummaryValue>
        </SummaryEntry>
      )}
      {extrinsic.fee !== null && (
        <SummaryEntry>
          <SummaryHeader>{t('Fee')}</SummaryHeader>
          <SummaryValue>
            <Typography>
              <FormatBalance
                precision={4}
                value={extrinsic.fee.toString() ?? BN_ZERO.toString()} />
            </Typography>
          </SummaryValue>
        </SummaryEntry>
      )}
      {extrinsic.tip !== null && (
        <SummaryEntry>
          <SummaryHeader>{t('Tip')}</SummaryHeader>
          <SummaryValue>
            <Typography>
              <FormatBalance
                precision={4}
                value={extrinsic.tip.toString() ?? BN_ZERO.toString()} />
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
          <SummaryHeader>{t('Signer')}</SummaryHeader>
          <SummaryValue>
            <Address name={extrinsic.signerAccount?.identity?.display} roles={extrinsic.signerAccount ?? {}} value={extrinsic.signer} />
          </SummaryValue>
        </SummaryEntry>
      )}
      <SummaryEntry>
        <SummaryHeader>{t('Dispatch Info')}</SummaryHeader>
        <SummaryValue>
          <CodeDisplay>
            {JSON.stringify(JSON.parse(extrinsic.dispatchInfo), null, 2)}
          </CodeDisplay>
        </SummaryValue>
      </SummaryEntry>
    </SummaryContainer>
  );
};

export default Summary;
