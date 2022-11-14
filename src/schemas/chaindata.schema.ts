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
  numAccounts: { aggregate: { count: number } };
}

export const LISTEN_FOR_ACCOUNT_METRICS = gql`
  query ListenForAccountMetrics {
    numTransfers: transfer_aggregate {
      aggregate {
        count
      }
    }
    numAccounts: account_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export type ListenForMetrics = {
  finalizedBlocks: { aggregate: { count: number } };
  activeEra: {
    era: number;
  }[];
  numTransfers: { aggregate: { count: number } };
  numAccounts: { aggregate: { count: number } };
  numNominators: { aggregate: { count: number } };
  numActiveValidators: { aggregate: { count: number } };
  economics: {
    totalIssuance: string;
    inflationRate: string;
  }[];
}

// Finalized Blocks, Active Era, # Transfers, # Accounts, Total Issuance, # Nominators, # Validators, Circulating APG
export const LISTEN_FOR_METRICS = gql`
  query ListenForMetrics {
      finalizedBlocks: block_aggregate(where: {finalized: {_eq: true}}) {
        aggregate {
          count
        }
      }
      activeEra: block(order_by: {era: desc}, limit: 1, where: {finalized: {_eq: true}}) {
        era
      }
      numTransfers: transfer_aggregate {
        aggregate {
          count
        }
      }
      numAccounts: account_aggregate {
        aggregate {
          count
        }
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
      economics(limit: 1, order_by: {era: desc}) {
        totalIssuance: total_issuance
        inflationRate: inflation_rate
      }
  }
`;
