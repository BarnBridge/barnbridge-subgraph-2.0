import { BigInt } from "@graphprotocol/graph-ts"
import {
  bb_aSUSD,
  Approval,
  BuyJuniorBond,
  BuySeniorBond,
  BuyTokens,
  RedeemJuniorBond,
  RedeemSeniorBond,
  SellTokens,
  Transfer
} from "../generated/bb_aSUSD/bb_aSUSD"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
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
  entity.owner = event.params.owner
  entity.spender = event.params.spender

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
  // - contract.EXP_SCALE(...)
  // - contract.MAX_UINT256(...)
  // - contract._setup(...)
  // - contract.abond(...)
  // - contract.abondDebt(...)
  // - contract.abondGain(...)
  // - contract.abondPaid(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.bondGain(...)
  // - contract.buyBond(...)
  // - contract.controller(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.increaseAllowance(...)
  // - contract.juniorBond(...)
  // - contract.juniorBondId(...)
  // - contract.juniorBonds(...)
  // - contract.juniorBondsMaturingAt(...)
  // - contract.juniorBondsMaturities(...)
  // - contract.juniorBondsMaturitiesPrev(...)
  // - contract.maxBondDailyRate(...)
  // - contract.name(...)
  // - contract.pool(...)
  // - contract.price(...)
  // - contract.seniorBond(...)
  // - contract.seniorBondId(...)
  // - contract.seniorBonds(...)
  // - contract.symbol(...)
  // - contract.tokensInJuniorBonds(...)
  // - contract.totalSupply(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.underlyingJuniors(...)
  // - contract.underlyingLiquidatedJuniors(...)
  // - contract.underlyingLoanable(...)
  // - contract.underlyingTotal(...)
}

export function handleBuyJuniorBond(event: BuyJuniorBond): void {}

export function handleBuySeniorBond(event: BuySeniorBond): void {}

export function handleBuyTokens(event: BuyTokens): void {}

export function handleRedeemJuniorBond(event: RedeemJuniorBond): void {}

export function handleRedeemSeniorBond(event: RedeemSeniorBond): void {}

export function handleSellTokens(event: SellTokens): void {}

export function handleTransfer(event: Transfer): void {}
