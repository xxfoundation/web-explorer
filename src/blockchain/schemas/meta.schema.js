import { gql } from "@apollo/client";

const getPublicNodeMetadata = gql`
subscription GetPublicNodeMetadata {
    static_Metadata {
        key
        value
    }
}
`;

export { getPublicNodeMetadata as GET_PUBLIC_NODE_METADATA };
