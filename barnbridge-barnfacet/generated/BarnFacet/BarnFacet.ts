// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Delegate extends ethereum.Event {
  get params(): Delegate__Params {
    return new Delegate__Params(this);
  }
}

export class Delegate__Params {
  _event: Delegate;

  constructor(event: Delegate) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class DelegatedPowerDecreased extends ethereum.Event {
  get params(): DelegatedPowerDecreased__Params {
    return new DelegatedPowerDecreased__Params(this);
  }
}

export class DelegatedPowerDecreased__Params {
  _event: DelegatedPowerDecreased;

  constructor(event: DelegatedPowerDecreased) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get to_newDelegatedPower(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class DelegatedPowerIncreased extends ethereum.Event {
  get params(): DelegatedPowerIncreased__Params {
    return new DelegatedPowerIncreased__Params(this);
  }
}

export class DelegatedPowerIncreased__Params {
  _event: DelegatedPowerIncreased;

  constructor(event: DelegatedPowerIncreased) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get to_newDelegatedPower(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class Deposit extends ethereum.Event {
  get params(): Deposit__Params {
    return new Deposit__Params(this);
  }
}

export class Deposit__Params {
  _event: Deposit;

  constructor(event: Deposit) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get newBalance(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Lock extends ethereum.Event {
  get params(): Lock__Params {
    return new Lock__Params(this);
  }
}

export class Lock__Params {
  _event: Lock;

  constructor(event: Lock) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amountWithdrew(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get amountLeft(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class BarnFacet__stakeAtTsResultValue0Struct extends ethereum.Tuple {
  get timestamp(): BigInt {
    return this[0].toBigInt();
  }

  get amount(): BigInt {
    return this[1].toBigInt();
  }

  get expiryTimestamp(): BigInt {
    return this[2].toBigInt();
  }

  get delegatedTo(): Address {
    return this[3].toAddress();
  }
}

export class BarnFacet extends ethereum.SmartContract {
  static bind(address: Address): BarnFacet {
    return new BarnFacet("BarnFacet", address);
  }

  MAX_LOCK(): BigInt {
    let result = super.call("MAX_LOCK", "MAX_LOCK():(uint256)", []);

    return result[0].toBigInt();
  }

  try_MAX_LOCK(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("MAX_LOCK", "MAX_LOCK():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceAtTs(user: Address, timestamp: BigInt): BigInt {
    let result = super.call(
      "balanceAtTs",
      "balanceAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );

    return result[0].toBigInt();
  }

  try_balanceAtTs(
    user: Address,
    timestamp: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "balanceAtTs",
      "balanceAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceOf(user: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bondStaked(): BigInt {
    let result = super.call("bondStaked", "bondStaked():(uint256)", []);

    return result[0].toBigInt();
  }

  try_bondStaked(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("bondStaked", "bondStaked():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bondStakedAtTs(timestamp: BigInt): BigInt {
    let result = super.call(
      "bondStakedAtTs",
      "bondStakedAtTs(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(timestamp)]
    );

    return result[0].toBigInt();
  }

  try_bondStakedAtTs(timestamp: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "bondStakedAtTs",
      "bondStakedAtTs(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(timestamp)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  delegatedPower(user: Address): BigInt {
    let result = super.call(
      "delegatedPower",
      "delegatedPower(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );

    return result[0].toBigInt();
  }

  try_delegatedPower(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "delegatedPower",
      "delegatedPower(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  delegatedPowerAtTs(user: Address, timestamp: BigInt): BigInt {
    let result = super.call(
      "delegatedPowerAtTs",
      "delegatedPowerAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );

    return result[0].toBigInt();
  }

  try_delegatedPowerAtTs(
    user: Address,
    timestamp: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "delegatedPowerAtTs",
      "delegatedPowerAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  multiplierAtTs(user: Address, timestamp: BigInt): BigInt {
    let result = super.call(
      "multiplierAtTs",
      "multiplierAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );

    return result[0].toBigInt();
  }

  try_multiplierAtTs(
    user: Address,
    timestamp: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "multiplierAtTs",
      "multiplierAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  multiplierOf(user: Address): BigInt {
    let result = super.call("multiplierOf", "multiplierOf(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_multiplierOf(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "multiplierOf",
      "multiplierOf(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  stakeAtTs(
    user: Address,
    timestamp: BigInt
  ): BarnFacet__stakeAtTsResultValue0Struct {
    let result = super.call(
      "stakeAtTs",
      "stakeAtTs(address,uint256):((uint256,uint256,uint256,address))",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );

    return result[0].toTuple() as BarnFacet__stakeAtTsResultValue0Struct;
  }

  try_stakeAtTs(
    user: Address,
    timestamp: BigInt
  ): ethereum.CallResult<BarnFacet__stakeAtTsResultValue0Struct> {
    let result = super.tryCall(
      "stakeAtTs",
      "stakeAtTs(address,uint256):((uint256,uint256,uint256,address))",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTuple() as BarnFacet__stakeAtTsResultValue0Struct
    );
  }

  userDelegatedTo(user: Address): Address {
    let result = super.call(
      "userDelegatedTo",
      "userDelegatedTo(address):(address)",
      [ethereum.Value.fromAddress(user)]
    );

    return result[0].toAddress();
  }

  try_userDelegatedTo(user: Address): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "userDelegatedTo",
      "userDelegatedTo(address):(address)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  userLockedUntil(user: Address): BigInt {
    let result = super.call(
      "userLockedUntil",
      "userLockedUntil(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );

    return result[0].toBigInt();
  }

  try_userLockedUntil(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "userLockedUntil",
      "userLockedUntil(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  votingPower(user: Address): BigInt {
    let result = super.call("votingPower", "votingPower(address):(uint256)", [
      ethereum.Value.fromAddress(user)
    ]);

    return result[0].toBigInt();
  }

  try_votingPower(user: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "votingPower",
      "votingPower(address):(uint256)",
      [ethereum.Value.fromAddress(user)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  votingPowerAtTs(user: Address, timestamp: BigInt): BigInt {
    let result = super.call(
      "votingPowerAtTs",
      "votingPowerAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );

    return result[0].toBigInt();
  }

  try_votingPowerAtTs(
    user: Address,
    timestamp: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "votingPowerAtTs",
      "votingPowerAtTs(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(user),
        ethereum.Value.fromUnsignedBigInt(timestamp)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class DelegateCall extends ethereum.Call {
  get inputs(): DelegateCall__Inputs {
    return new DelegateCall__Inputs(this);
  }

  get outputs(): DelegateCall__Outputs {
    return new DelegateCall__Outputs(this);
  }
}

export class DelegateCall__Inputs {
  _call: DelegateCall;

  constructor(call: DelegateCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DelegateCall__Outputs {
  _call: DelegateCall;

  constructor(call: DelegateCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }
}

export class DepositAndLockCall extends ethereum.Call {
  get inputs(): DepositAndLockCall__Inputs {
    return new DepositAndLockCall__Inputs(this);
  }

  get outputs(): DepositAndLockCall__Outputs {
    return new DepositAndLockCall__Outputs(this);
  }
}

export class DepositAndLockCall__Inputs {
  _call: DepositAndLockCall;

  constructor(call: DepositAndLockCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class DepositAndLockCall__Outputs {
  _call: DepositAndLockCall;

  constructor(call: DepositAndLockCall) {
    this._call = call;
  }
}

export class InitBarnCall extends ethereum.Call {
  get inputs(): InitBarnCall__Inputs {
    return new InitBarnCall__Inputs(this);
  }

  get outputs(): InitBarnCall__Outputs {
    return new InitBarnCall__Outputs(this);
  }
}

export class InitBarnCall__Inputs {
  _call: InitBarnCall;

  constructor(call: InitBarnCall) {
    this._call = call;
  }

  get _bond(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _rewards(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class InitBarnCall__Outputs {
  _call: InitBarnCall;

  constructor(call: InitBarnCall) {
    this._call = call;
  }
}

export class LockCall extends ethereum.Call {
  get inputs(): LockCall__Inputs {
    return new LockCall__Inputs(this);
  }

  get outputs(): LockCall__Outputs {
    return new LockCall__Outputs(this);
  }
}

export class LockCall__Inputs {
  _call: LockCall;

  constructor(call: LockCall) {
    this._call = call;
  }

  get timestamp(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class LockCall__Outputs {
  _call: LockCall;

  constructor(call: LockCall) {
    this._call = call;
  }
}

export class StopDelegateCall extends ethereum.Call {
  get inputs(): StopDelegateCall__Inputs {
    return new StopDelegateCall__Inputs(this);
  }

  get outputs(): StopDelegateCall__Outputs {
    return new StopDelegateCall__Outputs(this);
  }
}

export class StopDelegateCall__Inputs {
  _call: StopDelegateCall;

  constructor(call: StopDelegateCall) {
    this._call = call;
  }
}

export class StopDelegateCall__Outputs {
  _call: StopDelegateCall;

  constructor(call: StopDelegateCall) {
    this._call = call;
  }
}

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
