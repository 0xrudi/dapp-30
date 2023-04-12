pragma solidity ^0.5.0;

contract DeedMultiPayout {
    address public lawyer;
    address payable public beneficiary;
    uint public earliest;
    uint public amount;
    // using the new constant keyword for hardcoding the amount of times the deed can be withdrawn from
    uint constant public PAYOUTS = 4;
    // Interval will be the hardcoded time period that must elapse between payouts
    uint constant public INTERVAL = 1;
    uint public paidPayouts;

    constructor (
        address _lawyer,
        address payable _beneficiary, 
        uint fromNow
        ) payable public {
            lawyer = _lawyer;
            beneficiary = _beneficiary;
            earliest = now + fromNow;
            amount = msg.value / PAYOUTS;
        }

    function withdraw() public {
        require(msg.sender == beneficiary, 'only beneficiary can withdrawal');
        require(now >= earliest, 'amount can not yet be distributed');
        require(paidPayouts < PAYOUTS, 'no payouts left');
        // we have to introduce a new variable to prevent a reentrancy vulnerability
        // here lastWithdrawal will store the date of when the last withdrawal took place
        // instead of the below logic, we are going to perform the check using duePayouts below
        // uint lastWithdrawal;

        // elligible payouts will calculate the amount of payments that have been earned over the elapsed time period since
        uint elligiblePayouts = (now - earliest) / INTERVAL;

        // instead of the logic above, we are going to leverage the paidPayouts variable
        // this will allow us to keep track of how many payouts have taken place explicitly
        uint duePayouts = elligiblePayouts - paidPayouts;
        paidPayouts += duePayouts;

        duePayouts = duePayouts + paidPayouts >= PAYOUTS ? PAYOUTS - paidPayouts : duePayouts;
        // instead of transfering the full amount of the smart contract balance, we want to send the broken up amount multiplied
        // by the amount of elligible payments
        beneficiary.transfer(duePayouts * amount);
    }

}