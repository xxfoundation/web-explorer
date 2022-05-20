import { gql } from '@apollo/client';

export const TRANSFER_KEYS_FRAGMENT = gql`
  fragment transfers on transfer {
    blockNumber: block_number
    extrinsicIndex: extrinsic_index
  }
`;

export const LISTEN_FOR_TRANSFERS_ORDERED = gql`
  ${TRANSFER_KEYS_FRAGMENT}
  subscription ListTransfersOrdered($limit: Int) {
    transfers: transfer(order_by: { block_number: desc }, limit: $limit) {
      ...transfers
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

export const TRANSFERS_OF_BLOCK = gql`
  query ListTransfersOrdered(
    $orderBy: [transfer_order_by!]
    $limit: Int
    $offset: Int
    $where: transfer_bool_exp
  ) {
    transfers: transfer(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id: event_index
      hash
      block_number
      extrinsic_index
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

export type TransferenceByBlockNumber = {
  transfer: {
    amount: number;
    feeAmount: number;
    destination: string;
    source: string;
  };
};

export const TRANSFERENCE_BY_BLOCK_NUMBER = gql`
  query Transfer_by_pk($blockNumber: bigint!) {
    transfer(where: { block_number: { _eq: $blockNumber } }) {
      amount
      extrinsicIndex: extrinsic_index
      feeAmount: fee_amount
      destination
      source
      hash
      method
      section
      success
      timestamp
    }
  }
`;
