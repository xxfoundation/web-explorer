export type BlockType = {
  numberFinalized: number;
  number: number;
  currentEra: string;
  hash: string;
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
  author: string;
  authorName: string;
  timestamp: number;
  specVersion: number;
  totalEvents: number;
  numTransfers: number;
};

export type BlockSummaryType = {
  block: BlockType;
  next?: { number: number };
  prev?: { number: number };
};
