import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

/* -------------------------------------------------------------------------- */
/*                             Extrinsic Fragment                             */
/* -------------------------------------------------------------------------- */
const EXTRINSIC_FRAGMENT = gql`
  fragment extrinsicFragment on extrinsic {
    blockNumber: block_number
    extrinsicIndex: extrinsic_index
    hash
    module
    call
    success
    timestamp
    isSigned: is_signed
    signer
    args
    argsDef: args_def
    doc
    errorMsg: error_message
  }
`

export type Extrinsic = {
  id: number;
  blockNumber: number;
  extrinsicIndex: number;
  hash: string;
  lifetime?: string | number;
  timestamp: number;
  module: string;
  call: string;
  success: boolean;
  signer?: string;
  isSigned: boolean;
  args: Array<string | number>;
  argsDef: Record<string, string>;
  doc: string[];
  errorMsg: string;
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

/* -------------------------------------------------------------------------- */
/*                           Get Extrinsics of Block                          */
/* -------------------------------------------------------------------------- */
export const EXTRINSICS_OF_BLOCK = gql`
  query ListExtrinsicOfBlock(
    $orderBy: [extrinsic_order_by!]
    $where: extrinsic_bool_exp
  ) {
    extrinsics: extrinsic(order_by: $orderBy, where: $where) {
      id
      extrinsicIndex: extrinsic_index
      blockNumber: block_number
      hash
      timestamp
      success
      call
      signer
      module
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
};

export const GET_EXTRINSIC_WHERE = gql`
  ${EXTRINSIC_FRAGMENT}
  query GetExtrinsicByPk($where: extrinsic_bool_exp) {
    extrinsic (where: $where) {
      ...extrinsicFragment
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                         Get available Module / Call                        */
/* -------------------------------------------------------------------------- */
export type GetAvailableExtrinsicActions = {
  modules: { module: string }[];
  calls: { call: string }[];
}

export const GET_AVAILABLE_EXTRINSIC_ACTIONS = gql`
  query GetAvailableModules {
    modules: extrinsic (distinct_on: module) {
      module
    }

    calls: extrinsic (distinct_on: call) {
      call
    }
  }
`;