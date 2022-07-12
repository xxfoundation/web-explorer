import { gql } from '@apollo/client';

export type GetActiveEra = {
  total: { count: number }[]
}

export const GET_ACTIVE_ERA = gql`
  query LatestEra {
    total (where:{ name: { _eq: "active_era" }}, limit: 1) {
      count
    }
  }
`