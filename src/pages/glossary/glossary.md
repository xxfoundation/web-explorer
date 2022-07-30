# General Concepts

### Nominated Proof of Stake

Nominated proof of stake, or NPoS, is similar to proof of stake ([PoS](https://learn.bybit.com/blockchain/what-is-proof-of-stake/)) in allowing users to earn rewards for validating new blocks, but it differs in that only nominated nodes are allowed to participate in block validation.

NPoS is designed to incentivize good behavior and punish bad behavior on blockchains. For example, if a block validator attempts to validate a fraudulent transaction, they will be penalized by losing some of their staked tokens.

This correction mechanism ensures that only honest and reliable nodes are allowed to participate in the nominated proof of stake consensus algorithm, which in turn helps to improve the overall security of the network.

Nominated proof of stake is a popular consensus algorithm among blockchain projects because it combines the security of PoS with the added benefits of stakeholder voting.

The nominated proof of stake consensus algorithm is used by many different blockchain projects, including [EOS](https://eos.io/), [Polkadot](https://polkadot.network/) and [Cosmos](https://cosmos.network/).

These projects have all implemented NPoS in different ways, but they all share the common goal of improving upon the [existing proof of stake algorithm.](https://learn.bybit.com/blockchain/what-is-proof-of-stake/)

# Blockchain Elements

- **_Blocks_**

  - A collection of data, such as transactions, that together indicate a state transition of the blockchain.
  - Composed by **_Extrinsics_**

- **_Extrinsics_**

  - State changes that come from the outside world, i.e. they are not part of the system itself. Extrinsics can take two forms, _inherents_ and _transactions_.
    - **_Inherents_**
      - Extrinsics that are "inherently true" Inherents are not gossiped on the network and are put into blocks by the block author. They are not provably true the way that the desire to send funds is, therefore they do not carry a signature. A blockchain's runtime must have rules for validating inherents. For example, timestamps are inherents. They are validated by being within some margin that each validator deems reasonable.
    - **_Transaction_**
      - An extrinsic that is signed. Transactions are gossiped on the network and incur a transaction fee. Transactions are "provably true", unlike inherents. For example, one can prove that Alice wants to send funds to Bob by the fact that she signed a transfer-funds message with her private key.
  - Composed by **_Events_**

- **_Events_**

  - While extrinsics represent information from the outside world, events represent information from the chain. Extrinsics can trigger events. For example, the Staking pallet emits a `Reward` event when claiming staking rewards to tell the user how much the account was credited.
  - A **_Transfer_** is an event.

- **_Transfer_**
  - Send an asset (p.e. tokens) from one account to another.

# Blockchain Timeline

- Blocks are produced in designated fixed time slots. On average, a new block is added to the blockchain every 6 seconds.
- A block is considered finalized in average after having 2 blocks commited ahead of it.
- An **Era** is a period of 24 hours during which there is a specific set of active validators. That same set cannot change while in an **Era**.
- An **Epoch** is a period of 8 hours. There are 3 **Epochs** per **Era**. An **Epoch** sets the periods where important actions can take place on chain during an Era, like the election of the next validator set which starts before the last epoch.

# Token Status

- **_Circulating Supply_** is the best approximation of the number of coins that are circulating in the market and in the general public's hands.
- **_Total Supply_** is the total amount of coins in existence right now (minus any coins that have been verifiably burned).
- **_Total Issuance_** is defined by the _Total Supply_ minus the amount of xx issued as an ERC1404 and not claimed yet - which belongs to the **_Claims Supply_**.
- **_Vesting Tokens_** is the amount of tokens in a vesting period.
  Vesting period refers to a period in which tokens sold in the pre-sale ICO stage and offered to partners and project team members as incentives for their contribution are prevented from being sold for a specific period. A vesting schedule is announced by the project to release these tokens at intervals throughout a given period.
- **_Stakeable Supply_** is the amount of tokens available to be staked. **_Staked Supply_** is the amount of tokens staked in the network, both by validators and nominators. These affect the overall calculation of the _rewards_ that a validator will have per era.
- **_Rewards Supply_** is the capped amount of tokens distributed among validators on a per era basis as _rewards_. Since these tokens are distributed without any vesting period, they will automatically increase the circulating supply at the following pace:
  $\frac{avgReturn(\%) \times stakedSupply(XX)}{circulatingSupply}$
- **_Unbonding Tokens_** is the amount of tokens that were unbonded and remain in the unbonding period of 28 days that is required to have them passing from the _Staked Supply_ to the **_Liquid Supply_** - tokens available for any occasion - transfer, stake or vote.

# Account Elements

### Balance

- **_transferrable_** - funds available to be transferred; liquid.
- **_locked_** - funds locked for the following purposes:
  - **_vested_** - available funds to be unlocked (can be used for transaction fees)
  - **bonded** - funds frozen in exchange of some benefit
    - **_stake_** - staked funds either by nominating or validating
    - **_voting_** - funds only unlocked according to vote conviction and/or election closure
      - **democracy** - funds used to vote for referenda (can be used for transaction fees)
      - **council** - funds used to vote for a council member
- **_reserved_** - funds used to save data on chain, like the following:
  - setup your **identity**
  - create **assets**
  - make a **proposal**
  - **seconding** a proposal

# Staking Information

- **_Staking_** your XX allows you to passively earn rewards for your help to secure the network. It is the process by which you can submit XX tokens in a bid to serve as a validator or nominator and get rewarded.
- Staked tokens have a **28-day cooldown period when unstaked**, which means they can only be redeemed / withdrawn after that period.
- The overall staking return in the network is calculated from the current staked ratio, current ideal interest and inflation parameters.
  If you wanna know more about it check our [xx Economics](https://xx.network/wp-content/uploads/2021/12/xx-economics-v1.2.pdf).
- **_Slashing_** will happen if a validator misbehaves (e.g. goes offline, attacks the network, or runs modified software) in the network. They and their nominators will get slashed by **losing a percentage of their bonded/staked XX.** Any slashed XX will be added to the Treasury.
  - Validators are also ‘**_chilled_**’ by the protocol when they commit a slashable offense. This removes them from the active set and disqualifies them from re-election in the next era. If the slashed amount is non-zero, chilling also removes all of the validator’s nominations.

### Validators

- **_Validators_** secure the xx network blockchain by staking XX and participating in **_consensus_** with other validators.
- **_Consensus_** is a general agreement. Running a blockchain in a decentralized network requires every block to be validated before committed. To do so, a **_consensus protocol_** takes place, where validators process the events added to that block - such as transfers, votes or staking actions - and validate its content signing it. When enough signatures are shared among the validators and there is enough confidence on the validity of the block, it is committed and the state of the blockchain is updated - as in updating the ledger of accounts that send or received transactions.

### Nominators

- **_Nominators_** secure the xx network blockchain by selecting good **_validators_** and staking XX.
- **_Nomination_** is the process of staking your tokens behind a **_validator_** to earn rewards.

### Waiting List

- Nodes who applied to be a validator but did not make it into the validator set, so are waiting to get in on the next era, if possible.

In summary, the main difference between block validators and nominators is that block validators are responsible for validating new blocks, while nominators are responsible for nominating other nodes to become block validators.

### **Reward Distribution**

In NPoS all validators of the active set receive the same amount of rewards. From these rewards, the commission fee of the validator is deducted. The remaining rewards are distributed among the nominators proportional to their stake.

📌 If you wanna know more about these and other concepts about xx network blockchain check our [high-level overview of the xx coin](https://xx.network/archive/xxcoin-tokenomics/).
