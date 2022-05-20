import { gql } from '@apollo/client';

export const TRANSFER_KEYS_FRAGMENT = gql`
  fragment transfer_key on transfer {
    blockNumber: block_number
    extrinsicIndex: extrinsic_index
  }
`;

export const LISTEN_FOR_TRANSFERS_ORDERED = gql`
  ${TRANSFER_KEYS_FRAGMENT}
  subscription ListTransfersOrdered($limit: Int) {
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

export type Transference = {
  blockNumber: number;
  extrinsicIndex: number;
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
  fragment tranfer_common_fields on transfer {
    blockNumber: block_number
    extrinsicIndex: extrinsic_index
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

export type GetTransferencesByBlock = { transfers: Transference[] };

export const GET_TRANSFERS_OF_BLOCK = gql`
  ${TRANSFER_FRAGMENT}
  query ListTransfersOrdered(
    $orderBy: [transfer_order_by!]
    $limit: Int
    $offset: Int
    $where: transfer_bool_exp
  ) {
    transfers: transfer(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      ...tranfer_common_fields
    }
  }
`;

export type GetTransferByPK = { transfer: Transference };

export const GET_TRANSFER_BY_PK = gql`
  ${TRANSFER_FRAGMENT}
  query TransferenceByPK($blockNumber: bigint!, $extrinsicIndex: Int!) {
    transfer: transfer_by_pk(block_number: $blockNumber, extrinsic_index: $extrinsicIndex) {
      ...tranfer_common_fields
    }
  }
`;
