import { gql } from '@apollo/client';

const SEARCH_BLOCKS = gql`
  query GetBlockByPK($blockNumber: bigint!) {
    entity: blockchain_blocks_by_pk(block_number: $blockNumber) {
      id: block_number
    }
  }
`;

const SEARCH_ALL = gql`
  query AllBYPK($blockNumber: bigint!) {
    entity: blockchain_blocks_by_pk(block_number: $blockNumber) {
      id: block_number
    }
  }
`;

export { SEARCH_BLOCKS, SEARCH_ALL };
