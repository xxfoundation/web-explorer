import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React, { FC } from 'react';
import Address from '../../../../components/Hash/XXNetworkAddress';
import FormatBalance from '../../../../components/FormatBalance';
import {
  SummaryEntry,
  SummaryHeader,
  SummaryValue,
  WithCopy
} from '../../../../components/Summary';
import { GetTransferByPK, GET_TRANSFER_BY_PK } from '../../../../schemas/transfers.schema';

type Props = { blockNumber: number; extrinsicIndex: number };

const TransferFragment: FC<Props> = (variables) => {
  const { data, loading } = useQuery<GetTransferByPK>(GET_TRANSFER_BY_PK, { variables });
  if (loading) return <></>;
  if (!data?.transfer) return <></>;

  return (
    <>
      <SummaryEntry>
        <SummaryHeader>Sender</SummaryHeader>
        <SummaryValue>
          <WithCopy value={data.transfer.source}>
            <Address
              value={data.transfer.source}
              name={data.transfer.sourceAccount.identity?.display}
            />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Destination</SummaryHeader>
        <SummaryValue>
          <WithCopy value={data.transfer.destination}>
            <Address
              value={data.transfer.destination}
              name={data.transfer.destinationAccount.identity?.display}
            />
          </WithCopy>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Value</SummaryHeader>
        <SummaryValue>
          <Typography>
            <FormatBalance value={data.transfer.amount.toString()} />
          </Typography>
        </SummaryValue>
      </SummaryEntry>
      <SummaryEntry>
        <SummaryHeader>Fee</SummaryHeader>
        <SummaryValue>
          <Typography>
            <FormatBalance value={data.transfer.feeAmount.toString()} />
          </Typography>
        </SummaryValue>
      </SummaryEntry>
    </>
  );
};

export default TransferFragment;
