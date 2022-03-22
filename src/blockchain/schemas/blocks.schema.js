import { gql } from "@apollo/client";

const listBlocksOrdered = gql`
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

const blockByNumber = gql`
#import "./blocks.graphql"
subscription BlockByNumber($number: Int_comparison_exp = {}) {
  static_Blocks(where: {number: $number}) {
    ...Block
  }
}
`;

export { listBlocksOrdered as LIST_BLOCKS_ORDERED, blockByNumber as BLOCK_BY_NUMBER };
