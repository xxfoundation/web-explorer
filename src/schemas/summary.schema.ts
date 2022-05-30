import { gql } from '@apollo/client';

export const LISTEN_FOR_TOTALS = gql`
  subscription ListenForTotals {
    totals: total(order_by: { name: desc }) {
      title: name
      value: count
    }
  }
`;