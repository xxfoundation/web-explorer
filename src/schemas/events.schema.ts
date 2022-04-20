import { gql } from '@apollo/client';

const LIST_EVENTS = gql`
  query ListEventsOfBlock(
    $orderBy: [blockchain_event_order_by!]
    $limit: Int
    $offset: Int
    $where: blockchain_event_bool_exp
  ) {
    blockchain_event(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      block_number
      event_index
      section
      method
      phase
      data
    }
  }
`;

// {
//   "orderBy": [
//     {
//       "event_index": "desc"
//     }
//   ],
//   "limit": 10,
//   "offset": 0,
//   "where": {
//     "block_number": {
//       "_eq": 2120768
//     }
//   }
// }

export { LIST_EVENTS };
