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

export const EVENTS_OF_BLOCK = gql`
  query ListEventsOfBlock(
    $orderBy: [event_order_by!]
    $where: event_bool_exp
  ) {
    agg: event_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    events: event(order_by: $orderBy, where: $where) {
      blockNumber: block_number
      index: event_index
      method
      id
      section
      timestamp
    }
  }
`;

export type ListEvents = {
  events: Event[];
} & TotalOfItems;

export const LIST_EVENTS = gql`
  query ListEventsOrdered(
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
      id
      section
      timestamp
    }
  }
`;

export type GetAvailableEventActions = {
  methods: { method: string }[];
  calls: { section: string }[];
}

export const GET_AVAILABLE_EVENT_ACTIONS = gql`
  query GetAvailableMethods {
    methods: event (distinct_on: method) {
      method
    }

    calls: event (distinct_on: section) {
      section
    }
  }
`;
