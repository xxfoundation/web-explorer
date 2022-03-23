import { gql } from "@apollo/client";

const EXTRINSICS_BY_BLOCK_HASH = gql`
#import "./extrinsics.graphql"
subscription ExtrinsicsOfBlock($_eq: String) {
  static_Extrinsics(where: {hash: {_eq: $_eq}}) {
    ...Extrinsics
    Data {
      downloadMessages
      horizontalMessages
      validationData
      relayChainState
    }
  }
}
`;

export { EXTRINSICS_BY_BLOCK_HASH };
