// @ts-check
import '../augment-types/augment-api';
import { ApiPromise } from '@polkadot/api';
import { BN, BN_ZERO } from '@polkadot/util';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';
import _ from 'lodash';

export interface StakingBalances {
  staked: BN;
  unbonding: BN;
  redeemable: BN;
  unlocking: [BN, number][];
  available: BN;
  total: BN;
}

export const getStakingBalances = async (api: ApiPromise, stash: string): Promise<StakingBalances> => {
  const [
    { data: { free, reserved } },
    currentEra,
    controller,
  ] = await Promise.all([
    api.query.system.account(stash),
    api.query.staking.currentEra(),
    api.query.staking.bonded(stash),
  ]);
  const ed = api.consts.balances.existentialDeposit.toBn();
  if (controller.isNone) {
    return {
      staked: BN_ZERO,
      unbonding: BN_ZERO,
      redeemable: BN_ZERO,
      unlocking: [],
      available: free.sub(ed),
      total: free.add(reserved)
    }
  }
  const controllerStr = controller.unwrap();
  const ledger = (await api.query.staking.ledger(controllerStr)).unwrap();
  const totalStaked = ledger.total.unwrap();
  const staked = ledger.active.unwrap();
  const unbonding = totalStaked.sub(staked);
  const currEra = currentEra.unwrap().toNumber();
  const redeemable = ledger.unlocking.filter(({ era }) => era.toNumber() <= currEra).reduce((total, { value }) => total.add(value.unwrap()), BN_ZERO);
  const uniqueEras = _.uniq(ledger.unlocking.filter(({ era }) => era.toNumber() > currEra).map(({ era }) => era.toNumber() - currEra));
  const unlockingDup: [BN, number][] = ledger.unlocking.filter(({ era }) => era.toNumber() > currEra).map(({ era, value }) => [ value.unwrap().toBn(), era.toNumber() - currEra]);
  const unlocking: [BN, number][] = uniqueEras.map((uniqEra) => [unlockingDup.reduce((total, [value, era]) => era === uniqEra ? total.add(value) : total, BN_ZERO), uniqEra]);
  const availableToStake = free.sub(staked);
  const available = availableToStake.gt(ed) ? availableToStake.sub(ed) : BN_ZERO;
  const total = free.add(reserved);
  return {
    staked,
    unbonding,
    redeemable,
    unlocking,
    available,
    total
  }
}

export const stake = async (api: ApiPromise, stash: string, amount: BN, targets: string[]): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> => {
  const calls = [];
  const controller = await api.query.staking.bonded(stash);
  if (controller.isNone) {
    calls.push(api.tx.staking.bond(stash, amount, null));
  } else if (!amount.isZero()) {
    const controllerStr = controller.unwrap();
    const ledger = (await api.query.staking.ledger(controllerStr)).unwrap();
    const unbonding = ledger.total.unwrap().sub(ledger.active.unwrap());
    if (unbonding.gt(BN_ZERO)) {
      calls.push(api.tx.staking.rebond(amount));
    }
    if (amount.gt(unbonding)) {
      const extra = amount.sub(unbonding);
      calls.push(api.tx.staking.bondExtra(extra));
    }
  }
  calls.push(api.tx.staking.nominate(targets));
  if (calls.length > 1) {
    return api.tx.utility.batch(calls)
  }
  return calls[0]
}

export const unstake = async (api: ApiPromise, stash: string, amount: BN): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> => {
  const calls = [];
  const controller = await api.query.staking.bonded(stash);
  const controllerStr = controller.unwrap();
  const ledger = (await api.query.staking.ledger(controllerStr)).unwrap();
  const staked = ledger.active.unwrap();
  if (amount.eq(staked)) {
    calls.push(api.tx.staking.chill());
  }
  calls.push(api.tx.staking.unbond(amount));
  if (calls.length > 1) {
    return api.tx.utility.batch(calls)
  }
  return calls[0]
}

export const redeem = async (api: ApiPromise, stash: string): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> => {
  const slashingSpans = await api.query.staking.slashingSpans(stash);
  const spanCount = slashingSpans.isNone ? 0 : slashingSpans.unwrap().prior.length + 1;
  return api.tx.staking.withdrawUnbonded(spanCount)
}
