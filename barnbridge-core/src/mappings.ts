import {
    handleProposalCreated,
    handleProposalCanceled,
    handleProposalExecuted,
    handleProposalQueued } from "./governance/proposals";
import { handleVote, handleVoteCanceled } from './governance/votes';
import { handleAbrogationProposalStarted,
    handleAbrogationProposalVote,
    handleAbrogationProposalVoteCancelled,
    handleAbrogationProposalExecuted } from './governance/abrogation';
import {handleDelegate, handleDelegatedPowerIncreased, handleDelegatedPowerDecreased} from './barn/delegations';
import {handleDeposit, handleWithdraw} from './barn/deposits-withdrawals';
import {handleLock} from './barn/locks';
import {handleTransfer} from "./token/transfers";

/**
 * GOVERNANCE
 */
export {
    /**
     * Proposal Events
     */
    handleProposalCreated,
    handleProposalCanceled,
    handleProposalExecuted,
    handleProposalQueued,

    /**
     * Vote Events
     */
    handleVote,
    handleVoteCanceled,

    /**
     * Abrogation Events
     */
    handleAbrogationProposalStarted,
    handleAbrogationProposalVote,
    handleAbrogationProposalVoteCancelled,
    handleAbrogationProposalExecuted,
}

/**
 * BARN
 */
export {
    handleDeposit,
    handleWithdraw,
    handleLock,
    handleDelegate,
    handleDelegatedPowerIncreased,
    handleDelegatedPowerDecreased
}

/** TOKEN */
export {
    handleTransfer
}