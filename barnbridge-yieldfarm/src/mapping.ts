import { BigInt } from "@graphprotocol/graph-ts"
import {
  YieldFarm,
  Harvest as HarvestEvent,
  MassHarvest as MassHarvestEvent
} from "../generated/YieldFarm/YieldFarm"
import { Harvest, MassHarvest } from "../generated/schema"

export function handleHarvest(event: HarvestEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let harvestEntity = Harvest.load(event.transaction.from.toHex())
  let id = event.transaction.hash.toHex() + "_" + event.transactionLogIndex.toString()

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (harvestEntity == null) {
    harvestEntity = new Harvest(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    harvestEntity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  harvestEntity.count = harvestEntity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  harvestEntity.user = event.params.user
  harvestEntity.epochId = event.params.epochId.toI32()
  harvestEntity.amount = event.params.amount
  harvestEntity.blockNumber = event.block.number.toI32()
  harvestEntity.blockTimestamp = event.block.timestamp.toI32()
  harvestEntity.txHash = event.transaction.hash.toHex()

  // Entities can be written to the store with `.save()`
  harvestEntity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the harvestEntity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // harvestEntity back to the store. Fields that were not set or unset remain
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

export function handleMassHarvest(event: MassHarvestEvent): void {
  let massHarvestEntity = MassHarvest.load(event.transaction.from.toHex())
  let id = event.transaction.hash.toHex() + "_" + event.transactionLogIndex.toString()

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (massHarvestEntity == null) {
    massHarvestEntity = new MassHarvest(event.transaction.from.toHex())

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
