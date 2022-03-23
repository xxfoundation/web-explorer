import { gql } from "@apollo/client";

const LIST_BLOCKS_ORDERED = gql`
subscription ListBlocksOrdered($limit: Int) {
    static_Blocks(order_by: {number: desc}, limit: $limit) {
        hash
        time
        status
        Extrinsics_aggregate {
          aggregate {
            count
          }
        }
        Events_aggregate {
          aggregate {
            count
          }
        }
    }
}
`;

const BLOCK_BY_NUMBER = gql`
#import "./blocks.graphql"
query BlockByNumber($number: Int_comparison_exp = {}) {
  static_Blocks(where: {number: $number}) {
    ...Block
  }
}
`;

const ON_BLOCK_STATUS_CHANGE = gql`
subscription OnBLockStatusChange($number: Int_comparison_exp = {}) {
  static_Blocks(where: {number: $number}) {
    status
  }
}
`;

export { LIST_BLOCKS_ORDERED, BLOCK_BY_NUMBER, ON_BLOCK_STATUS_CHANGE };
