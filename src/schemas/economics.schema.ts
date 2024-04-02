import { gql } from '@apollo/client';
import { BN, BN_BILLION } from '@polkadot/util';

export type Economics = {
  era: number;
  inflationRate: string;
  timestamp: string;
  totalIssuance: string;
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
  inactiveStaked: string;
  treasury: string;
  unbonding: string;
  liquid: string;
  vesting: string;
  tmStaked: string;
};

export type EconomicsAdjusted = Economics & {
  liquidityRewards: string;
  actualLiquid: string;
};

export const adjustEconomics = (economics: Economics): EconomicsAdjusted => {
  // Calculate liquidity rewards
  const total = new BN(economics.totalIssuance.toString());
  const stakeable = new BN(economics.stakeableSupply.toString());
  const circulating = new BN(economics.circulating.toString());
  const rewards = new BN(economics.rewards.toString());
  const sale = new BN(economics.sales.toString());
  const canary = new BN(economics.canary.toString());
  const custody = new BN(economics.custody.toString());
  const vesting = new BN(economics.vesting.toString());
  const lockedVesting = stakeable.sub(circulating);
  const lockedCustody = vesting.sub(lockedVesting);
  const custodyTotal = custody.add(lockedCustody);
  const liquidityRewards = total
    .sub(stakeable)
    .sub(rewards)
    .sub(sale)
    .sub(canary)
    .sub(custodyTotal)
    .divRound(BN_BILLION)
    .mul(BN_BILLION);
  const bridge = new BN(economics.bridge.toString());
  const bridgeLiquid = bridge.sub(liquidityRewards);
  // Calculate actual liquid
  const liquid = new BN(economics.liquid.toString());
  const treasury = new BN(economics.treasury.toString());
  const actualLiquid = liquid.sub(bridgeLiquid).sub(treasury);
  return {
    ...economics,
    // Adjust bridge
    bridge: bridgeLiquid.toString(),
    // Add liquidity rewards
    liquidityRewards: liquidityRewards.toString(),
    // Add actual liquid
    actualLiquid: actualLiquid.toString()
  };
};

export type EconomicsSubscription = {
  economics: Economics[];
};

export const LISTEN_FOR_ECONOMICS = gql`
  query ListenForEconomics {
    economics(limit: 1, order_by: { era: desc }) {
      era
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
      inactiveStaked: inactive_staked
      timestamp
      totalIssuance: total_issuance
      totalSupply: total_supply
      treasury
      unbonding
      liquid
      vesting
      tmStaked: tm_staked
    }
  }
`;
