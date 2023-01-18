import { gql } from '@apollo/client';

export type RuntimeVersion = {
  block: {
    version: number;
  }[];
}

export const GET_RUNTIME_VERSION = gql`
  query GetRuntimeVersion {
    block(order_by: {block_number: desc}, limit: 1) {
      version: spec_version
    }
  }
`

export type ListenForAccountMetrics = {
  numTransfers: { aggregate: { count: number } };
  totalAccounts: { aggregate: { count: number } };
  activeAccounts: { aggregate: { count: number } };
  numFakeAccounts: { aggregate: { count: number } };
}

export const LISTEN_FOR_ACCOUNT_METRICS = gql`
  query ListenForAccountMetrics {
    numTransfers: transfer_aggregate {
      aggregate {
        count
      }
    }
    totalAccounts: account_aggregate {
      aggregate {
        count
      }
    }
    activeAccounts: account_aggregate(where: {active: {_eq: true}}) {
      aggregate {
        count
      }
    }
    numFakeAccounts: account_aggregate(where: {_and: {active: {_eq: false}, when_killed: {_is_null: true}}}) {
      aggregate {
        count
      }
    }
  }
`;

export type GetChainMetrics = {
  activeEra: {
    era: number;
  }[];
  numNominators: { aggregate: { count: number } };
  numActiveValidators: { aggregate: { count: number } };
}

// Finalized Blocks, Active Era, # Transfers, # Accounts, Total Issuance, # Nominators, # Validators, Circulating APG
export const GET_CHAIN_METRICS = gql`
  query GetChainMetrics {
      activeEra: block(order_by: {era: desc}, limit: 1, where: {finalized: {_eq: true}}) {
        era
      }
      numNominators: nominator_aggregate {
        aggregate {
          count
        }
      }
      numActiveValidators: validator_aggregate(where: {active: {_eq: true}}) {
        aggregate {
          count
        }
      }
  }
`;

/* -------------------------------------------------------------------------- */
/*                           Token Status Economics                           */
/* -------------------------------------------------------------------------- */


export type GetEconomicsMetrics = {
  economics: {
    totalIssuance: string;
    inflationRate: string;
    circulating: string;
    staked: string;
  }[];
}

// Finalized Blocks, Active Era, # Transfers, # Accounts, Total Issuance, # Nominators, # Validators, Circulating APG
export const GET_ECONOMICS_METRICS = gql`
  query GetEconomicMetrics {
      economics(limit: 1, order_by: {era: desc}) {
        totalIssuance: total_issuance
        inflationRate: inflation_rate
        circulating
        staked
      }
  }
`;

/* -------------------------------------------------------------------------- */
/*                          Chain Info Subscriptions                          */
/* -------------------------------------------------------------------------- */

export type ListenFinalizedBlocks = {
  finalizedBlocks: { aggregate: { count: number } };
}

export const LISTEN_FINALIZED_BLOCKS = gql`
  subscription ListenFinalizedBlocks {
    finalizedBlocks: block_aggregate(where: {finalized: {_eq: true}}) {
      aggregate {
        count
      }
    }
  }
`;

export type ListenNumTransfers = {
  numTransfers: { aggregate: { count: number } };
}

export const LISTEN_NUM_TRANSFERS = gql`
  subscription ListenNumTransfers {
    numTransfers: transfer_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export type ListenActiveAccounts = {
  numAccounts: { aggregate: { count: number } };
}

export const LISTEN_ACTIVE_ACCOUNTS = gql`
  subscription ListenNumAccounts {
    numAccounts: account_aggregate(where: {active: {_eq: true}}) {
      aggregate {
        count
      }
    }
  }
`;

export type ListenNumFakeAccounts = {
  numFakeAccounts: { aggregate: { count: number } };
}

export const LISTEN_NUM_FAKE_ACCOUNTS = gql`
  subscription ListenNumFakeAccounts {
    numFakeAccounts: account_aggregate(where: {_and: {active: {_eq: false}, when_killed: {_is_null: true}}}) {
      aggregate {
        count
      }
    }
  }
`;


export type GetRuntimeMetadata = {
  runtime: {
    metadata: {
      metadata: {
        v14: {
          pallets: string;
        }
      }
    }
  }[];
}

export const GET_RUNTIME_METADATA = gql`
  query GetRuntimeMetadata {
    runtime(order_by: {spec_version: desc}, limit: 1) {
      metadata
    }
  }
`

