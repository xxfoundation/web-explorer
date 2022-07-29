import { gql } from '@apollo/client';
import { TotalOfItems } from './types';


/* -------------------------------------------------------------------------- */
/*                            Get Events of a Block                           */
/* -------------------------------------------------------------------------- */
export type Event = {
  blockNumber: number;
  index: number;
  id: number;
  module: string;
  call: string;
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
      module
      call
      id
      timestamp
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                                Events Table                                */
/* -------------------------------------------------------------------------- */
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
      module
      call
      id
      timestamp
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                         Get available Module / Call                        */
/* -------------------------------------------------------------------------- */
export type GetAvailableEventActions = {
  modules: { module: string }[];
  calls: { call: string }[];
}

export const GET_AVAILABLE_EVENT_ACTIONS = gql`
  query GetAvailableEventActions {
    modules: event (distinct_on: module) {
      module
    }

    calls: event (distinct_on: call) {
      call
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                           Events since block                               */
/* -------------------------------------------------------------------------- */
export type SubscribeEventsSinceBlock = {
  events: {
    aggregate: {
      count: number;
    }
  }
}

export const SUBSCRIBE_EVENTS_SINCE_BLOCK = gql`
  subscription EventsSinceBlock ($blockNumber: bigint!) {
    events: event_aggregate(where: {block_number: {_gt: $blockNumber }}) {
      aggregate {
        count
      }
    }
  }
`