import { gql } from '@apollo/client';

export const LIST_EVENTS_OF_BLOCK = gql`
  query ListEventsOfBlock(
    $orderBy: [event_order_by!]
    $limit: Int
    $offset: Int
    $where: event_bool_exp
    $eventAggWhere: event_bool_exp
  ) {
    agg: event_aggregate(where: $eventAggWhere) {
      aggregate {
        count
      }
    }
    events: event(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      blockNumber: block_number
      index: event_index
      id
      method
      section
      timestamp
    }
  }
`;
