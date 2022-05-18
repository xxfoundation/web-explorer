import { gql } from '@apollo/client';

export const EVENTS_OF_BLOCK = gql`
  query ListEventsOfBlock(
    $orderBy: [event_order_by!]
    $limit: Int
    $offset: Int
    $where: event_bool_exp
  ) {
    events: event(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      blockNumber:block_number
      id:event_index
      method
      section
      timestamp
    }
  }
`;

export const SEARCH_EVENTS = gql`
  query Blockchain_event_by_pk($blockNumber: bigint!, $eventIndex: Int!) {
    blockchain_event_by_pk(block_number: $blockNumber, event_index: $eventIndex) {
      blockNumber: block_number
      index: event_index
    }
  }
`;
