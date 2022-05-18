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
  query Blockchain_extrinsic($where: blockchain_extrinsic_bool_exp) {
    extrinsic: blockchain_extrinsic(where: $where) {
      blockNumber: block_number
      index: extrinsic_index
      hash: extrinsic_hash
    }
  }
`;

export const EXTRINSICS_OF_BLOCK = gql`
  query ListExtrinsicOfBlock(
    $orderBy: [extrinsic_order_by!]
    $limit: Int
    $offset: Int
    $where: extrinsic_bool_exp
  ) {
    extrinsic(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id: extrinsic_index
      hash
      timestamp
      success
      method
      section
    }
  }
`;
