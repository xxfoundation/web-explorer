import { gql } from "@apollo/client";

const LIST_TRANSACTIONS = gql`
#import "./transfers.graphql"
subscription ListTransactions($limit: Int = 25) {
  static_Transfers(limit: $limit, order_by: {createdAt: desc}) {
    ...Transfers
  }
}
`;

export { LIST_TRANSACTIONS };
