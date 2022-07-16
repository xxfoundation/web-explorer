import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

export type AuthorName = {
  identity: {
    display: string;
  }
}

export type Block = {
  numberFinalized: number;
  number: number;
  currentEra: string;
  finalized: boolean;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  author: string;
  authorName: AuthorName[];
  timestamp: number;
  specVersion: number;
  totalEvents: number;
  totalExtrinsics: number;
}

export const BLOCK_KEYS_FRAGMENT = gql`
  fragment blocks on block {
    number: block_number
    hash: block_hash
    finalized: finalized
    currentEra: active_era
    parentHash: parent_hash
    stateRoot: state_root
    extrinsicsRoot: extrinsics_root
    author: block_author
    timestamp
    specVersion: spec_version
    totalEvents: total_events
    totalExtrinsics: total_extrinsics
    authorName: account {
      identity {
        display: display
      }
    }
  }
`;

export const LISTEN_FOR_BLOCKS_ORDERED = gql`
  ${BLOCK_KEYS_FRAGMENT}
  subscription ListenForBlocksOrdered($limit: Int) {
    blocks: block(order_by: { block_number: desc }, limit: $limit) {
      ...blocks
    }
  }
`;

export type ListBlockOrdered = {
  blocks: {
    hash: string;
    number: number;
    numberFinalized: number;
    finalized: boolean;
    currentEra: number;
    timestamp: number;
    totalExtrinsics: number;
    author: string;
    authorName: string;
  }[];
} & TotalOfItems;

export const LIST_BLOCK_ORDERED = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query ListBlocksOrdered($limit: Int, $offset: Int = 0, $where: block_bool_exp) {
    agg: block_aggregate(where: $where) {
      aggregate {
        count
      }
    }

    blocks: block(order_by: { block_number: desc }, where: $where, limit: $limit, offset: $offset) {
      ...blocks
    }
  }
`;


export type GetBlockByPK = {
  block: Block;
};

export const GET_BLOCK_BY_BLOCK_NUMBER = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query GetBlockByPK($blockNumber: bigint!) {
    block: block_by_pk(block_number: $blockNumber) {
      ...blocks
    }
  }
`;

export type GetBlockByHash = {
  block: Block[];
}


export const GET_BLOCK_BY_HASH = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query GetBlockByHash($blockHash: String!) {
    block (where: { block_hash: { _eq: $blockHash }}, limit: 1) {
      ...blocks
    }
  }
`;

export type GetBlocksByBP = {
  blocks: {
    number: number;
    currentEra: number;
  }[];
};

export const GET_BLOCKS_BY_BP = gql`
  query ListBlocksOrdered($where: block_bool_exp) {
    blocks: block(where: $where) {
      number: block_number
      currentEra: active_era
    }
  }
`;

export type GetBlockCounts = {
  extrinsics: {
    aggregate: {
      count: number
    }
  },
  events: {
    aggregate: {
      count: number
    }
  }
}

export const GET_BLOCK_COUNTS = gql`
  query GetBlockCounts($blockNumber: bigint!) {
    events: event_aggregate(where: {block_number: {_eq: $blockNumber}}) {
      aggregate {
        count
      }
    }
    
    extrinsics: extrinsic_aggregate(where: {block_number: {_eq: $blockNumber}}) {
      aggregate {
        count
      }
    }
  }
`
