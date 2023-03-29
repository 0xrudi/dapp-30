pragma solidity ^0.5.0;

contract Deed {
    address public lawyer;
    address payable public beneficiary;
    uint public amount;
    uint public earliest;

    constructor (
        address _lawyer,
        address payable _beneficiary, 
        uint _amount,
        uint fromNow
        ) payable public {
            require(_amount == msg.value);
            lawyer = _lawyer;
            beneficiary = _beneficiary;
            earliest = now + fromNow;
        }
    }

    function withdraw() public {
        require(msg.sender == lawyer, 'sender not authorized');
        require(now >= earliest, 'amount can not yet be distributed');
        beneficiary.transfer(amount);
    }


}