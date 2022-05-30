export type ChainData = {
  header: string;
  name: string;
  value: string | JSX.Element;
}

export type Metric = {
  title: string;
  value: string;
}

export type EraMetrics = {
  metrics: Metric[];
}

export type Block = {
  hash: string;
  number: number;
  finalized: boolean;
  currentEra: number;
  totalEvents: number;
  totalExtrinsics: number;
  timestamp: number;
};

export type ListBlocks = {
  blocks: Block[];
};

export type Transfer = {
  hash: string;
  blockNumber: number;
  extrinsicIndex: number;
  source: string;
  destination: string;
  amount: number;
  fee_amount: number;
  section: string;
  method: string;
  success: boolean;
  timestamp: number;
};

export type ListOfTransfers = {
  transfers: Transfer[];
};