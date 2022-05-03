import { gql } from '@apollo/client';

export type FindExtrinsicByHashType = {
  extrinsic?: {
    blockNumber: number;
    index: number;
    hash: string;
  };
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
