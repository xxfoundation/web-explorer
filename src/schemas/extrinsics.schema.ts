import { gql } from '@apollo/client';

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

export const EXTRINSICS_OF_BLOCK = gql`
  query ListExtrinsicOfBlock(
    $orderBy: [extrinsic_order_by!]
    $limit: Int
    $offset: Int
    $where: extrinsic_bool_exp
    $aggWhere: extrinsic_bool_exp
  ) {
    extrinsic(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      index: extrinsic_index
      blockNumber: block_number
      hash
      timestamp
      success
      section
      method
    }
    agg:extrinsic_aggregate(where: $aggWhere) {
      aggregate {
        count
      }
    }
  }
`;

export type ListExtrinsics = {
  extrinsics: {
    id: number;
    index: number;
    blockNumber: number;
    timestamp: number;
    success: boolean;
    method: string;
    section: string;
    hash: string;
  }[];
  agg: { aggregate: { count: number } };
};

export const LIST_EXTRINSICS = gql`
  query ListExtrinsicOrdered(
    $limit: Int
    $offset: Int = 0
    $orderBy: [extrinsic_order_by!]
    $where: extrinsic_bool_exp
  ) {
    agg: extrinsic_aggregate {
      aggregate {
        count
      }
    }
    extrinsics: extrinsic(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      id
      index: extrinsic_index
      blockNumber: block_number
      timestamp
      success
      method
      section
      hash
    }
  }
`;

export type GetExtrinsicByPK = {
  extrinsic: {
    lifetime?: string | number;
    timestamp: number;
    hash: string;
    method: string;
    section: string;
    success: boolean;
    signer?: string;
    isSigned: boolean;
    args: string;
    argsDef: string;
    doc: string;
  };
};

export const GET_EXTRINSIC_BY_PK = gql`
  query GetExtrinsicByPk($blockNumber: bigint!, $extrinsicIndex: Int!) {
    extrinsic: extrinsic_by_pk(block_number: $blockNumber, extrinsic_index: $extrinsicIndex) {
      hash
      method
      section
      success
      timestamp
      isSigned: is_signed
      signer
      args
      argsDef: args_def
      doc
    }
  }
`;
