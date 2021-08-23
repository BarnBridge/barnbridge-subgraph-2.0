import { log, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EPool as EPoolContract,
  AddedTranche,
  SetController,
  SetAggregator,
  SetFeeRate,
  TransferFees,
  IssuedEToken,
  RedeemedEToken,
  RebalancedTranches
} from "../generated/EPool/EPool"
import { EPool, Tranche } from "../generated/schema"

function createEPoolIfNonExistent(ePoolAddress: Address): EPool {
  let ePoolContract = EPoolContract.bind(ePoolAddress);
  let ePool = EPool.load(ePoolAddress.toHex());
  if (ePool != null) return ePool as EPool;
  ePool = new EPool(ePoolAddress.toHex());
  ePool.controller = ePoolContract.getController();
  ePool.eTokenFactory = ePoolContract.eTokenFactory();
  ePool.aggregator = ePoolContract.getAggregator();
  ePool.tokenA = ePoolContract.tokenA();
  ePool.tokenB = ePoolContract.tokenB();
  ePool.sFactorA = ePoolContract.sFactorA();
  ePool.sFactorB = ePoolContract.sFactorB();
  ePool.feeRate = BigInt.fromI32(0);
  ePool.cumulativeFeeA = BigInt.fromI32(0);
  ePool.cumulativeFeeB = BigInt.fromI32(0);
  ePool.tranches = [];
  ePool.save();
  log.debug("Saved EPool {}", [ePoolAddress.toHex()]);
  return ePool as EPool;
}

function createTrancheIfNonExistent(ePoolAddress: Address, eTokenAddress: Address): Tranche {
  let ePoolContract = EPoolContract.bind(ePoolAddress);
  let ePool = createEPoolIfNonExistent(ePoolAddress);
  let tranche = Tranche.load(eTokenAddress.toHex());
  if (tranche != null) return tranche as Tranche;
  tranche = new Tranche(eTokenAddress.toHex());
  let t = ePoolContract.getTranche(eTokenAddress);
  tranche.eToken = eTokenAddress;
  tranche.sFactorE = t.sFactorE;
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.targetRatio = t.targetRatio;
  tranche.save();
  let tranches = ePool.tranches;
  tranches.push(tranche.id);
  ePool.tranches = tranches;
  ePool.save();
  log.debug("Saved Tranche {}", [eTokenAddress.toHex()]);
  return tranche as Tranche;
}

export function handleSetController(event: SetController): void {
  let ePoolContract = EPoolContract.bind(event.address);
  let ePool = createEPoolIfNonExistent(event.address);
  ePool.controller = ePoolContract.getController();
  ePool.save();
}

export function handleSetAggregator(event: SetAggregator): void {
  let ePoolContract = EPoolContract.bind(event.address);
  let ePool = createEPoolIfNonExistent(event.address);
  ePool.aggregator = ePoolContract.getAggregator();
  ePool.save();
}

export function handleSetFeeRate(event: SetFeeRate): void {
  let ePoolContract = EPoolContract.bind(event.address);
  let ePool = createEPoolIfNonExistent(event.address);
  ePool.feeRate = ePoolContract.feeRate();
  ePool.save();
}

export function handleTransferFees(event: TransferFees): void {
  let ePoolContract = EPoolContract.bind(event.address);
  let ePool = createEPoolIfNonExistent(event.address);
  ePool.cumulativeFeeA = ePoolContract.cumulativeFeeA();
  ePool.cumulativeFeeB = ePoolContract.cumulativeFeeB();
  ePool.save();
}

export function handleAddedTranche(event: AddedTranche): void {
  createEPoolIfNonExistent(event.address)
  createTrancheIfNonExistent(event.address, event.params.eToken);
}

export function handleIssuedEToken(event: IssuedEToken): void {
  let ePoolContract = EPoolContract.bind(event.address);
  let tranche = createTrancheIfNonExistent(event.address, event.params.eToken);
  let t = ePoolContract.getTranche(event.params.eToken);
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.save();
}

export function handleRedeemedEToken(event: RedeemedEToken): void {
  let ePoolContract = EPoolContract.bind(event.address);
  let ePool = createEPoolIfNonExistent(event.address);
  ePool.cumulativeFeeA = ePoolContract.cumulativeFeeA();
  ePool.cumulativeFeeB = ePoolContract.cumulativeFeeB();
  ePool.save();
  let tranche = createTrancheIfNonExistent(event.address, event.params.eToken);
  let t = ePoolContract.getTranche(event.params.eToken);
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.save();
}

export function handleRebalancedTranches(event: RebalancedTranches): void {
  let ePoolContract = EPoolContract.bind(event.address);
  createEPoolIfNonExistent(event.address);
  let tranches = ePoolContract.getTranches();
  for (let i = 0; i < tranches.length; i++) {
    let tranche = createTrancheIfNonExistent(event.address, tranches[i].eToken);
    tranche.reserveA = tranches[i].reserveA;
    tranche.reserveB = tranches[i].reserveB;
    tranche.save();
  }
}
