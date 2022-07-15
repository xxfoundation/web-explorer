import { gql } from '@apollo/client';

export const TRANSFER_KEYS_FRAGMENT = gql`
  fragment transfer_key on transfer {
    blockNumber: block_number
    extrinsicIndex: extrinsic_index
  }
`;

export const LISTEN_FOR_TRANSFERS_ORDERED = gql`
  ${TRANSFER_KEYS_FRAGMENT}
  subscription ListenForTransfersOrdered($limit: Int) {
    transfers: transfer(order_by: { block_number: desc }, limit: $limit) {
      ...transfer_key
      hash
      source
      destination
      amount
      fee_amount
      module
      call
      success
      timestamp
    }
  }
`;

export type Transfer = {
  blockNumber: number;
  index: number;
  hash: string;
  source: string;
  destination: string;
  amount: number;
  feeAmount: number;
  module: string;
  call: string;
  success: boolean;
  timestamp: string;
};

export const TRANSFER_FRAGMENT = gql`
  fragment transfer_common_fields on transfer {
    blockNumber: block_number
    index: extrinsic_index
    hash
    source
    destination
    amount
    feeAmount: fee_amount
    module
    call
    success
    timestamp
  }
`;

export type GetTransfersByBlock = {
  transfers: (Transfer & { id: number })[];
};

export const LIST_TRANSFERS_ORDERED = gql`
  ${TRANSFER_FRAGMENT}
  query ListTransfersOrdered(
    $orderBy: [transfer_order_by!]
    $limit: Int
    $offset: Int
    $where: transfer_bool_exp
  ) {
    transfers: transfer(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      ...transfer_common_fields
      id
      timestamp
      source
      destination
    }
  }
`;

export const LIST_WHALE_TRANSFERS = gql`
  ${TRANSFER_FRAGMENT}
  query ListWhaleTransfers {
    transfers: whale_alert {
      ...transfer_common_fields
      id
      timestamp
      source
      destination
    }
  }
`;

export type GetTransferByPK = {
  transfer: Transfer & {
    sender: {
      address: string;
      identityDisplay: string;
    };
    receiver: {
      address: string;
      identityDisplay: string;
    };
  };
};

export const GET_TRANSFER_BY_PK = gql`
  ${TRANSFER_FRAGMENT}
  query GetTransferByPK($blockNumber: bigint!, $extrinsicIndex: Int!) {
    transfer: transfer_by_pk(block_number: $blockNumber, extrinsic_index: $extrinsicIndex) {
      ...transfer_common_fields
      sender: account {
        address: account_id
        identityDisplay:identity_display
      }
      receiver: accountByDestination {
        address: account_id
        identityDisplay:identity_display
      }
    }
  }
`;

type EraByTransaction = { era: number; transactions: number };

export type ListenForEraTransactions = {
  eraTransactions: EraByTransaction[];
};

export const LISTEN_FOR_ERA_TRANSACTIONS = gql`
  query ListenForEraTransactions {
    eraTransactions: era_transactions {
      era
      transactions
    }
  }
`;

export const GET_TRANSFERS_TIMESTAMPS = gql`
  query ListenForTransfersTimestamps(
    $orderBy: [transfer_order_by!]
    $where: transfer_bool_exp
  ) {
    transfer(order_by: $orderBy, where: $where) {
      timestamp
      amount
    }
  }
`;

export type GetTransferByAccountId = {
  transfers: Transfer[];
};

export const GET_TRANSFERS_BY_ACCOUNT_ID = gql`
  ${TRANSFER_FRAGMENT}
  query GetTransfersByAccountId ($accountId: String) {
    transfers: transfer(where: {
      _or: [
        { destination:  { _eq: $accountId } },
        { source:{ _eq: $accountId } }
      ]
    }) {
      ...transfer_common_fields
    }
  }
`