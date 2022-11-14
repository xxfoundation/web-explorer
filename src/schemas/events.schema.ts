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
  doc: string;
  data: string;
  amount?: number;
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
      doc
      data
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
      doc
      data
    }
  }
`;
/* -------------------------------------------------------------------------- */
/*                                Events Table                                */
/* -------------------------------------------------------------------------- */
export type ListBalances = {
  events: Event[];
} & TotalOfItems;

export const LIST_BALANCES = gql`
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
      amount
      call
      id
      timestamp
      doc
      data
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
  }
`;

export type GetCallsForModules = {
  calls: { call: string }[];
}
export const GET_CALLS_FOR_MODULES_ACTIONS = gql`
  query GetCallsForModules ($where: event_bool_exp) {
    calls: event (distinct_on: call, where: $where) {
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
  subscription EventsSinceBlock ($where: event_bool_exp) {
    events: event_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`