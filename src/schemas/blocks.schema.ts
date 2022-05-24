import { gql } from '@apollo/client';

export const BLOCK_KEYS_FRAGMENT = gql`
  fragment blocks on block {
    number: block_number
    hash: block_hash
  }
`;

export const LISTEN_FOR_BLOCKS_ORDERED = gql`
  ${BLOCK_KEYS_FRAGMENT}
  subscription ListenForBlocksOrdered($limit: Int) {
    blocks: block(order_by: { block_number: desc }, limit: $limit) {
      ...blocks
      finalized: finalized
      currentEra: active_era
      totalExtrinsics: total_extrinsics
      totalEvents: total_events
      timestamp
    }
  }
`;

export type ListBlockOrdered = {
  blocks: {
    hash: string;
    number: number;
    numberFinalized: number;
    currentEra: number;
    timestamp: number;
    totalExtrinsics: number;
    author: string;
    authorName: string;
  }[];
  agg: { aggregate: { count: number } };
};

export const LIST_BLOCK_ORDERED = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query ListBlocksOrdered($limit: Int, $offset: Int = 0, $where: block_bool_exp) {
    agg: block_aggregate {
      aggregate {
        count
      }
    }
    blocks: block(order_by: { block_number: desc }, where: $where, limit: $limit, offset: $offset) {
      ...blocks
      finalized: finalized
      currentEra: active_era
      timestamp
      totalExtrinsics: total_extrinsics
      author: block_author
      authorName: block_author_name
    }
  }
`;

export type GetBlockByPK = {
  block: {
    numberFinalized: number;
    number: number;
    currentEra: string;
    hash: string;
    parentHash: string;
    stateRoot: string;
    extrinsicsRoot: string;
    author: string;
    authorName: string;
    timestamp: number;
    specVersion: number;
    totalEvents: number;
    totalExtrinsics: number;
  };
};

export const GET_BLOCK_BY_PK = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query GetBlockByPK($blockNumber: bigint!) {
    block: block_by_pk(block_number: $blockNumber) {
      ...blocks
      finalized: finalized
      currentEra: active_era
      parentHash: parent_hash
      stateRoot: state_root
      extrinsicsRoot: extrinsics_root
      author: block_author
      authorName: block_author_name
      timestamp
      specVersion: spec_version
      totalEvents: total_events
      totalExtrinsics: total_extrinsics
    }
  }
`;
