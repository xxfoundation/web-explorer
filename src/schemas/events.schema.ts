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
/*                            Balance Events Table                            */
/* -------------------------------------------------------------------------- */
export type ListBalancesEvents = {
  events: Event[];
} & TotalOfItems;

export const LIST_BALANCES_EVENTS = gql`
  query ListBalancesEvents(
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
/*                            Staking Events Table                            */
/* -------------------------------------------------------------------------- */
export type ListStakingEvents = {
  events: Event[];
} & TotalOfItems;

export const LIST_STAKING_EVENTS = gql`
  query ListStakingEvents(
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