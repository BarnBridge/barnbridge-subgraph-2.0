import { BigInt } from "@graphprotocol/graph-ts"
import {
  SmartExposure_WETH_WBTC,
  AddedTranche,
  IssuedEToken,
  RebalancedTranches,
  RecoveredToken,
  RedeemedEToken,
  SetAggregator,
  SetController,
  SetFeeRate,
  SetMinRDiv,
  SetRebalanceInterval,
  TransferFees
} from "../generated/SmartExposure_WETH_WBTC/SmartExposure_WETH_WBTC"
import { ExampleEntity } from "../generated/schema"

export function handleAddedTranche(event: AddedTranche): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.eToken = event.params.eToken

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.FEE_RATE_LIMIT(...)
  // - contract.TRANCHE_LIMIT(...)
  // - contract.addTranche(...)
  // - contract.cumulativeFeeA(...)
  // - contract.cumulativeFeeB(...)
  // - contract.eTokenFactory(...)
  // - contract.feeRate(...)
  // - contract.getAggregator(...)
  // - contract.getController(...)
  // - contract.getRate(...)
  // - contract.getTranche(...)
  // - contract.getTranches(...)
  // - contract.issueExact(...)
  // - contract.lastRebalance(...)
  // - contract.rebalance(...)
  // - contract.rebalanceInterval(...)
  // - contract.rebalanceMinRDiv(...)
  // - contract.recover(...)
  // - contract.redeemExact(...)
  // - contract.sFactorA(...)
  // - contract.sFactorB(...)
  // - contract.setAggregator(...)
  // - contract.setController(...)
  // - contract.setFeeRate(...)
  // - contract.setMinRDiv(...)
  // - contract.setRebalanceInterval(...)
  // - contract.tokenA(...)
  // - contract.tokenB(...)
  // - contract.tranches(...)
  // - contract.tranchesByIndex(...)
  // - contract.transferFees(...)
}

export function handleIssuedEToken(event: IssuedEToken): void {}

export function handleRebalancedTranches(event: RebalancedTranches): void {}

export function handleRecoveredToken(event: RecoveredToken): void {}

export function handleRedeemedEToken(event: RedeemedEToken): void {}

export function handleSetAggregator(event: SetAggregator): void {}

export function handleSetController(event: SetController): void {}

export function handleSetFeeRate(event: SetFeeRate): void {}

export function handleSetMinRDiv(event: SetMinRDiv): void {}

export function handleSetRebalanceInterval(event: SetRebalanceInterval): void {}

export function handleTransferFees(event: TransferFees): void {}
