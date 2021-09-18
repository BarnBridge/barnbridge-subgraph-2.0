import { BigInt } from "@graphprotocol/graph-ts"
import { Contract, Approval as ApprovalEvent, Transfer as TransferEvent } from "../generated/Contract/Contract"
import { Transfer, Approval } from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let approvalEntity = Approval.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (approvalEntity == null) {
    approvalEntity = new Approval(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    approvalEntity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  approvalEntity.count = approvalEntity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  approvalEntity.owner = event.params.owner
  approvalEntity.spender = event.params.spender
  approvalEntity.value = event.params.value
  approvalEntity.blockNumber = event.block.number.toI32()
  approvalEntity.blockTimestamp = event.block.timestamp.toI32()
  approvalEntity.txHash = event.transaction.hash.toHex()

  // Entities can be written to the store with `.save()`
  approvalEntity.save()

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
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.increaseAllowance(...)
  // - contract.name(...)
  // - contract.symbol(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
}

export function handleTransfer(event: TransferEvent): void {
  let transferEntity = Transfer.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (transferEntity == null) {
    transferEntity = new Transfer(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    transferEntity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  transferEntity.count = transferEntity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  transferEntity.to = event.params.to
  transferEntity.from = event.params.from
  transferEntity.value = event.params.value
  transferEntity.blockNumber = event.block.number.toI32()
  transferEntity.blockTimestamp = event.block.timestamp.toI32()
  transferEntity.txHash = event.transaction.hash.toHex()

  // Entities can be written to the store with `.save()`
  transferEntity.save()

}
