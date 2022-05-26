import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

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
  fragment transference_common_fields on transfer {
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
    $orderBy: [transfer_order_by!]
    $limit: Int
    $offset: Int
    $where: transfer_bool_exp
  ) {
    agg: transfer_aggregate {
      aggregate {
        count
      }
    }
    transfers: transfer(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      ...transference_common_fields
      id
    }
  }
`;

export type GetTransferByPK = { transfer: Transfer };

export const GET_TRANSFER_BY_PK = gql`
  ${TRANSFER_FRAGMENT}
  query GetTransferByPK($blockNumber: bigint!, $extrinsicIndex: Int!) {
    transfer: transfer_by_pk(block_number: $blockNumber, extrinsic_index: $extrinsicIndex) {
      ...transference_common_fields
    }
  }
`;
