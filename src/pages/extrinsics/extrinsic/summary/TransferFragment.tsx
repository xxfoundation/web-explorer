import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import CopyButton from '../../../../components/buttons/CopyButton';
import { Address } from '../../../../components/ChainId';
import FormatBalance from '../../../../components/FormatBalance';
import genSkeletons from '../../../../components/genSkeletons';
import { SummaryRow } from '../../../../components/Paper/SummaryPaper';
import { GetTransferByPK, GET_TRANSFER_BY_PK } from '../../../../schemas/transfers.schema';

type Props = { blockNumber: number; extrinsicIndex: number };

const AddressesHandler: FC<{
  address: string;
  identity?: string;
}> = ({ address, identity: identityDisplay }) => {
  if (identityDisplay) {
    return <Address value={address} name={identityDisplay} link={`/accounts/${address}`} />;
  }
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
      <SummaryRow label='sender' action={<CopyButton value={data.transfer.sender.address} />}>
        <AddressesHandler
          address={data.transfer.sender.address}
          identity={data.transfer.sender.identityDisplay}
        />
      </SummaryRow>
      <SummaryRow label='destination' action={<CopyButton value={data.transfer.received.address} />}>
        <AddressesHandler
          address={data.transfer.received.address}
          identity={data.transfer.received.identityDisplay}
        />
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
