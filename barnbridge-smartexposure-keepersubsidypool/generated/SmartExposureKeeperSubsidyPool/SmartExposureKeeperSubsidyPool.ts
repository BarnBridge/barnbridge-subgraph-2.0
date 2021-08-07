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

export class SetBeneficiary extends ethereum.Event {
  get params(): SetBeneficiary__Params {
    return new SetBeneficiary__Params(this);
  }
}

export class SetBeneficiary__Params {
  _event: SetBeneficiary;

  constructor(event: SetBeneficiary) {
    this._event = event;
  }

  get beneficiary(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get canRequest(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class SetController extends ethereum.Event {
  get params(): SetController__Params {
    return new SetController__Params(this);
  }
}

export class SetController__Params {
  _event: SetController;

  constructor(event: SetController) {
    this._event = event;
  }

  get controller(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class SmartExposureKeeperSubsidyPool extends ethereum.SmartContract {
  static bind(address: Address): SmartExposureKeeperSubsidyPool {
    return new SmartExposureKeeperSubsidyPool(
      "SmartExposureKeeperSubsidyPool",
      address
    );
  }

  getController(): Address {
    let result = super.call("getController", "getController():(address)", []);

    return result[0].toAddress();
  }

  try_getController(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getController",
      "getController():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  isBeneficiary(beneficiary: Address): boolean {
    let result = super.call("isBeneficiary", "isBeneficiary(address):(bool)", [
      ethereum.Value.fromAddress(beneficiary)
    ]);

    return result[0].toBoolean();
  }

  try_isBeneficiary(beneficiary: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isBeneficiary",
      "isBeneficiary(address):(bool)",
      [ethereum.Value.fromAddress(beneficiary)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  requestSubsidy(token: Address, amount: BigInt): boolean {
    let result = super.call(
      "requestSubsidy",
      "requestSubsidy(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(token),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );

    return result[0].toBoolean();
  }

  try_requestSubsidy(
    token: Address,
    amount: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "requestSubsidy",
      "requestSubsidy(address,uint256):(bool)",
      [
        ethereum.Value.fromAddress(token),
        ethereum.Value.fromUnsignedBigInt(amount)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  setBeneficiary(beneficiary: Address, canRequest: boolean): boolean {
    let result = super.call(
      "setBeneficiary",
      "setBeneficiary(address,bool):(bool)",
      [
        ethereum.Value.fromAddress(beneficiary),
        ethereum.Value.fromBoolean(canRequest)
      ]
    );

    return result[0].toBoolean();
  }

  try_setBeneficiary(
    beneficiary: Address,
    canRequest: boolean
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "setBeneficiary",
      "setBeneficiary(address,bool):(bool)",
      [
        ethereum.Value.fromAddress(beneficiary),
        ethereum.Value.fromBoolean(canRequest)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  setController(_controller: Address): boolean {
    let result = super.call("setController", "setController(address):(bool)", [
      ethereum.Value.fromAddress(_controller)
    ]);

    return result[0].toBoolean();
  }

  try_setController(_controller: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "setController",
      "setController(address):(bool)",
      [ethereum.Value.fromAddress(_controller)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class RequestSubsidyCall extends ethereum.Call {
  get inputs(): RequestSubsidyCall__Inputs {
    return new RequestSubsidyCall__Inputs(this);
  }

  get outputs(): RequestSubsidyCall__Outputs {
    return new RequestSubsidyCall__Outputs(this);
  }
}

export class RequestSubsidyCall__Inputs {
  _call: RequestSubsidyCall;

  constructor(call: RequestSubsidyCall) {
    this._call = call;
  }

  get token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RequestSubsidyCall__Outputs {
  _call: RequestSubsidyCall;

  constructor(call: RequestSubsidyCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class SetBeneficiaryCall extends ethereum.Call {
  get inputs(): SetBeneficiaryCall__Inputs {
    return new SetBeneficiaryCall__Inputs(this);
  }

  get outputs(): SetBeneficiaryCall__Outputs {
    return new SetBeneficiaryCall__Outputs(this);
  }
}

export class SetBeneficiaryCall__Inputs {
  _call: SetBeneficiaryCall;

  constructor(call: SetBeneficiaryCall) {
    this._call = call;
  }

  get beneficiary(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get canRequest(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetBeneficiaryCall__Outputs {
  _call: SetBeneficiaryCall;

  constructor(call: SetBeneficiaryCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class SetControllerCall extends ethereum.Call {
  get inputs(): SetControllerCall__Inputs {
    return new SetControllerCall__Inputs(this);
  }

  get outputs(): SetControllerCall__Outputs {
    return new SetControllerCall__Outputs(this);
  }
}

export class SetControllerCall__Inputs {
  _call: SetControllerCall;

  constructor(call: SetControllerCall) {
    this._call = call;
  }

  get _controller(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetControllerCall__Outputs {
  _call: SetControllerCall;

  constructor(call: SetControllerCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}