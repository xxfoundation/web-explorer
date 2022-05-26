import { gql } from '@apollo/client';

export const LIST_EVENTS_OF_BLOCK = gql`
  query ListEventsOfBlock(
    $orderBy: [blockchain_event_order_by!]
    $limit: Int
    $offset: Int
    $where: blockchain_event_bool_exp
    $eventAggWhere: blockchain_event_bool_exp
  ) {
    agg: blockchain_event_aggregate(where: $eventAggWhere) {
      aggregate {
        count
      }
    }
    events: blockchain_event(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      blockNumber: block_number
      index: event_index
      id
      method
      section
      timestamp
    }
  }
`;
