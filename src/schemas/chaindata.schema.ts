import { gql } from '@apollo/client';

export const LISTEN_FOR_ERA_METRICS = gql`
  subscription ListenForMetric {
    metrics: total(order_by: { name: desc }) {
      title: name
      value: count
    }
  }
`;