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
  totalExtrinsics: number;
};

export type BlockSummaryType = {
  block: BlockType;
};
