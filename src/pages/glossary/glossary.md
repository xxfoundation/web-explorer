# Nominated Proof of Stake

In the xx network blockchain, the active **_validator set_** is composed by the validators that are elected to participate in the **_consensus protocol_** (processing transactions and producing blocks). The active validator set changes in a time period called an **Era**, which is every 24 hours. The validator set size is fixed for each era, and can be modified to accommodate new validators wishing to join the network. The current size can be seen in the explorer main page, which, at the time of writing is 370. To be elected, the validator needs to have enough stake to make it to the top 370 validators ordered by total stake. This total stake includes its own stake and nominators stake. Therefore, nominators have a big impact in the election of the validator set, which advocates a more decentralized system.

Nominated proof of stake, or NPoS, is similar to Proof of Stake (PoS) in allowing coin holders to earn rewards for validating new blocks, but it differs in that nominators come into the equation to promote a more egalitarian participation in consensus, mitigating the overpower of bigger stakeholders in the network (a concerning problem in PoS).

Another problem in traditional PoS is that validators with larger stake are able to produce more blocks than validators with lower stake. This means that higher stakers will earn rewards faster than lower stakers. NPoS tries to address this issue by allowing all active validators to produce the same number of blocks, regardless of stake. Each produced block is assigned a value of points, and rewards are split by points, which is a representation of performance, as opposed to being split by stake.

NPoS is designed to incentivize good behaviour and punish bad behaviour. For example, if a validator attempts to include a fraudulent transaction in a block, they will be penalized by losing some of their staked tokens.

\
&nbsp;
\
&nbsp;

# Blockchain Elements

### **Blocks**

- A collection of data, such as transactions, that together indicate a state transition of the blockchain.
- Composed by **_Extrinsics_**

### **Extrinsics**

- State changes that come from the outside world, i.e. they are not part of the system itself. Extrinsics can take two forms, **_inherents_** and **_transactions_**.
  - **_Inherents_**
    - Extrinsics that are "_inherently true_" Inherents are not gossiped on the network and are put into blocks by the block author. They are not provably true the way that the desire to send funds is, therefore they do not carry a signature. A blockchain's runtime must have rules for validating inherents. For example, timestamps are inherents. They are validated by being within some margin that each validator deems reasonable.
  - **_Transaction_**
    - An extrinsic that is signed. Transactions are gossiped on the network and incur a transaction fee. Transactions are "_provably true_", unlike inherents. For example, one can prove that Alice wants to send funds to Bob by the fact that she signed a transfer-funds message with her private key.
- Composed by **_Events_**

### **Events**

- While extrinsics represent information from the outside world, events represent information from the chain. Extrinsics can trigger events. For example, the Staking pallet emits a *Reward* event when claiming staking rewards to tell the user how much the account was credited.
- A **_Transfer_** is an event.

### **Transfer**

- Send coins from one account to another.

\
&nbsp;
\
&nbsp;

# Blockchain Timeline

- Blocks are produced in designated fixed time slots. On average, a new block is added to the blockchain every **6 seconds**.
- Blocks are produced in a chained manner, i.e., they always contain a reference to the parent block. This relationship is denoted using arrows, for example B1 is the parent of B2: B1 ← B2.
- A block is considered **_finalized_** on average after having a chain of 2 blocks created that reference it. Example: considering the chain of blocks B1 ← B2 ← B3, B1 will be finalized after B3 is produced.
- An **Era** is a period of **24 hours** during which there is a specific set of active validators. That same set cannot change while in an Era.

\
&nbsp;
\
&nbsp;

# Token Economics

