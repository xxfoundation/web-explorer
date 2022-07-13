import { Account } from '../../../../schemas/accounts.schema';
import { TransferWithEra } from '../../../../schemas/transfers.schema';
import { computeBalanceHistory } from './BalanceHistoryChart';

const account: Account = {
  id: 'me',
  whenCreated: 0,
  controllerAddress: 'controlla',
  blockHeight: 10,
  identity: {},
  identityDisplay: '',
  identityDisplayParent: '',
  nonce: 1,
  timestamp: 0,
  lockedBalance: 0,
  reservedBalance: 0,
  totalBalance: 2500,
  bondedBalance: 0,
  councilBalance: 0,
  democracyBalance: 0,
  transferrableBalance: 0,
  unbondingBalance: 0,
  vestingBalance: 0,
  roles: {
    validator: false,
    techcommit: false,
    nominator: false,
    council: false,
    special: false,
  }
}

const transfers: TransferWithEra[] = [
  {
    success: true,
    blockNumber: 1,
    hash: 'blah blah 1',
    source: 'other',
    destination: 'me',
    feeAmount: 1,
    amount: 1000,
    section: '',
    method: '',
    timestamp: '',
    index: 1,
    block: {
      activeEra: 1
    }
  },
  {
    success: true,
    blockNumber: 2,
    hash: 'blah blah 2',
    source: 'other',
    destination: 'me',
    feeAmount: 1,
    amount: 1000,
    section: '',
    method: '',
    timestamp: '',
    index: 1,
    block: {
      activeEra: 1
    }
  },
  {
    success: true,
    blockNumber: 2,
    hash: 'blah blah 2',
    source: 'me',
    destination: 'other',
    feeAmount: 1,
    amount: 500,
    section: '',
    method: '',
    timestamp: '',
    index: 1,
    block: {
      activeEra: 1
    }
  },
]

test.skip('computeBalanceHistory Should combine points', () => {
  const history = computeBalanceHistory({ currentEra: 10, account, transfers }, 20);
  expect(history).toStrictEqual([[0, 1000], [1, 2500], [10, 2500]]);
});

test.skip('Should provide data when there are no transfers', () => {
  const history = computeBalanceHistory({ currentEra: 10, account, transfers: [] }, 20);
  expect(history).toStrictEqual([[0, 2500], [10, 2500]]);
});

const transfers2: TransferWithEra[] = [
  {
    success: true,
    blockNumber: 1,
    hash: 'blah blah 1',
    source: 'other',
    destination: 'me',
    feeAmount: 1,
    amount: 200,
    section: '',
    method: '',
    timestamp: '',
    index: 1,
    block: {
      activeEra: 2
    }
  },
  {
    success: true,
    blockNumber: 3,
    hash: 'blah blah 2',
    source: 'other',
    destination: 'me',
    feeAmount: 1,
    amount: 200,
    section: '',
    method: '',
    timestamp: '',
    index: 1,
    block: {
      activeEra: 3
    }
  },
  {
    success: true,
    blockNumber: 10,
    hash: 'blah blah 2',
    source: 'me',
    destination: 'other',
    feeAmount: 1,
    amount: 1000,
    section: '',
    method: '',
    timestamp: '',
    index: 1,
    block: {
      activeEra: 10
    }
  },
]

// unskip when we take into account initial balances
test.skip('Should cut off data properly', () => {
  const history = computeBalanceHistory(
    {
      currentEra: 15,
      account,
      transfers: transfers2
    },
    10
  );
  expect(history).toStrictEqual([
    [5, 3500],
    [10, 2500],
    [15, 2500]
  ]);
});
