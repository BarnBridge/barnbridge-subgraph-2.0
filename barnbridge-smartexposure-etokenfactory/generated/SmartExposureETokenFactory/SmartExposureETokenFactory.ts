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

export class CreatedEToken extends ethereum.Event {
  get params(): CreatedEToken__Params {
    return new CreatedEToken__Params(this);
  }
}

export class CreatedEToken__Params {
  _event: CreatedEToken;

  constructor(event: CreatedEToken) {
    this._event = event;
  }

  get eToken(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get ePool(): Address {
    return this._event.parameters[1].value.toAddress();
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

export class SmartExposureETokenFactory extends ethereum.SmartContract {
  static bind(address: Address): SmartExposureETokenFactory {
    return new SmartExposureETokenFactory(
      "SmartExposureETokenFactory",
      address
    );
  }

  createEToken(name: string, symbol: string): Address {
    let result = super.call(
      "createEToken",
      "createEToken(string,string):(address)",
      [ethereum.Value.fromString(name), ethereum.Value.fromString(symbol)]
    );

    return result[0].toAddress();
  }

  try_createEToken(name: string, symbol: string): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createEToken",
      "createEToken(string,string):(address)",
      [ethereum.Value.fromString(name), ethereum.Value.fromString(symbol)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

export class CreateETokenCall extends ethereum.Call {
  get inputs(): CreateETokenCall__Inputs {
    return new CreateETokenCall__Inputs(this);
  }

  get outputs(): CreateETokenCall__Outputs {
    return new CreateETokenCall__Outputs(this);
  }
}

export class CreateETokenCall__Inputs {
  _call: CreateETokenCall;

  constructor(call: CreateETokenCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get symbol(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateETokenCall__Outputs {
  _call: CreateETokenCall;

  constructor(call: CreateETokenCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.outputValues[0].value.toAddress();
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
