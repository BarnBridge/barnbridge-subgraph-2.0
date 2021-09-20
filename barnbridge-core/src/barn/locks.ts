import {Barn, Lock} from "../../generated/Barn/Barn";
import {common} from "../common";
import {constants} from "../constants";
import {BigInt} from "@graphprotocol/graph-ts/index";

export function handleLock(event: Lock): void {
    let voter = common.createVoterIfNonExistent(event.params.user);
    let startTs = voter.lockedUntil > event.block.timestamp.toI32() ?
        voter.lockedUntil : event.block.timestamp.toI32();

    // @ts-ignore
    voter.lockedUntil = event.params.timestamp.toI32();
    voter.save();

    let overview = common.getOverview();
    overview._numberOfLocks = overview._numberOfLocks.plus(constants.BIGINT_ONE);
    let lockTimeDelta = event.params.timestamp.toI32() - startTs;
    overview._sumLockTime = overview._sumLockTime.plus(BigInt.fromI32(lockTimeDelta));
    overview.avgLockTimeSeconds = overview._sumLockTime.div(overview._numberOfLocks).toI32();
    overview.save();
}