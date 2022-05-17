import { gql } from '@apollo/client';

export const BLOCK_KEYS_FRAGMENT = gql`
  fragment blocks on block {
    number: block_number
    hash: block_hash
  }
`;

const LISTEN_FOR_BLOCKS_ORDERED = gql`
  ${BLOCK_KEYS_FRAGMENT}
  subscription ListBlocksOrdered($limit: Int) {
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

const LIST_BLOCK = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query ListBlocksOrdered($limit: Int, $offset: Int = 0, $where: block_bool_exp) {
    agg: block_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    blocks: block(
      order_by: { block_number: desc }
      where: $where
      limit: $limit
      offset: $offset
    ) {
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

const GET_BLOCK_BY_PK = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query GetBlockByPK($blockNumber: bigint!) {
    blocks: block_by_pk(block_number: $blockNumber) {
      ...block
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

export { LISTEN_FOR_BLOCKS_ORDERED, LIST_BLOCK, GET_BLOCK_BY_PK };
