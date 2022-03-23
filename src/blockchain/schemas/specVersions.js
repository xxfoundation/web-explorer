import { gql } from "@apollo/client";

const LIST_SPEC_VERSIONS_BY_BLOCK = gql`
#import "./specVersions.graphql"
subscription ListSpecVersionsByBlockNumber($id: Int, $_eq: String = "") {
  static_SpecVersions(limit: 10, where: {blockHash: {_eq: $_eq}}, order_by: {createdAt: desc}) {
    ...SpecVersions
  }
}
`;

export { LIST_SPEC_VERSIONS_BY_BLOCK };
