import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import CopyButton from '../../../../components/buttons/CopyButton';
import { Address } from '../../../../components/ChainId';
import FormatBalance from '../../../../components/FormatBalance';
import genSkeletons from '../../../../components/genSkeletons';
import { SummaryRow } from '../../../../components/Paper/SummaryPaper';
import {
  GetAccountIdentityByAddressType,
  GET_ACCOUNT_IDENTITY_BY_ADDRESS
} from '../../../../schemas/accounts.schema';
import { GetTransferByPK, GET_TRANSFER_BY_PK } from '../../../../schemas/transfers.schema';

type Props = { blockNumber: number; extrinsicIndex: number };

const AddressesHandler: FC<{ address: string }> = ({ address }) => {
  // TODO embbed logic on the address component itself
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

const SummaryFragment: FC<Props> = (variables) => {
  const { data, loading } = useQuery<GetTransferByPK>(GET_TRANSFER_BY_PK, { variables });
  if (loading)
    return (
      <>
        {genSkeletons(4).map((Row, index) => (
          <SummaryRow label={<Row width={'90%'} />} key={index}>
            <Row width={'90%'} />
          </SummaryRow>
        ))}
      </>
    );
  if (!data?.transfer) return <></>;
  return (
    <>
      <SummaryRow label='sender' action={<CopyButton value={data.transfer.source} />}>
        <AddressesHandler address={data.transfer.source} />
      </SummaryRow>
      <SummaryRow label='destination' action={<CopyButton value={data.transfer.destination} />}>
        <AddressesHandler address={data.transfer.destination} />
      </SummaryRow>
      <SummaryRow label='value'>
        <Typography>
          <FormatBalance value={data.transfer.amount.toString()} />
        </Typography>
      </SummaryRow>
      <SummaryRow label='fee'>
        <Typography>
          <FormatBalance value={data.transfer.feeAmount.toString()} />
        </Typography>
      </SummaryRow>
    </>
  );
};

export default SummaryFragment;
