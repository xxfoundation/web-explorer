import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import BlockStatusIcon from '../../../../components/block/BlockStatusIcon';
import CopyButton from '../../../../components/buttons/CopyButton';
import { Address, Hash } from '../../../../components/ChainId';
import Link from '../../../../components/Link';
import { SummaryPaperWrapper, SummaryRow } from '../../../../components/Paper/SummaryPaper';
import TimeAgo from '../../../../components/TimeAgo';
import { GetExtrinsicByPK } from '../../../../schemas/extrinsics.schema';
import ModuleCalls from '../ModuleCalls';
import ParametersFragment from './ParametersFragment';
import SummaryFragment from './TransferFragment';

type Props = {
  extrinsic: GetExtrinsicByPK['extrinsic'];
  extrinsicId: { blockNumber: number; extrinsicIndex: number };
};

const Summary: FC<Props> = ({ extrinsic, extrinsicId }) => {
  return (
    <>
      <SummaryPaperWrapper>
        <SummaryRow label='time'>
          <TimeAgo date={extrinsic.timestamp} />
        </SummaryRow>
        <SummaryRow label='block'>
          <Link to={`/blocks/${extrinsicId.blockNumber}`}>
            <Stack direction='row' spacing={1} alignItems='center'>
              <CheckCircleOutlineOutlinedIcon color='success' />
              <Typography>{extrinsicId.blockNumber}</Typography>
            </Stack>
          </Link>
        </SummaryRow>
        <SummaryRow label='lifetime'>
          <Typography>{extrinsic.lifetime || 'Immortal'}</Typography>
        </SummaryRow>
        <SummaryRow label='extrinsic hash' action={<CopyButton value={extrinsic.hash} />}>
          <Hash value={extrinsic.hash} />
        </SummaryRow>
        <SummaryRow label='module/call'>
          <ModuleCalls module={extrinsic.section} call={extrinsic.method} doc={extrinsic.doc} />
        </SummaryRow>
        <SummaryFragment {...extrinsicId} />
        <SummaryRow label='result'>
          <Stack direction='row' spacing={1} alignItems='center'>
            <BlockStatusIcon status={extrinsic.success ? 'successful' : 'failed'} />
            <Typography>{extrinsic.success ? 'Success' : 'Failure'}</Typography>
          </Stack>
        </SummaryRow>
        <SummaryRow
          label={
            <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
          }
        >
          <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
        </SummaryRow>
        <ParametersFragment args={JSON.parse(extrinsic.args)} def={JSON.parse(extrinsic.argsDef)} />
        {extrinsic.signer && extrinsic.isSigned && (
          <SummaryRow label='signer'>
            <Address value={extrinsic.signer} />
          </SummaryRow>
        )}
      </SummaryPaperWrapper>
    </>
  );
};

export default Summary;
