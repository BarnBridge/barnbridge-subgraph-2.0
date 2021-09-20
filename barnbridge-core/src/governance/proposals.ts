import {
    Governance,
    ProposalCanceled,
    ProposalCreated,
    ProposalExecuted,
    ProposalQueued
} from "../../generated/Governance/Governance";
import {Proposal} from "../../generated/schema";
import {Bytes} from "@graphprotocol/graph-ts/index";
import {constants} from "../constants";
import {common} from "../common";

export function handleProposalCreated(event: ProposalCreated): void {
    let proposal = new Proposal(event.params.proposalId.toString());
    let govContract = Governance.bind(event.address);
    let proposalData = govContract.proposals(event.params.proposalId);
    let proposalParams = govContract.getProposalParameters(event.params.proposalId);
    let proposalActions = govContract.getActions(event.params.proposalId);
    let proposalState = constants.PROPOSAL_EVENTS.get(0) as string;

    proposal.proposer = proposalData.value1;
    proposal.description = proposalData.value2;
    proposal.title = proposalData.value3;
    proposal.createTime = proposalData.value4.toI32();
    proposal.eta = proposalData.value5.toI32();
    proposal.forVotes = proposalData.value6;
    proposal.againstVotes = proposalData.value7;
    proposal.blockTimestamp = event.block.timestamp.toI32();
    proposal.state = proposalState;

    // proposal params
    proposal.warmUpDuration = proposalParams.warmUpDuration.toI32();
    proposal.activeDuration = proposalParams.activeDuration.toI32();
    proposal.queueDuration = proposalParams.queueDuration.toI32();
    proposal.gracePeriodDuration = proposalParams.gracePeriodDuration.toI32();
    proposal.acceptanceThreshold = proposalParams.acceptanceThreshold.toI32();
    proposal.minQuorum = proposalParams.minQuorum.toI32();
    // proposal action
    proposal.targets = proposalActions.value0 as Array<Bytes>;
    proposal.values = proposalActions.value1;
    proposal.signatures = proposalActions.value2;
    proposal.calldatas = proposalActions.value3;
    proposal.votesCount = 0;
    proposal.forVotesCount = 0;
    proposal.againstVotesCount = 0;
    proposal.save();

    let voter = common.createVoterIfNonExistent(event.transaction.from);
    voter.proposals += 1;
    voter.save();

    let overview = common.getOverview();
    overview.proposals += 1;
    overview.save();

    common.saveProposalEvent(proposal.id, event, proposalState);
}

export function handleProposalQueued(event: ProposalQueued): void {
    let proposal = Proposal.load(event.params.proposalId.toString());
    let proposalState = constants.PROPOSAL_EVENTS.get(1) as string;
    proposal.eta = event.params.eta.toI32();
    proposal.state = proposalState;
    proposal.save();

    common.saveProposalEvent(proposal.id, event, constants.PROPOSAL_EVENTS.get(1) as string, proposal.eta);
}

export function handleProposalExecuted(event: ProposalExecuted): void {
    let proposal = Proposal.load(event.params.proposalId.toString())
    let proposalState = constants.PROPOSAL_EVENTS.get(2) as string;
    proposal.state = proposalState
    proposal.save()

    common.saveProposalEvent(proposal.id, event, proposalState);
}

export function handleProposalCanceled(event: ProposalCanceled): void {
    let proposal = Proposal.load(event.params.proposalId.toString());
    let proposalState = constants.PROPOSAL_EVENTS.get(3) as string;
    proposal.state = proposalState;
    proposal.save();

    common.saveProposalEvent(proposal.id, event, proposalState);
}