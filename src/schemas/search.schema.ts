import { gql } from '@apollo/client';

const SEARCH_BLOCKS = gql`
  query GetBlockByPK($blockNumber: bigint!) {
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
  }
`;

export { SEARCH_BLOCKS };
