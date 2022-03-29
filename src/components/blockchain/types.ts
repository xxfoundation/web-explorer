export enum BlockStatus {
  Pending = 'pending'
}

export type Block = {
  id: number,
  intrinsic: number,
  events: number;
  status: BlockStatus,
  timestamp: number
}

export type PercentageValues = {
  team: {
    value: number;
    percentage: number;
  },
  foundation: {
    value: number;
    percentage: number;
  }
}

export type StakingSupplyData = {
  name: string;
  y: number;
  color: string;
  stakeable: PercentageValues;
  unstakeable: PercentageValues;
}