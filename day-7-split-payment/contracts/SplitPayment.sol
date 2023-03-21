pragma solidity ^0.5.0;

contract SplitPayment {
    
    address public owner;

    constructor(address _owner) public {
        owner = _owner;
    }
    
    // the send function will accept two arrays to make the payments 
    // we specify payable to address to specify this transaction will send ether
    function send(address payable[] memory to, uint[] memory amount) payable onlyOwner() public {
        require(to.length == amount.length, 'to and amount arrays must hace the same length');
        for (uint i = 0; i < to.length; i++) {
            to[i].transfer(amount[i]);
        }
    }

    // declared a modifier to outsource common require logic to it's own function
    modifier onlyOwner() {
        require(msg.sender == owner, 'sender must be owner');
        // the underscore is present to serve as place holder for the code to be executed
        // after the modifier logic is validated
        _;
    }
}