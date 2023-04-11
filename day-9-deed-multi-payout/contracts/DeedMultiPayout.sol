pragma solidity ^0.5.0;

contract DeedMultiPayout {
    address public lawyer;
    address payable public beneficiary;
    uint public earliest;
    uint public amount;
    // using the new constant keyword for hardcoding the amount of times the deed can be withdrawn from
    uint constant public PAYOUTS = 10;
    // Interval will be the hardcoded time period that must elapse between payouts
    uint constant public INTERVAL = 10;
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
        require(paidPayouts < Payouts);
        // we have to introduce a new variable to prevent a reentrancy vulnerability
        // here lastWithdrawal will store the date of when the last withdrawal took place
        uint lastWithdrawal;

        // elligible payouts will calculate the amount of payments that have been earned over the elapsed time period since
        uint elligiblePayouts = (now - earliest) / INTERVAL;

        // instead of transfering the full amount of the smart contract balance, we want to send the broken up amount multiplied
        // by the amount of elligible payments
        beneficiary.transfer(elligiblePayouts * amount);
        lastWithdrawal = now;
    }

}