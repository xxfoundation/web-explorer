import { gql } from '@apollo/client';
import { TotalOfItems } from './types';

export type Event = {
  blockNumber: number;
  index: number;
  id: number;
  method: string;
  section: string;
  timestamp: string;
};

export type ListEvents = {
  events: Event[];
} & TotalOfItems;

export const LIST_EVENTS = gql`
  query ListEventsOfBlock(
    $orderBy: [event_order_by!]
    $limit: Int
    $offset: Int
    $where: event_bool_exp
  ) {
    agg: event_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    events: event(order_by: $orderBy, limit: $limit, offset: $offset, where: $where) {
      blockNumber: block_number
      index: event_index
      method
      section
      timestamp
    }
  }
`;
