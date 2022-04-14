import { gql } from '@apollo/client';

const LIST_BLOCKS_ORDERED = gql`
  subscription ListBlocksOrdered($limit: Int) {
    blockchain_blocks(order_by: { block_number: desc }, limit: $limit) {
      block_hash
      block_number
      block_number_finalized
      current_era
      num_transfers
      total_events
    }
  }
`;

export { LIST_BLOCKS_ORDERED };
