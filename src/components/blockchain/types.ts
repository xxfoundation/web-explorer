import BN from 'bn.js';
import type { Block } from '../../schemas/blocks.schema';
export type { Block } from '../../schemas/blocks.schema'

export type ChainData = {
  header: string;
  name: string;
  value: string | BN | JSX.Element;
}

export type Metric = {
  title: string;
  value: string;
}

export type EraMetrics = {
  metrics: Metric[];
}

export type ListBlocks = {
  blocks: Block[];
};

export type Transfer = {
  hash: string;
  blockNumber: number;
  extrinsicIndex: number;
  source: string;
  destination: string;
  amount: string;
  fee_amount: number;
  module: string;
  call: string;
  success: boolean;
  timestamp: number;
};

export type ListOfTransfers = {
  transfers: Transfer[];
};

