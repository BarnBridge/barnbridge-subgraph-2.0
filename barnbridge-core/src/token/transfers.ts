import {common} from "../common";
import {constants} from "../constants";
import {Transfer} from "../../generated/Token/Token";

export function handleTransfer(event: Transfer): void {
    let sender = common.getOrCreateHolder(event.params.from);
    let receiver = common.getOrCreateHolder(event.params.to);
    let originalReceiverBalance = receiver.balance;

    sender.balance = sender.balance.minus(event.params.value);
    receiver.balance = receiver.balance.plus(event.params.value);
    sender.save();
    receiver.save();

    let change = 0;
    if (originalReceiverBalance.equals(constants.BIGINT_ZERO) && receiver.balance.gt(constants.BIGINT_ZERO)) {
        change +=1;
    }
    if (sender.balance.equals(constants.BIGINT_ZERO)) {
        change -= 1;
    }
    if (change != 0) {
        common.updateHolders(change);
    }
}