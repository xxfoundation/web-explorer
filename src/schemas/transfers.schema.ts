import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

export const TRANSFER_KEYS_FRAGMENT = gql`
  fragment transfer_key on blockchain_transfer {
    blockNumber: block_number
    extrinsicIndex: extrinsic_index
  }
`;

export const LISTEN_FOR_TRANSFERS_ORDERED = gql`
  ${TRANSFER_KEYS_FRAGMENT}
  subscription ListenForTransfersOrdered($limit: Int) {
    transfers: blockchain_transfer(order_by: { block_number: desc }, limit: $limit) {
      ...transfer_key
      hash
      source
      destination
      amount
      fee_amount
      section
      method
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
  section: string;
  method: string;
  success: boolean;
  timestamp: string;
};

export const TRANSFER_FRAGMENT = gql`
  fragment transference_common_fields on blockchain_transfer {
    blockNumber: block_number
    index: extrinsic_index
    hash
    source
    destination
    amount
    feeAmount: fee_amount
    section
    method
    success
    timestamp
  }
`;

export type GetTransfersByBlock = {
  transfers: (Transfer & { id: number })[];
} & TotalOfItems;

export const LIST_TRANSFERS_ORDERED = gql`
  ${TRANSFER_FRAGMENT}
  query ListTransfersOrdered(
    $orderBy: [blockchain_transfer_order_by!]
    $limit: Int
    $offset: Int
    $where: blockchain_transfer_bool_exp
  ) {
    agg: blockchain_transfer_aggregate {
      aggregate {
        count
      }
    }
    transfers: blockchain_transfer(
      order_by: $orderBy
      limit: $limit
      offset: $offset
      where: $where
    ) {
      ...transference_common_fields
      id
      source
      destination
    }
  }
`;

export type GetTransferByPK = {
  transfer: Transfer & {
    source: {
      address: string;
      identityDisplay?: string;
    };
    destination: {
      address: string;
      identityDisplay?: string;
    };
  };
};

export const GET_TRANSFER_BY_PK = gql`
  ${TRANSFER_FRAGMENT}
  query GetTransferByPK($blockNumber: bigint!, $extrinsicIndex: Int!) {
    transfer: blockchain_transfer_by_pk(
      block_number: $blockNumber
      extrinsic_index: $extrinsicIndex
    ) {
      ...transference_common_fields
      source: account {
        address: id
        identityDisplay
      }
      destination: accountByDestination {
        address: id
        identityDisplay
      }
    }
  }
`;
