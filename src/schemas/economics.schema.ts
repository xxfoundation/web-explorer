import { gql } from '@apollo/client';

export type Economics = {
  activeEra: number;
  inflationRate: string;
  timestamp: string;
  totalSupply: string;
  bridge: string;
  canary: string;
  circulating: string;
  claims: string;
  custody: string;
  rewards: string;
  sales: string;
  stakeableSupply: string;
  staked: string;
  treasury: string;
  unbonding: string;
  vesting: string;
}

export type EconomicsSubscription = {
  economics: Economics[];
}

export const LISTEN_FOR_ECONOMICS = gql`
  subscription ListenForEconomics {
    economics(limit: 1, order_by: {active_era: desc}) {
      activeEra: active_era
      bridge
      canary
      circulating
      claims
      custody
      inflationRate: inflation_rate
      rewards
      sales
      stakeableSupply: stakeable_supply
      staked
      timestamp
      totalSupply: total_supply
      treasury
      unbonding
      vesting
    }
  }
`;