- **Circulating Supply** is the best approximation of the number of coins that are circulating in the market and in the general public's hands. This includes coins that might be locked by **_Staking._**
- **Total Supply** is the total amount of coins in existence right now (minus any coins that have been verifiably burned).
- **Total Issuance** is defined by the _Total Supply_ minus the amount of xx issued as an ERC1404 and not claimed yet - which belongs to the **Claims Supply**.
- **Vesting** is the total amount of coins that are **_locked_** by vesting schedules. A Vesting schedule refers to a period of time in which coins are locked and cannot be moved from a given account. Coins that are locked under vesting can still be used in **_Staking_** and **_Governance_**.
- **Stakeable Supply** is the amount of coins available to be staked. **Staked Supply** is the amount of coins being actively staked in the network, both by validators and nominators. The **_Staked Ratio_** is the division between staked and stakeable supply. The total amount of **_rewards_** given per Era is proportional to the staked ratio. Rewards are distributed to each staked account and automatically added to the amount at stake, ensuring that earnings compound.
- **Rewards Supply** is the capped amount of coins that will be distributed among validators and nominators, as rewards for staking their coins. Once this supply ends, coins will start to be minted instead. This supply is expected to last around 5 years from MainNet launch.
- **Unbonding** is the total amount of coins that were unstaked and remain locked for the duration of the _unbonding period,_ whichis 28 days. Any staking rewards earned are also subject to the unbonding period.
- **Liquid Supply** - coins that are not staked, not locked by vesting or any other on-chain mechanisms. These are generally available for transferring, and include the **_Treasury_**.
- **Treasury Supply** - the amount of coins available to spend by the **_Treasury_**, which is an on-chain Governance controlled mechanism that can fund proposals that aim to develop new features on xx network. The Treasury is funded by leftover staking rewards and 80% of transaction fees. One percent of the Treasury supply is burned every 24 days, ensuring a deflationary mechanism is in place if the coins are not being spent on proposals.

\
&nbsp;
\
&nbsp;

# Account Balance

**Transferrable** - coins available to be transferred; liquid.

**Locked** - the total amount of coins locked; multiple locks can be placed on the same coins:

- **vesting** - coins locked by vesting schedules (can be used for transaction fees)
- **unbonding** - coins that have been unstaked but are still locked in an unbonding period
- **bonded** - coins locked by staking either by nominating or validating
- **democracy** - coins locked when voting for referenda (can be used for transaction fees)
- **council** - coins locked when voting to elect a member to the **_Council_**

**Reserved** - coins used to store data on chain - for example: setting an account **_identity_**, creating **_assets_**, making a **proposal** in **_Governance_**, or proposing a **_tip_**.

\
&nbsp;
\
&nbsp;

# Staking

- **_Staking_** your XX allows you to passively earn rewards for your help to secure the network. It is the process by which you can submit XX tokens in a bid to serve as a validator or nominator and get rewarded.
- Staked tokens have a **28-day cooldown period when unstaked**, which means they can only be redeemed / withdrawn after that period.
- The overall staking return in the network is calculated from the current staked ratio, current ideal interest and inflation parameters.
  If you wanna know more about it check our [xx Economics](https://xx.network/wp-content/uploads/2021/12/xx-economics-v1.2.pdf).
- **_Offences_** happen if a validator misbehaves (e.g. goes offline, attacks the network, or runs modified software) in the network. According to the severity of the offence, the validator and their nominators might get **_Slashed_**, leading to **losing a percentage of their bonded/staked XX.** Any slashed XX will be added to the Treasury.
  - Validators are also **"_chilled”_** by the protocol when they commit an offence. This removes them from the active set and the validator must take action in order to be eligible for re-election in the next era. If the offence leads to a slash, chilling also removes all of the validator’s nominations, in order to passively protect nominators from further slashes.

### Validators

- **_Validators_** secure the xx network blockchain by staking XX and participating in **_consensus_** with other validators.
- **_Consensus_** is a general agreement. Running a blockchain in a decentralized network requires every block to be validated before being committed. To do so, a **_consensus protocol_** takes place, where validators process the extrinsics added to a block - such as transfers, votes or staking actions - and validate its correctness, creating and sharing a digital signature vouching for the block. When enough signatures are shared among the validators and there is enough confidence on the validity of the block, it is committed and the state of the blockchain is updated.

### Nominators

- **_Nominators_** secure the xx network blockchain by selecting good **_validators_** and staking XX.
- **_Nomination_** is the process of staking your tokens behind a **_validator_** to earn rewards.

### Waiting List

- Nodes who have declared their intention to be a validator but did not have enough staked, either their own or via nominations, to make it into the active validator set.

### **Reward Distribution**

In NPoS, the rewards for a given Era are split between all validators in the active set according to their performance. From these rewards, the commission fee of the validator is deducted, to cover operating costs. The remaining rewards are distributed among the validator and its active nominators, proportional to their stake.

\
&nbsp;
\
&nbsp;

---

> 📌 If you want to learn more about the xx network blockchain, its tokenomics and use cases, check out our [high-level overview of the xx coin](https://xx.network/archive/xxcoin-tokenomics/).
