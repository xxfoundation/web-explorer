import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { Address } from '../../../../components/ChainId';
import FormatBalance from '../../../../components/FormatBalance';
import { SummaryEntry, SummaryHeader, SummaryValue, WithCopy } from '../../../../components/Summary';
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
        
      </>
    );
  if (!data?.transfer) return <></>;
  return (
    <>
      <SummaryEntry>
        <SummaryHeader>
          Sender
        </SummaryHeader>
        <SummaryValue>
          <WithCopy value={data.transfer.sender.address} >
            <AddressesHandler
              address={data.transfer.sender.address}
              identity={data.transfer.sender.identityDisplay}
            />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>
          Destination
        </SummaryHeader>
        <SummaryValue>
          <WithCopy value={data.transfer.receiver.address}>
            <AddressesHandler
              address={data.transfer.receiver.address}
              identity={data.transfer.receiver.identityDisplay}
            />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>
          Value
        </SummaryHeader>
        <SummaryValue>
          <Typography>
            <FormatBalance value={data.transfer.amount.toString()} />
          </Typography>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>
          Fee
        </SummaryHeader>
        <SummaryValue>
          <Typography>
            <FormatBalance value={data.transfer.feeAmount.toString()} />
          </Typography>
        </SummaryValue>
      </SummaryEntry>
    </>
  );
};

export default SummaryFragment;
