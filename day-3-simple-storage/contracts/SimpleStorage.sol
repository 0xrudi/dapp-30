pragma solidity ^0.5.0;

contract SimpleStorage {
    string public data;
    // undeclaring storage location outside a function will store variable to memory "on chain"

    function set(string memory _data) public {
        data = _data;
    }

    function get() view public returns(string memory) {
        return data;
    }
}




