import { BigInt } from "@graphprotocol/graph-ts"
import {
  YieldFarmLP,
  Harvest as HarvestLPEvent,
  MassHarvest as MassHarvestLPEvent
} from "../generated/YieldFarmLP/YieldFarmLP"
import { HarvestLP, MassHarvestLP } from "../generated/schema"

export function handleHarvestLP(event: HarvestLPEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = HarvestLP.load(event.transaction.from.toHex())
  let id = event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString()

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new HarvestLP(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.user = event.params.user
  entity.epochId = event.params.epochId.toI32()
  entity.amount = event.params.amount
  entity.blockNumber = event.block.number.toI32()
  entity.blockTimestamp = event.block.timestamp.toI32()
  entity.txHash = event.transaction.hash.toHex()

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
  // - contract.NR_OF_EPOCHS(...)
  // - contract.TOTAL_DISTRIBUTED_AMOUNT(...)
  // - contract.epochDuration(...)
  // - contract.epochStart(...)
  // - contract.getCurrentEpoch(...)
  // - contract.getEpochStake(...)
  // - contract.getPoolSize(...)
  // - contract.harvest(...)
  // - contract.lastInitializedEpoch(...)
  // - contract.massHarvest(...)
  // - contract.userLastEpochIdHarvested(...)
}

export function handleMassHarvestLP(event: MassHarvestLPEvent): void {
  let massHarvestEntity = MassHarvestLP.load(event.transaction.from.toHex())
  let id = event.transaction.hash.toHex() + "-" + event.transactionLogIndex.toString()

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (massHarvestEntity == null) {
    massHarvestEntity = new MassHarvestLP(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    massHarvestEntity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  massHarvestEntity.count = massHarvestEntity.count + BigInt.fromI32(1)
  massHarvestEntity.user = event.params.user
  massHarvestEntity.epochsHarvested = event.params.epochsHarvested.toI32()
  massHarvestEntity.totalValue = event.params.totalValue
  massHarvestEntity.blockNumber = event.block.number.toI32()
  massHarvestEntity.blockTimestamp = event.block.timestamp.toI32()
  massHarvestEntity.txHash = event.transaction.hash.toHex()
  massHarvestEntity.save()
}
