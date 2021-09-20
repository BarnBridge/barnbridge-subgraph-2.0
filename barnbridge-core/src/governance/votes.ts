import {Governance, Vote, VoteCanceled} from "../../generated/Governance/Governance";
import {Proposal, Vote as VoteCast } from "../../generated/schema";
import {store} from "@graphprotocol/graph-ts";
import {common} from "../common";
import {constants} from "../constants";

export function handleVote(event: Vote): void {
    let proposal = Proposal.load(event.params.proposalId.toString());
    let govContract = Governance.bind(event.address);
    let proposalData = govContract.proposals(event.params.proposalId);

    proposal.forVotes = proposalData.value6;
    proposal.againstVotes = proposalData.value7;

    common.updateVoterOnVote(event.params.user);

    // Once voted, Voter can only change support -> true/false
    let voteId = event.params.proposalId.toString() + '-' + event.params.user.toHexString();
    let vote = VoteCast.load(voteId)
    if (vote == null) {
        vote = new VoteCast(voteId);
        vote.address = event.params.user;
        vote.voter = event.params.user.toString(); // Map for deriveFrom
        vote.proposalId = event.params.proposalId;
        vote.proposal = vote.proposalId.toString(); // Map for deriveFrom
        vote.power = event.params.power;
        vote.abrogatedProposal = "";
        vote._powerWithoutDecimals = (event.params.power.div(constants.TEN_TO_THE_EIGHTEEN)).toI32();
        proposal.votesCount += 1;
    } else {
        // User changed vote. We must remvoe previously accounted votes
        if (event.params.support) {
            proposal.againstVotesCount -= 1;
        } else {
            proposal.forVotesCount -= 1;
        }
    }
    vote.blockTimestamp = event.block.timestamp.toI32();
    vote.support = event.params.support;
    vote.save();

    if (vote.support) {
        proposal.forVotesCount += 1;
    } else {
        proposal.againstVotesCount += 1;
    }
    proposal.save();
}

export function handleVoteCanceled(event: VoteCanceled): void {
    let voteId = event.params.proposalId.toString() + '-' + event.params.user.toHexString();
    store.remove('Vote', voteId);
}


