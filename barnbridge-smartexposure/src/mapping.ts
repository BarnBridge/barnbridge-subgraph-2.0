import { log, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  EPoolPeriphery as EPoolPeripheryContract,
  IssuedEToken as IssuedETokenViaPeriphery,
  RedeemedEToken as RedeemedETokenViaPeriphery
} from "../generated/EPoolPeriphery/EPoolPeriphery";
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
} from "../generated/EPool_WETH_USDC/EPool"
import { EPool, EToken, Rebalance, Tranche, User, UserETokenBalance } from "../generated/schema"
import { EToken as ETokenContractTemplate } from "../generated/templates"
import { EToken as ETokenContract, Transfer } from "../generated/templates/EToken/EToken"

function createEPoolIfNonExistent(ePoolAddress: Address): EPool {
  let ePool = EPool.load(ePoolAddress.toHex());
  if (ePool != null) return ePool as EPool;
  let ePoolContract = EPoolContract.bind(ePoolAddress);
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
  log.debug("Saved EPool {}", [ePool.id]);
  return ePool as EPool;
}

function createTrancheIfNonExistent(ePoolAddress: Address, eTokenAddress: Address): Tranche {
  let ePool = createEPoolIfNonExistent(ePoolAddress);
  let eToken = createETokenIfNonExistent(eTokenAddress);
  let ePoolContract = EPoolContract.bind(ePoolAddress);
  let tranche = Tranche.load(eTokenAddress.toHex());
  if (tranche != null) return tranche as Tranche;
  tranche = new Tranche(eTokenAddress.toHex());
  let t = ePoolContract.getTranche(eTokenAddress);
  tranche.eToken = eToken.id;
  tranche.sFactorE = t.sFactorE;
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.targetRatio = t.targetRatio;
  tranche.rebalances = [];
  tranche.save();
  let tranches = ePool.tranches;
  tranches.push(tranche.id);
  ePool.tranches = tranches;
  ePool.save();
  log.debug("Saved Tranche {}", [tranche.id]);
  return tranche as Tranche;
}

function createETokenIfNonExistent(eTokenAddress: Address): EToken {
  let eToken = EToken.load(eTokenAddress.toHex());
  if (eToken != null) return eToken as EToken;
  ETokenContractTemplate.create(eTokenAddress);
  let eTokenContract = ETokenContract.bind(eTokenAddress);
  eToken = new EToken(eTokenAddress.toHex());
  let nameCallResult = eTokenContract.try_name();
  if (!nameCallResult.reverted) eToken.name = nameCallResult.value;
  let symbolCallResult = eTokenContract.try_symbol();
  if (!symbolCallResult.reverted) eToken.symbol = symbolCallResult.value;
  let decimalsCallResult = eTokenContract.try_decimals();
  if (!decimalsCallResult.reverted) eToken.decimals = decimalsCallResult.value;
  eToken.userBalances = [];
  eToken.save();
  log.debug("Saved EToken {}", [eToken.id]);
  return eToken as EToken;
}

function createUserIfNonExistent(userAddress: Address): User {
  let user = User.load(userAddress.toHex());
  if (user != null) return user as User;
  user = new User(userAddress.toHex());
  user.eTokenBalances = [];
  user.save();
  log.debug("Saved User {}", [user.id]);
  return user as User;
}

function createUserETokenBalanceIfNonExistent(userAddress: Address, eTokenAddress: Address): UserETokenBalance {
  let eToken = createETokenIfNonExistent(eTokenAddress);
  let user = createUserIfNonExistent(userAddress);
  let userETokenBalance = UserETokenBalance.load(userAddress.toHex() + '-' + eTokenAddress.toHex());
  if (userETokenBalance != null) return userETokenBalance as UserETokenBalance;
  userETokenBalance = new UserETokenBalance(userAddress.toHex() + '-' + eTokenAddress.toHex());
  let eTokenContract = ETokenContract.bind(eTokenAddress);
  log.debug("User {}, EToken {}", [userAddress.toHex(), eTokenAddress.toHex()]);
  userETokenBalance.balance = eTokenContract.balanceOf(userAddress);
  userETokenBalance.save();
  let userBalances = eToken.userBalances;
  userBalances.push(userETokenBalance.id);
  eToken.userBalances = userBalances;
  eToken.save();
  let eTokenBalances = user.eTokenBalances;
  eTokenBalances.push(userETokenBalance.id);
  user.eTokenBalances = eTokenBalances;
  user.save();
  log.debug("Saved UserTokenBalance {}", [userETokenBalance.id]);
  return userETokenBalance as UserETokenBalance;
}

export function handleSetController(event: SetController): void {
  let ePool = createEPoolIfNonExistent(event.address);
  let ePoolContract = EPoolContract.bind(event.address);
  ePool.controller = ePoolContract.getController();
  ePool.save();
}

export function handleSetAggregator(event: SetAggregator): void {
  let ePool = createEPoolIfNonExistent(event.address);
  let ePoolContract = EPoolContract.bind(event.address);
  ePool.aggregator = ePoolContract.getAggregator();
  ePool.save();
}

export function handleSetFeeRate(event: SetFeeRate): void {
  let ePool = createEPoolIfNonExistent(event.address);
  let ePoolContract = EPoolContract.bind(event.address);
  ePool.feeRate = ePoolContract.feeRate();
  ePool.save();
}

