import { gql } from '@apollo/client';
import { Roles, ROLES_FRAGMENT } from './accounts.schema';
import { TotalOfItems } from './types';

/* -------------------------------------------------------------------------- */
/*                             Extrinsic Fragment                             */
/* -------------------------------------------------------------------------- */
const EXTRINSIC_FRAGMENT = gql`
  ${ROLES_FRAGMENT}
  fragment extrinsicFragment on extrinsic {
    blockNumber: block_number
    dispatchInfo: dispatch_info
    extrinsicIndex: extrinsic_index
    hash
    module
    call
    success
    timestamp
    isSigned: is_signed
    signer
    signerAccount {
      ...roles_fragment
      identity {
        display
      }
    }
    args
    argsDef: args_def
    doc
    errorMsg: error_message
    fee
    tip
    nestedCalls: nested_calls
  }
`

export type NestedCall = {
  module: string;
  call: string;
  args: string;
  args_def: string;
  doc: string;
  success: boolean;
  depth: number;
  error_message: string;
}

export type Extrinsic = {
  id: number;
  blockNumber: number;
  dispatchInfo: string;
  extrinsicIndex: number;
  hash: string;
  timestamp: number;
  module: string;
  call: string;
  success: boolean;
  signer?: string;
  signerAccount: null | Roles & {
    identity: null | {
      display: string
    }
  },
  isSigned: boolean;
  args: Array<string | number>;
  argsDef: Record<string, string>;
  doc: string[];
  errorMsg: string;
  fee: number | null;
  tip: number;
  nestedCalls: Array<NestedCall> | null;
}

/* -------------------------------------------------------------------------- */
/*                         Search Bar > Find Extrinsic                        */
/* -------------------------------------------------------------------------- */
export type FindExtrinsicByHashType = {
  extrinsic?: [
    {
      blockNumber: number;
      index: number;
      hash: string;
    }
  ];
};

export const FIND_EXTRINSIC_BY_HASH = gql`
  query FindExtrinsicByHash($where: extrinsic_bool_exp) {
    extrinsic(where: $where) {
      blockNumber: block_number
      index: extrinsic_index
      hash
    }
  }
`;

export type GetExtrinsicByHash = {
  extrinsic: Extrinsic[]
};

export const GET_EXTRINSIC_BY_HASH = gql`
  ${EXTRINSIC_FRAGMENT}
  query FindExtrinsicByHash($hash: String!) {
    extrinsic(where: { hash: {_eq: $hash }}) {
      ...extrinsicFragment
    }
  }
`;

export type GetExtrinsicByBNAndIndex = {
  extrinsic: Extrinsic[];
}

export const GET_EXTRINSIC_BY_BN_AND_INDEX = gql`
  ${EXTRINSIC_FRAGMENT}
  query FindExtrinsicByBNAndIndex($blockNumber: bigint!, $extrinsicIndex: Int!) {
    extrinsic(where: { block_number: {_eq: $blockNumber }, extrinsic_index: {_eq: $extrinsicIndex } }) {
      ...extrinsicFragment
    }
  }
`

/* -------------------------------------------------------------------------- */
/*                           Get Extrinsics of Block                          */
/* -------------------------------------------------------------------------- */
export const EXTRINSICS_OF_BLOCK = gql`
  ${EXTRINSIC_FRAGMENT}
  query ListExtrinsicOfBlock(
    $orderBy: [extrinsic_order_by!]
    $where: extrinsic_bool_exp
  ) {
    extrinsics: extrinsic(order_by: $orderBy, where: $where) {
      ...extrinsicFragment
    }
    
    agg: extrinsic_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                              Extrinsics Table                              */
/* -------------------------------------------------------------------------- */
export type ListExtrinsics = {
  extrinsics: Extrinsic[];
} & TotalOfItems;

export const LIST_EXTRINSICS = gql`
  ${EXTRINSIC_FRAGMENT}
  query ListExtrinsicOrdered(
    $limit: Int
    $offset: Int = 0
    $orderBy: [extrinsic_order_by!]
    $where: extrinsic_bool_exp
  ) {
    agg: extrinsic_aggregate(where: $where) {
      aggregate {
        count
      }
    }

    extrinsics: extrinsic(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      ...extrinsicFragment
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                            Extrinsics Bar Chart                            */
/* -------------------------------------------------------------------------- */
export const GET_EXTRINSICS_TIMESTAMPS = gql`
  query GetExtrinsicsTimestamps(
    $orderBy: [extrinsic_order_by!]
    $where: extrinsic_bool_exp
  ) {
    extrinsic(order_by: $orderBy, where: $where) {
      timestamp
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                          Get a Specific Extrinsic                          */
/* -------------------------------------------------------------------------- */
export type GetExtrinsicWhere = {
  extrinsic: Extrinsic[];
} & TotalOfItems;

export const GET_EXTRINSIC_WHERE = gql`
  ${EXTRINSIC_FRAGMENT}
  query GetExtrinsicByPk($where1: extrinsic_bool_exp, $where2: transfer_bool_exp) {
    extrinsic (where: $where1) {
      ...extrinsicFragment
    }
    agg: transfer_aggregate(where: $where2) {
      aggregate {
        count
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                         Get extrinsic counts                               */
/* -------------------------------------------------------------------------- */
export type GetExtrinsicCounts = {
  counts: { count: number, timestamp: string }[]
}

export const GET_HOURLY_EXTRINSIC_COUNTS = gql`
  query GetHourlyExtrinsicCounts {
    counts: hourly_extrinsic_counts {
      count
      timestamp: interval_start
    }
  }
`;

export const GET_DAILY_EXTRINSIC_COUNTS = gql`
  query GetDailyExtrinsicCounts {
    counts: daily_extrinsic_counts {
      count
      timestamp: interval_start
    }
  }
`;

export const GET_SIX_HOUR_EXTRINSIC_COUNTS = gql`
  query GetSixHourExtrinsicCounts {
    counts: six_hour_extrinsic_counts {
      count
      timestamp: interval_start
    }
  }
`

/* -------------------------------------------------------------------------- */
/*                         Subscription to new ext                            */
/* -------------------------------------------------------------------------- */

export type SubscribeExtrinsicsSinceBlock = {
  extrinsics: {
    aggregate: {
      count: number;
    }
  }
};

export const SUBSCRIBE_EXTRINSICS_SINCE_BLOCK = gql`
  subscription ExtrinsicSinceBlock ($where: extrinsic_bool_exp) {
    extrinsics: extrinsic_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
