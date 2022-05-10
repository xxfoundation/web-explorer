import BN from 'bn.js';

export type Roles = 'council' | 'validator' | 'nominator';

export type BalanceType = {
  transferable: string | BN;
};

export type LockedBalanceType = {
  bonded: string | BN;
  unbonding: string | BN;
  democracy: string | BN;
  election: string | BN;
  vesting: string | BN;
};

export type AccountType = {
  role: Roles;
  id: string;
  address: string;
  publicKey: string;
  name?: string;
  legalName?: string;
  personalIntroduction?: string;
  stash: string;
  controller: string;
  email?: string;
  twitter?: string;
  riotID?: string;
  website?: string;
  balance: BalanceType;
  reserved: LockedBalanceType;
  locked: LockedBalanceType;
};
