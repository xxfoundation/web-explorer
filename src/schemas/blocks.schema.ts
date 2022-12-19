import { gql } from '@apollo/client';
import { Roles, ROLES_FRAGMENT } from './accounts.schema';
import { TotalOfItems } from './types';

/* ---------------------------- General Variables --------------------------- */
export type AuthorName = Roles & {
  identity: {
    display: string;
  }
}

/* -------------------------------------------------------------------------- */
/*                               Block Fragment                               */
/* -------------------------------------------------------------------------- */
export type Block = {
  numberFinalized: number;
  number: number;
  currentEra: number;
  finalized: boolean;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  author: string;
  authorName: AuthorName;
  timestamp: number;
  specVersion: number;
  totalEvents: number;
  totalExtrinsics: number;
}

export const BLOCK_KEYS_FRAGMENT = gql`
  ${ROLES_FRAGMENT}
  fragment blocks on block {
    number: block_number
    hash: block_hash
    finalized: finalized
    currentEra: era
    parentHash: parent_hash
    stateRoot: state_root
    extrinsicsRoot: extrinsics_root
    author: block_author
    timestamp
    specVersion: spec_version
    totalEvents: total_events
    totalExtrinsics: total_extrinsics
    authorName: account {
      ...roles_fragment
      identity {
        display: display
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                       Subscription for Latest Blocks                       */
/* -------------------------------------------------------------------------- */

export const LISTEN_FOR_LATEST_BLOCKS = gql`
  ${BLOCK_KEYS_FRAGMENT}
  subscription ListenForLatestBlocks($limit: Int) {
    blocks: block(order_by: { block_number: desc }, limit: $limit) {
      ...blocks
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                                Blocks Table                                */
/* -------------------------------------------------------------------------- */
export type ListOfBlocksOrdered = {
  blocks: {
    hash: string;
    number: number;
    numberFinalized: number;
    finalized: boolean;
    currentEra: number;
    timestamp: number;
    totalExtrinsics: number;
    author: string;
    authorName: AuthorName[];
  }[];
} & TotalOfItems;

export const LIST_BLOCKS_ORDERED = gql`
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

/* -------------------------------------------------------------------------- */
/*                              New Blocks Count                              */
/* -------------------------------------------------------------------------- */
export type SubscribeBlocksSinceBlock = {
  blocks: {
    aggregate: {
      count: number;
    }
  }
};

export const SUBSCRIBE_BLOCKS_SINCE_BLOCK = gql`
  subscription SubscribeToBlocksSinceBlock ($where: block_bool_exp) {
    blocks: block_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`

/* -------------------------------------------------------------------------- */
/*                          Get Blocks by Identifiers                         */
/* -------------------------------------------------------------------------- */
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
  query GetBlockByHash($hash: String!) {
    block (where: { block_hash: { _eq: $hash }}, limit: 1) {
      ...blocks
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                        Get Blocks By Block Producer                        */
/* -------------------------------------------------------------------------- */
export type ProducedBlocks = {
  blocks: {
    number: number;
    currentEra: number;
  }[];
};
export const GET_BLOCKS_BY_BP = gql`
  query GetBlocksByProducer($where: block_bool_exp) {
    blocks: block(where: $where) {
      number: block_number
      currentEra: era
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                        Get Blocks By Block Producer                        */
/* -------------------------------------------------------------------------- */
export type GetBlockProducers = {
  producers: {
    address: string
  }[];
};
export const GET_BLOCK_PRODUCERS = gql`
  query GetDistinctProducers($search: String) {
    producers: block(
      where: {
        _or: [
          {
            block_author: {
              _ilike:$search
            }
          },
          {
            account: {
              identity:{
                display: {_ilike: $search}
              }
            }
          }
        ]
      },
      distinct_on: block_author
    ) {
      address:block_author
    }
  }
`;
/* -------------------------------------------------------------------------- */
/*                             Block Detailed Tabs                            */
/* -------------------------------------------------------------------------- */
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
/* -------------------------------------------------------------------------- */
/*                            Search Blocks                                   */
/* -------------------------------------------------------------------------- */

export type SearchBlocks = {
  blocks: Block[]
}

export const SEARCH_BLOCKS = gql`
  ${BLOCK_KEYS_FRAGMENT}
  query SearchBlocks($hash: String, $blockNumber: bigint) {
    blocks: block (where: { _or: [
      { block_number: { _eq: $blockNumber } },
      { block_hash: { _eq: $hash } }
    ] }) {
      ...blocks
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                    Latest Finalized Block Subscription                     */
/* -------------------------------------------------------------------------- */
export type FinalizedBlockCount = {
  block: {
    aggregate: {
      count: number
    }
  }
}

export const LISTEN_FINALIZE_BLOCK_COUNT = gql`
  subscription FinalizedBlockCountSubscription {
    block: block_aggregate(where: {finalized: {_eq: true}}) {
      aggregate {
        count
      }
    }
  }
`;


/* -------------------------------------------------------------------------- */
/*                               GetCurrentEra                                */
/* -------------------------------------------------------------------------- */

export type GetCurrentEra = {
  block: {
    aggregate: {
      max: {
        era: number
      }
    }
  }
};

export const GET_CURRENT_ERA = gql`
  query GetCurrentEra {
    block: block_aggregate(where: {finalized: {_eq: true}}) {
      aggregate {
        max {
          era
        }
      }
    }
  }
`