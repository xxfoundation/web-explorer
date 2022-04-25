import { gql } from '@apollo/client';

const EVENTS_OF_BLOCK = gql`
  query ListEventsOfBlock(
    $orderBy: [blockchain_event_order_by!]
    $limit: Int
    $offset: Int
    $where: blockchain_event_bool_exp
  ) {
    events: blockchain_event(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      id: event_index
      section
      method
    }
  }
`;

export { EVENTS_OF_BLOCK };
