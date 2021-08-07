import { BigInt } from "@graphprotocol/graph-ts"
import {
  SmartExposureController,
  SetDao,
  SetFeesOwner,
  SetGuardian,
  SetPausedIssuance
} from "../generated/SmartExposureController/SmartExposureController"
import { ExampleEntity } from "../generated/schema"

export function handleSetDao(event: SetDao): void {
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
  entity.dao = event.params.dao

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
  // - contract.dao(...)
  // - contract.feesOwner(...)
  // - contract.guardian(...)
  // - contract.isDaoOrGuardian(...)
  // - contract.pausedIssuance(...)
  // - contract.setDao(...)
  // - contract.setFeesOwner(...)
  // - contract.setGuardian(...)
  // - contract.setPausedIssuance(...)
}

export function handleSetFeesOwner(event: SetFeesOwner): void {}

export function handleSetGuardian(event: SetGuardian): void {}

export function handleSetPausedIssuance(event: SetPausedIssuance): void {}
