import {Holder, Overview, ProposalStateEvent, Voter} from "../generated/schema";
import {Address, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {constants} from "./constants";

export namespace common {

    // @ts-ignore
    export function saveProposalEvent(proposalId: string, event: ethereum.Event, eventType: string, eta: i32 = 0): void {
        let id = proposalId + '-' + eventType;
        let psh = ProposalStateEvent.load(id)
        if (psh == null) psh = new ProposalStateEvent(id)

        psh.proposal = proposalId;
        // @ts-ignore
        psh.proposalId = I32.parseInt(proposalId);
        psh.caller = event.transaction.from;
        psh.eventType = eventType;
        psh.createTime = event.block.timestamp.toI32();
        psh.txHash = event.transaction.hash.toHexString();
        psh.eta = eta;
        psh.save()
    }

    export function createVoterIfNonExistent(userAddress: Bytes): Voter {
        let voter = Voter.load(userAddress.toHexString())
        if (voter == null) {
            voter = new Voter(userAddress.toHexString())
            voter.tokensStaked = constants.BIGINT_ZERO;
            voter.lockedUntil = 0;
            voter.delegatedPower = constants.BIGINT_ZERO;
            voter.votes = 0;
            voter.proposals = 0;
            voter.hasActiveDelegation = false
            voter._tokensStakedWithoutDecimals = 0;
            voter.isBarnUser = false;
            voter.save()
        }
        return voter as Voter
    }

    export function getOverview(): Overview {
        let overview = Overview.load("OVERVIEW");
        if (overview == null) {
            overview = new Overview("OVERVIEW");
            overview.avgLockTimeSeconds = 0;
            overview.holders = 0;
            overview.totalDelegatedPower = constants.BIGINT_ZERO;
            overview.voters = 0
            overview.barnUsers = 0;
            overview.proposals = 0;
            overview._sumLockTime = constants.BIGINT_ZERO;
            overview._numberOfLocks = constants.BIGINT_ZERO;
            overview._holdersWithNonZeroBalance = 0;
            overview.save();
        }
        return overview as Overview;
    }

    export function incrementVoterCount(): void {
        let overview = getOverview();
        overview.voters += 1;
        overview.save();
    }

    export function updateVoterOnVote(user: Address): void {
        let voter = common.createVoterIfNonExistent(user);
        if (voter.votes == 0) {
            common.incrementVoterCount();
        }
        voter.votes += 1;
        voter.save();
    }

    export function getOrCreateHolder(address: Address): Holder {
        let holder = Holder.load(address.toHexString());
        if (holder == null) {
            holder = new Holder(address.toHexString());
            holder.balance = constants.BIGINT_ZERO;
            holder.save();
        }
        return holder as Holder;
    }

    // @ts-ignore
    export function updateHolders(change: i32): void {
        let overview = getOverview();
        overview._holdersWithNonZeroBalance += change;
        overview.holders = overview.barnUsers + overview._holdersWithNonZeroBalance;
        overview.save();
    }

    // @ts-ignore
    export function updateBarnUsers(change: i32): void {
        let overview = getOverview();
        overview.barnUsers += change;
        overview.save();
    }
}