export function handleTransferFees(event: TransferFees): void {
  let ePool = createEPoolIfNonExistent(event.address);
  let ePoolContract = EPoolContract.bind(event.address);
  ePool.cumulativeFeeA = ePoolContract.cumulativeFeeA();
  ePool.cumulativeFeeB = ePoolContract.cumulativeFeeB();
  ePool.save();
}

export function handleAddedTranche(event: AddedTranche): void {
  createTrancheIfNonExistent(event.address, event.params.eToken);
}

export function handleIssuedEToken(event: IssuedEToken): void {
  let tranche = createTrancheIfNonExistent(event.address, event.params.eToken);
  let ePoolContract = EPoolContract.bind(event.address);
  let t = ePoolContract.getTranche(event.params.eToken);
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.save();
  let userETokenBalance = createUserETokenBalanceIfNonExistent(event.transaction.from, event.params.eToken);
  let eTokenContract = ETokenContract.bind(event.params.eToken);
  // log.debug("User {}, EToken {}", [event.transaction.from.toHex(), event.params.eToken.toHex()]);
  userETokenBalance.balance = eTokenContract.balanceOf(event.transaction.from);
  userETokenBalance.save();
}

export function handleRedeemedEToken(event: RedeemedEToken): void {
  let ePool = createEPoolIfNonExistent(event.address);
  let ePoolContract = EPoolContract.bind(event.address);
  ePool.cumulativeFeeA = ePoolContract.cumulativeFeeA();
  ePool.cumulativeFeeB = ePoolContract.cumulativeFeeB();
  ePool.save();
  let tranche = createTrancheIfNonExistent(event.address, event.params.eToken);
  let t = ePoolContract.getTranche(event.params.eToken);
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.save();
  let userETokenBalance = createUserETokenBalanceIfNonExistent(event.transaction.from, event.params.eToken);
  let eTokenContract = ETokenContract.bind(event.params.eToken);
  userETokenBalance.balance = eTokenContract.balanceOf(event.transaction.from);
  userETokenBalance.save();
}

export function handleRebalancedTranches(event: RebalancedTranches): void {
  createEPoolIfNonExistent(event.address);
  let ePoolContract = EPoolContract.bind(event.address);
  let tranches = ePoolContract.getTranches();
  for (let i = 0; i < tranches.length; i++) {
    let rebalance = Rebalance.load(tranches[i].eToken.toHex() + '-' + event.block.timestamp.toString());
    if (rebalance == null) {
      rebalance = new Rebalance(tranches[i].eToken.toHex() + '-' + event.block.timestamp.toString());
    }
    rebalance.deltaA = event.params.deltaA;
    rebalance.deltaB = event.params.deltaB;
    rebalance.rChange = event.params.rChange;
    rebalance.timestamp = event.block.timestamp;
    rebalance.save();
    let tranche = createTrancheIfNonExistent(event.address, tranches[i].eToken);
    tranche.reserveA = tranches[i].reserveA;
    tranche.reserveB = tranches[i].reserveB;
    let rebalances = tranche.rebalances;
    rebalances.push(rebalance.id);
    tranche.rebalances = rebalances;
    tranche.save();
  }
}

export function handleIssuedETokenViaPeriphery(event: IssuedETokenViaPeriphery): void {
  let tranche = createTrancheIfNonExistent(event.params.ePool, event.params.eToken);
  let ePoolContract = EPoolContract.bind(event.params.ePool);
  let t = ePoolContract.getTranche(event.params.eToken);
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.save();
  let userETokenBalance = createUserETokenBalanceIfNonExistent(event.params.user, event.params.eToken);
  let eTokenContract = ETokenContract.bind(event.params.eToken);
  userETokenBalance.balance = eTokenContract.balanceOf(event.params.user);
  userETokenBalance.save();
}

export function handleRedeemedETokenViaPeriphery(event: RedeemedETokenViaPeriphery): void {
  let tranche = createTrancheIfNonExistent(event.params.ePool, event.params.eToken);
  let ePoolContract = EPoolContract.bind(event.params.ePool);
  let t = ePoolContract.getTranche(event.params.eToken);
  tranche.reserveA = t.reserveA;
  tranche.reserveB = t.reserveB;
  tranche.save();
  let userETokenBalance = createUserETokenBalanceIfNonExistent(event.params.user, event.params.eToken);
  let eTokenContract = ETokenContract.bind(event.params.eToken);
  userETokenBalance.balance = eTokenContract.balanceOf(event.params.user);
  userETokenBalance.save();
}

export function handleTransfer(event: Transfer): void {
  let userETokenBalanceFrom = createUserETokenBalanceIfNonExistent(event.params.from, event.address);
  let userETokenBalanceTo = createUserETokenBalanceIfNonExistent(event.params.to, event.address);
  let eTokenContract = ETokenContract.bind(event.address);
  userETokenBalanceFrom.balance = eTokenContract.balanceOf(event.params.from);
  userETokenBalanceFrom.save();
  userETokenBalanceTo.balance = eTokenContract.balanceOf(event.params.to);
  userETokenBalanceTo.save();
}
