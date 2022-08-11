// @ts-check
import '../augment-types/augment-api';
import { ApiPromise } from '@polkadot/api';
import { BN, BN_ZERO } from '@polkadot/util';
import { selectValidators } from './selection';
import { SubmittableExtrinsic } from '@polkadot/api/types';
import { ISubmittableResult } from '@polkadot/types/types';

interface StakingBalances {
    staked: BN;
    unbonding: BN;
    redeemable: BN;
    available: BN;
}

export const getStakingBalances = async (api: ApiPromise, stash: string): Promise<StakingBalances> => {
    const [
        { data: { free }},
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
            available: free.sub(ed),
        }
    }
    const controllerStr = controller.unwrap();
    const ledger = (await api.query.staking.ledger(controllerStr)).unwrap();
    const totalStaked = ledger.total.unwrap();
    const staked = ledger.active.unwrap();
    const unbonding = totalStaked.sub(staked);
    const redeemable = ledger.unlocking.filter(({ era }) => era.unwrap() <= currentEra.unwrap()).reduce((total, { value }) => total.add(value.unwrap()), BN_ZERO);
    const available = free.sub(ed).sub(staked);
    return {
        staked,
        unbonding,
        redeemable,
        available,
    }
}

export const stake = async (api: ApiPromise, balances: StakingBalances, stash: string, amount: BN): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> => {
    const calls = [];
    if (!amount.isZero()) {
        if (balances.staked.isZero() && balances.unbonding.isZero()) {
            calls.push(api.tx.staking.bond(stash, amount, null));
        }
        if (balances.unbonding.gt(BN_ZERO)) {
            calls.push(api.tx.staking.rebond(amount));
        }
        if (amount.gt(balances.unbonding)) {
            const extra = amount.sub(balances.unbonding);
            calls.push(api.tx.staking.bondExtra(extra));
        }
    }
    const targets = await selectValidators(api, stash);
    calls.push(api.tx.staking.nominate(targets));
    if (calls.length > 1) {
        return api.tx.utility.batch(calls)
    }
    return calls[0]
}

export const unstake = async (api: ApiPromise, balances: StakingBalances, amount: BN): Promise<SubmittableExtrinsic<'promise', ISubmittableResult>> => {
    const calls = [];
    if (amount.eq(balances.staked)) {
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
