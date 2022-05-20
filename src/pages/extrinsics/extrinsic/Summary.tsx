import { useQuery } from '@apollo/client';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Divider, Skeleton, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import BlockStatusIcon from '../../../components/block/BlockStatusIcon';
import CopyButton from '../../../components/buttons/CopyButton';
import { Address, Hash } from '../../../components/ChainId';
import FormatBalance from '../../../components/FormatBalance';
import genSkeletons from '../../../components/genSkeletons';
import Link from '../../../components/Link';
import LoadingSummary from '../../../components/Paper/LoadingSummary';
import SummaryPaper from '../../../components/Paper/SummaryPaper';
import TimeAgo from '../../../components/TimeAgo';
import {
  GetAccountIdentityByAddressType,
  GET_ACCOUNT_IDENTITY_BY_ADDRESS
} from '../../../schemas/accounts.schema';
import { GetExtrinsicByPK } from '../../../schemas/extrinsics.schema';
import {
  GetTransferByPK,
  GET_TRANSFER_BY_PK,
  Transference
} from '../../../schemas/transfers.schema';
import ModuleCalls from '../ModuleCalls';
import ParametersActions from './ParametersActions';

const sampleParameters = {
  this: 'isn\'t real yet'
};

const elementDivider = (
  <Divider variant='middle' orientation='horizontal' sx={{ width: '100%', p: 0, m: 0 }} />
);

const AddressesHandler: FC<{ address: string }> = ({ address }) => {
  const { data, loading } = useQuery<GetAccountIdentityByAddressType>(
    GET_ACCOUNT_IDENTITY_BY_ADDRESS,
    {
      variables: { accountId: address }
    }
  );
  if (!loading && data?.account && data?.account.id)
    return (
      <Address
        value={data.account.id}
        name={data.account.identityDisplay}
        link={`/accounts/${data.account.id}`}
      />
    );
  return <Address value={address} link={`/accounts/${address}`} />;
};

const transferenceFields = (transfer?: Transference) => {
  if (!transfer) return genSkeletons(9).map(() => ({ label: <Skeleton />, value: <Skeleton /> }));
  return [
    {
      label: 'sender',
      value: <AddressesHandler address={transfer.source} />,
      action: <CopyButton value={transfer.source} />
    },
    {
      label: 'destination',
      value: <AddressesHandler address={transfer.destination} />,
      action: <CopyButton value={transfer.destination} />
    },
    {
      label: 'value',
      value: (
        <Typography>
          <FormatBalance value={transfer.amount.toString()} />
        </Typography>
      )
    },
    {
      label: 'fee',
      value: (
        <Typography>
          <FormatBalance value={transfer.feeAmount.toString()} />
        </Typography>
      )
    }
  ];
};

const extrinsicsDetailData = (
  data: GetExtrinsicByPK['extrinsic'],
  blockNumber: number,
  transfer?: Transference
) => [
  { label: 'time', value: <TimeAgo date={data.timestamp} /> },
  {
    label: 'block',
    value: (
      <Link to={`/blocks/${blockNumber}`}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <CheckCircleOutlineOutlinedIcon color='success' />
          <Typography>{blockNumber}</Typography>
        </Stack>
      </Link>
    )
  },
  {
    label: 'lifetime',
    value: <Typography>{data.lifetime || 'Immortal'}</Typography> // TODO get this value
  },
  {
    label: 'extrinsic hash',
    value: <Hash value={data.hash} />,
    action: <CopyButton value={data.hash} />
  },
  {
    label: 'module/call',
    value: <ModuleCalls module={data.method} call={data.section} />
  },
  ...transferenceFields(transfer),
  {
    label: 'nonce',
    value: <Typography>8329</Typography>
  },
  {
    label: 'result',
    value: (
      <Stack direction='row' spacing={1} alignItems='center'>
        <BlockStatusIcon status={data.success ? 'successful' : 'failed'} />
        <Typography>{data.success ? 'Success' : 'Failure'}</Typography>
      </Stack>
    )
  },
  {
    label: elementDivider,
    value: elementDivider
  },
  {
    label: 'parameters',
    value: <ParametersActions data={sampleParameters} />
  },
  {
    label: 'signature',
    value: (
      <Typography>
        0x9b9721540932d6989b92aab8cc11469cc4c3e5a5ca88053c563b4e49d910a8692377ef3046d27667cffb3cc7b963f86d0cbaa043113c2949b970a5bb14658ea401
      </Typography>
    )
  }
];

const Summary: FC<{
  extrinsic: GetExtrinsicByPK['extrinsic'];
  extrinsicId: { blockNumber: number; extrinsicIndex: number };
}> = ({ extrinsic, extrinsicId }) => {
  const { data, loading } = useQuery<GetTransferByPK>(GET_TRANSFER_BY_PK, {
    variables: extrinsicId
  });

  if (loading) return <LoadingSummary number={9} />;
  if (!data?.transfer)
    return <Typography>not transference bound to this extrinsic. what should be done?</Typography>;
  return (
    <SummaryPaper data={extrinsicsDetailData(extrinsic, extrinsicId.blockNumber, data?.transfer)} />
  );
};

export default Summary;
