import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

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
  query FindExtrinsicByHash($where: blockchain_extrinsic_bool_exp) {
    extrinsic: blockchain_extrinsic(where: $where) {
      blockNumber: block_number
      index: extrinsic_index
      hash
    }
  }
`;

export const EXTRINSICS_OF_BLOCK = gql`
  query ListExtrinsicOfBlock(
    $orderBy: [blockchain_extrinsic_order_by!]
    $limit: Int
    $offset: Int
    $where: blockchain_extrinsic_bool_exp
  ) {
    extrinsic: blockchain_extrinsic(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id
      index: extrinsic_index
      blockNumber: block_number
      hash
      timestamp
      success
      section
      method
    }
    agg: blockchain_extrinsic_aggregate(where: $where) {
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
} & TotalOfItems;

export const LIST_EXTRINSICS = gql`
  query ListExtrinsicOrdered(
    $limit: Int
    $offset: Int = 0
    $orderBy: [blockchain_extrinsic_order_by!]
    $where: blockchain_extrinsic_bool_exp
  ) {
    agg: blockchain_extrinsic_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    extrinsics: blockchain_extrinsic(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
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
    extrinsic: blockchain_extrinsic_by_pk(block_number: $blockNumber, extrinsic_index: $extrinsicIndex) {
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
