import { gql } from "@apollo/client";

const BLOCK_PRODUCER_BY_ = gql`
#import "./blockProducers.graphql"
subscription BlockProducerById($id: Int) {
  static_BlockProducer_by_pk(id: $id) {
    ...BlockProducers
  }
}
`;

export { BLOCK_PRODUCER_BY_ };
