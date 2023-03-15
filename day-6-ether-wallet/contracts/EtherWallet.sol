pragma solidity ^0.5.0;

contract EtherWallet {

    address public owner;
    
    constructor(address _owner) public {
        owner = _owner;
    }

    function deposit() payable public {
    }

    // payable in this context is different than above, it simply means a different data type for address.
    function send(address payable to, uint amount) public {
        // address data type has a built in function "transfer" to transfer eth
        if(msg.sender == owner) {
            to.transfer(amount);
            return;
        }
        revert('sender is not allowed');
    }

    function balanceOf() view public returns(uint) {
        // in this function we have to wrap 'this.balance' in the address function to transform the data to be returned
        return address(this).balance;
    }
}