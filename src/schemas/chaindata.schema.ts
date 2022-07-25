import { gql } from '@apollo/client';

export const LISTEN_FOR_ERA_METRICS = gql`
  subscription ListenForMetric {
    metrics: total(order_by: { name: desc }) {
      title: name
      value: count
    }
  }
`;

export type RuntimeVersion = {
  block: {
    version: number;
  }[];
}

export const GET_RUNTIME_VERSION = gql`
  query GetRuntimeVersion {
    block(order_by: {block_number: desc}, limit: 1) {
      version: spec_version
    }
  }
`
