import { gql } from '@apollo/client';

const LISTEN_FOR_BLOCKS_ORDERED = gql`
  subscription ListBlocksOrdered($limit: Int) {
    blocks: blockchain_blocks(order_by: { block_number: desc }, limit: $limit) {
      hash: block_hash
      number: block_number
      numberFinalized: block_number_finalized
      currentEra: current_era
      numTransfers: num_transfers
      totalEvents: total_events
    }
  }
`;

const LIST_BLOCK = gql`
  query ListBlocksOrdered($limit: Int, $offset: Int = 0, $where: blockchain_blocks_bool_exp) {
    agg: blockchain_blocks_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    blocks: blockchain_blocks(
      order_by: { block_number: desc }
      where: $where
      limit: $limit
      offset: $offset
    ) {
      hash: block_hash
      number: block_number
      numberFinalized: block_number_finalized
      currentEra: current_era
      timestamp
      numTransfers: num_transfers
      author: block_author
      authorName: block_author_name
    }
  }
`;

const GET_BLOCK_BY_PK = gql`
  fragment blocks on blockchain_blocks {
    number: block_number
    hash: block_hash
  }

  query GetBlockByPK($blockNumber: bigint!, $prevBlockNumber: bigint!, $nextBlockNumber: bigint!) {
    prev: blockchain_blocks_by_pk(block_number: $prevBlockNumber) {
      ...blocks
    }
    block: blockchain_blocks_by_pk(block_number: $blockNumber) {
      ...blocks
      numberFinalized: block_number_finalized
      currentEra: current_era
      parentHash: parent_hash
      stateRoot: state_root
      extrinsicsRoot: extrinsics_root
      author: block_author
      authorName: block_author_name
      timestamp
      specVersion: spec_version
      totalEvents: total_events
      numTransfers: num_transfers
    }
    next: blockchain_blocks_by_pk(block_number: $nextBlockNumber) {
      ...blocks
    }
  }
`;

export { LISTEN_FOR_BLOCKS_ORDERED, LIST_BLOCK, GET_BLOCK_BY_PK };
