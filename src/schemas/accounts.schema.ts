import { gql } from '@apollo/client';
import { CommonFieldsRankingFragment } from './ranking.schema';
import { TotalOfItems } from './types';

export type Roles = 'validator' | 'nominator' | 'council' | 'technical committee' | 'treasury';

export type Identity = {
  display?: string;
  displayParent?: string;
  email?: string;
  judgements?: Judgements[];
  legal?: string;
  other?: unknown;
  parent?: string;
  twitter?: string;
  web?: string;
  blurb?: string;

  // FIXME madeup field
  riotName?: string;
};

type Judgements =
  | 'Unknown'
  | 'Reasonable'
  | 'Known Good'
  | 'Out of Date'
  | 'Low Quality'
  | 'Erroneous';

export type Balance = {
  accountId: string;
  accountNonce?: string;
  additional?: [];
  freeBalance?: string;
  frozenFee?: string;
  frozenMisc?: string;
  reservedBalance?: string;
  votingBalance?: string;
  availableBalance?: string;
  lockedBalance?: string;
  lockedBreakdown?: {
    id: string;
    amount: number;
    reasons: string | 'Misc' | 'All';
  }[];
  vestingLocked?: string;
  isVesting?: boolean;
  vestedBalance?: string;
  vestedClaimable?: string;
  vesting?: {
    endBlock: string;
    locked: string;
    perBlock: string;
    startingBlock: string;
    vested: string;
  }[];
  vestingTotal?: string;
  namedReserves: [][];
};

export type Account = {
  id: string;
  controllerAddress: string;
  blockHeight: number;
  identity: Identity;
  identityDisplay: string;
  identityDisplayParent: string;
  nonce: number;
  timestamp: number;
  balances: Balance;

  availableBalance: number;
  freeBalance: number;
  lockedBalance: number;
  reservedBalance: number;
  totalBalance: number;

  roles: Record<Roles, boolean>;
};

export type GetAccountByAddressType = {
  account: Account;
  ranking?: CommonFieldsRankingFragment;
};

export const ACCOUNT_BY_PK_FRAGMENT = gql`
  fragment account on account {
    id: account_id
    controllerAddress: controller_address
    blockHeight: block_height
    identity
    identityDisplay: identity_display
    identityDisplayParent: identity_display_parent
    nonce
    timestamp
    balances
    roles

    availableBalance: available_balance
    freeBalance: free_balance
    lockedBalance: locked_balance
    reservedBalance: reserved_balance
    totalBalance: total_balance
  }
`;

export const GET_ACCOUNT_BY_PK = gql`
  ${ACCOUNT_BY_PK_FRAGMENT}
  query GetAccountByPK($accountId: String!) {
    account: account_by_pk(account_id: $accountId) {
      ...account
    }
  }
`;

export type ListAccounts = {
  account: {
    address: string;
    timestamp: number;
    availableBalance: number;
    lockedBalance: number;
    nonce: number;
    roles: Record<Roles, boolean>;
  }[];
} & TotalOfItems;

export const LIST_ACCOUNTS = gql`
  query ListAccounts(
    $orderBy: [account_order_by!]
    $offset: Int
    $limit: Int
    $where: account_bool_exp
  ) {
    account: account(order_by: $orderBy, offset: $offset, limit: $limit, where: $where) {
      address: account_id
      timestamp
      availableBalance: available_balance
      lockedBalance: locked_balance
      nonce
      roles
    }
    agg: account_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const LISTEN_FOR_NEW_ACCOUNTS = gql`
  subscription ListenForNewAccounts {
    new_accounts(order_by: [{ era: asc }]) {
      accounts
      era
    }
  }
`;
